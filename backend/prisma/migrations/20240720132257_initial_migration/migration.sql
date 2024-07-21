-- CreateTable
CREATE TABLE "UserIDInfo" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,

    CONSTRAINT "UserIDInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "userId" BIGINT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserIDInfo_email_key" ON "UserIDInfo"("email");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserIDInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
