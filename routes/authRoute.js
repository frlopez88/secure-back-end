import express from 'express'
export const auth = express()
import { signIn , logIn } from '../controllers/authController.js'

auth.post('/register', signIn)
auth.post('/logIn', logIn)