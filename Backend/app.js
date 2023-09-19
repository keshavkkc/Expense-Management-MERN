const express = require("express")
const cors = require("cors")
const configureDB = require("./config/database")
const router = require("./config/routes")
require("dotenv").config()
const app = express()
const port = 3055

app.use(cors())
app.use(express.json())
app.use(router)

//Database Connectivity
configureDB()

app.listen(port, () => {
    console.log('Server Is Running On Port:', port)
})