import { Router } from "express";
import { AccessToken, VideoGrant } from 'livekit-server-sdk';
import dotenv from "dotenv"
dotenv.config();
export const videoRoutes=Router() 
interface videoProps{
    classId:string,
    username:string
}
const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;
console.log(apiKey,apiSecret)
// const createToken=async()=>{
const createToken=async({classId, username}:videoProps)=>{
  var can_publish =false
    // const classIds="avashRoom"
    // const usernames="Suksham"
    const at =new AccessToken(apiKey,apiSecret,{
        identity:username
    })

    if (username == "admin" ){  
      can_publish = true
    }
    
    const videoGrant:VideoGrant={
        room:classId,
        roomJoin:true,
        canPublish:can_publish
    }
    at.addGrant(videoGrant)
    const token =await at.toJwt()
    
    return token;
}
videoRoutes.get("/getToken", async (req:any, res:any) => {
    try   {
      const { classId,username } = req.query; 

      if (!classId || !username) {
        return res.status(400).json({ error: "classId and userId are required" });
      }
  
  
      const token = await createToken({classId, username});
    //   const token = await createToken();
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error generating token:", error);
      res.status(500).json({ error: "Failed to generate token" });
    }
  });