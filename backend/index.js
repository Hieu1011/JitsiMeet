const path = require('path')
const cors = require('cors')
const express = require("express")
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

const port = process.env.PORT

const corsOptions = {
    origin: true,
    credentials: true
};

mongoose.set("strictQuery", false)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Mongo database is connected")
    } catch (error) {
        console.log("Mongo database is failed to connect", error)
    }
}

app.use(express.json({limit: '50mb'}));
app.use(cors(corsOptions));
app.use(cookieParser());

app.listen(port, () => {
    connect()
    console.log(`Start server listen at http://localhost:${port}`)
});
