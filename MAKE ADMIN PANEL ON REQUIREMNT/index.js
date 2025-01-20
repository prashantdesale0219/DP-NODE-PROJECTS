const express = require('express')
const dotenv = require('dotenv')
const connectionToDB = require('./Config/db')
dotenv.config()

const app = express()
app.use(express.json())

app.use('/user',userRouter)

app.listen(process.env.PORT || 3000,async()=>{
   try {
    await connectionToDB
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
   } catch (error) {
    console.log(error)
   }
})