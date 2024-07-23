
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function createUser(email, password, firstName, lastName){
    try{
       
        const createdUserInfo = await prisma.$transaction(async function (){
            const balance = parseInt((Math.random())*100000);
            const createdUser = await prisma.userIDInfo.create({
                data: {
                    email,
                    password,
                    firstName,
                    lastName,
                    accounts: {
                        create :{
                            balance
                        }
                    },
                    
                    
                },
                include: {
                    accounts: true
                }
                
            })
            
            return createdUser;
        
        })
        return createdUserInfo;
    }catch(e){
        console.log("Couldn't insert User", e);
    }
    
    
}

async function deleteUsersWithoutAccount(){
    try{
        await prisma.userIDInfo.deleteMany({
            where:{
                accounts: null
            }
        })
    }catch(e){
        console.log("Error while deleting users with no account", e);
    }
}
async function userAlreadyExists(email){
    try{
        const user = await prisma.userIDInfo.findUnique({
            where:{
                email
            }
            
        });
        console.log(user);
        return user;
    }catch(e){
        console.log("Couldn't check if User exists", e);
    }
}

async function updateUserInfo(email, updationInfo){
    try{
        const updatedUserInfo = await prisma.$transaction(async function (){
            const user = await prisma.userIDInfo.update({
                where: {
                    email
                },
                data: updationInfo
            })
            return user;
        });
        return updatedUserInfo;
        
    }catch(e){
        console.log(e);
    }
}

async function findMultipleUsers(name){
    const users = await prisma.userIDInfo.findMany({
        where: {
            OR: [
                {
                    firstName: {
                        contains: name,
                        mode: "insensitive"
                    }
                  
                },
                {
                    lastName: {
                        contains: name,
                        mode: "insensitive"
                    }
                }
                
            ]
        }
    })

    return users;
}

async function getBalance(id){
    const user = await prisma.accounts.findUnique({
        where: {
            userId: id
        }
    });
    
    const balance = `Rupees ${(user.balance)/100}`;
    return balance;
}

async function transferMoney(senderId, receiverId, amount){
    const result = await prisma.$transaction(async function (){
        const sender = await prisma.accounts.findUnique({
            where: {
                userId: senderId
            }
        });
        const receiver = await prisma.accounts.findUnique({
            where: {
                userId: receiverId
            }
        }); 
        if(!receiver || !sender){
            return -1
        }
        else if(sender.balance < amount*100){
            return 0;
        }
        const newReceiverBalance = receiver.balance + amount*100;
        const newSenderBalance = sender.balance - amount*100;
        await prisma.accounts.update({
            where: {
                userId: senderId
            },
            data: {
                balance: newSenderBalance
            }
        });
        await prisma.accounts.update({
            where: {
                userId: receiverId
            },
            data: {
                balance: newReceiverBalance
            }
        })
        return 1;
    })
    return result;
    
}

async function deleteUsersWithId(...ids){
    
    await prisma.$transaction(async function (){
        
        ids.map(async (id) => {
            
            const a = await prisma.userIDInfo.findUnique({
                where:{
                    id
                }
            })
            if(a){
                await prisma.accounts.delete({
                    where:{
                        userId: id
                    }
                
                })
                await prisma.userIDInfo.delete({
                    where:{
                        id: id
                    }
                })
                console.log(`user with id ${id} deleted`)
            }
            
        })
    })
}


module.exports = {
    createUser,
    userAlreadyExists,
    deleteUsersWithoutAccount,
    updateUserInfo, 
    findMultipleUsers,
    getBalance,
    transferMoney,
    deleteUsersWithId
};