//Important: check if user is logged in we are only allowing logged in users to send messages
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function POST(request : Request){
    await dbConnect()

    const session = await getServerSession(authOptions);
    const user : User = session?.user as User;

    if(!session || !session.user){
        return Response.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
        );
    }

    const {username,content} = await request.json();
    try {

    const sendUser = await UserModel.findOne({
        username
    })

    if(!sendUser){
        return Response.json({
            success:false,
            message:"User not found"
        },{status:404})        
    }



    const newMessage = {username:user.username,content,createdAt:new Date()}
    

    sendUser.messages.push(newMessage as Message)

    await sendUser.save()

    return Response.json({
            success:true,
            message:"message sent successfully"
        },
        {status:200})

    
        
    } catch (error) {
        console.error("Error in sending message ",error)
        return Response.json({
            success:false,
            message:"Error in sending message "
        },{status:500})
    }
}