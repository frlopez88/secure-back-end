import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import { car } from './routes/carRoute.js'
import { auth } from './routes/authRoute.js'
import jwt from 'jsonwebtoken'

// enable json comunication
app.use(express.json())

// middleware

const tokenValidation = (req, res, next) => {

    const authorization = req.headers['authorization']

    if (!authorization) {
        return res.status(404).json({ message: "You need to pass a token" })
    }

    try {
        const token = authorization.replace("Bearer ", "")
        const secret = process.env.SECRET
        const decodeToken = jwt.verify(token, secret)
        next()
    }catch(err){
        const message = err.message
        console.log(message)
        return res.status(404).json({ message: "Invalid Token" })
    } 

}

app.use('/cars', tokenValidation, car)
app.use('/auth', auth)

const port = process.env.PORT || 8080

app.listen(port)
