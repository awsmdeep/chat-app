import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar=async(req,res)=>{
    try {
        const loggedUserId=req.user._id;
        const filteredUsers= await User.find({_id:{$ne:loggedUserId}}).select("-password");
        res.status(200).json(filteredUsers)

        
    } catch (error) {
        console.log("Error in getUserForSidebar",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }

}

export const getMessage=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const message=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
        res.status(200).json({message})

        
    } catch (error) {
        console.log("Error in getMessage",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageURl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageURl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageURl
        });
        await newMessage.save();


        //todo:realtime functionality using socket.io for chatting

        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("Error in sendMessage",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}