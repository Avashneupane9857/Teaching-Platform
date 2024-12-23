import { Router } from "express";
import { AccessToken, VideoGrant } from 'livekit-server-sdk';

export const videoRoutes=Router() 

const createToken=async()=>{
    const roomName="avashRoom"
    const participantName="Suksham"
    const at =new AccessToken(process.env.LIVEKIT_API_KEY,process.env.LIVEKIT_API_SECRET,{
        identity:participantName
    })
    const videoGrant:VideoGrant={
        room:roomName,
        roomJoin:true
    }
    at.addGrant(videoGrant)
    const token =await at.toJwt()
    
    return token;
}
videoRoutes.get('/getToken', async (req:any, res:any) => {
    console.log(await createToken())
    res.status(200).json({msg:await createToken()});
  });