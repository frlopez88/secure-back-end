import {db} from '../db/cn.js'

export const postCar = async (req, res)=>{

    const temp = req.body
    const sql = ` insert into cars (make, model, year) values ($1, $2, $3)  `
    const arr = [ temp.make, temp.model, temp.year ]

    try {
        const result = await db.query(sql, arr)
        return res.json({message: "Car Created"})
    }catch (err){
        const error_mesage = err.message
        return res.status(500).json({message: error_mesage})
    }
    

}