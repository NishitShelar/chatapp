import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) =>{
    
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '7d'
    });
    res.cookie("jwt",token, {
        httpOnly: true,
        maxAge: 7*21*60*60*1000, // 7days in miliseconds
        httpOnly: true, //prevent XSS attacks cross-site scripting
        sameSite: "strict", //CSRF attacks
        secure: process.env.NODE_ENV !=="development",
    });
}