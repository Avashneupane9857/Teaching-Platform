import  jwt from "jsonwebtoken"
export const middleware=(req:any,res:any,next:any)=>{
    const secret = process.env.JWT_SECRET as string || "Saibaba9857";
    if(!secret){
        res.status(400).json({msg:"No secret provided"})
        return
    }
    try {

        const bearer = req.headers["authorization"]
        if (!bearer) {
            return res.status(403).json({
                msg: "No authorization header found"
            })
        }


        const token = bearer.split(" ")[1]
        if (!token) {
            return res.status(403).json({
                msg: "No token provided"
            })
        }

 
        const decoded = jwt.verify(token, secret) as { userId: string, role: string }
        
   
      

        req.userId = decoded.userId
        req.role=decoded.role
       
        
        next()
    } 

catch(error){
    if (error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ msg: "Invalid token" })
    }
    return res.status(500).json({ msg: "Internal server error" })
}
}