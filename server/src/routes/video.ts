import { Router } from "express";
import { AccessToken, VideoGrant } from 'livekit-server-sdk';

export const videoRoutes=Router() 
interface videoProps{
    classId:string,
    username:string
}
// const createToken=async()=>{
const createToken=async({classId, username}:videoProps)=>{
    // const classIds="avashRoom"
    // const usernames="Suksham"
    const at =new AccessToken(process.env.LIVEKIT_API_KEY,process.env.LIVEKIT_API_SECRET,{
        identity:username
    })
    const videoGrant:VideoGrant={
        room:classId,
        roomJoin:true
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