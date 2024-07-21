const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({}));
const rootRouter = require('./routes/index');


app.use("/api/v1/", rootRouter);

app.listen(3030)

