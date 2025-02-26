import express from 'express'
export const car = express()
import { postCar } from '../controllers/carController.js'

car.post('/', postCar)