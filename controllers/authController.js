import { db } from "../db/cn.js"
import jwt from 'jsonwebtoken'


export const signIn = async (req, res) => {

    const temp = req.body
    const sql = ` insert into users_cars (email, name, last_name, password) values ($1, $2, $3,$4)`
    const arr = [temp.email, temp.name, temp.last_name, temp.password]

    try {
        const result = await db.query(sql, arr)
        return res.json({ message: "User Created" })
    } catch (err) {
        const message = err.message
        return res.status(500).json({ message })
    }

}

export const logIn = async (req, res) => {

    const temp = req.body
    const sql = `select email, name 
                    from users_cars 
                where email = $1 and password = $2`
    const arr = [temp.email, temp.password]
    const secret = process.env.SECRET
    
    try {

        const result = await db.query(sql, arr)

        if (result.length == 0) {
            return res.status(400).json({ message: "Invalid Credentials" })
        } else {
            const payload = result[0]
            const token = jwt.sign(payload, secret, { expiresIn: '24h' });
            return res.json({ token })
        }


    } catch (err) {
        const message = err.message
        return res.status(500).json({ message })
    }

}
