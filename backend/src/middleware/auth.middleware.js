import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
export const authMiddleware = async (req, res, next) => {
    const token  =  req.cookies.token
    // console.log(token)
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode)
        const user = await userModel.findById(decode.id)
        console.log(user)
        if(!user){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}