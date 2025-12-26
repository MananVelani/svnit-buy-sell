import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request : Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user : User = session?.user as User;

    if(!session || !session.user){
        return Response.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        // First check if user exists
        const existingUser = await UserModel.findById(userId);
        if (!existingUser) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const user = await UserModel.aggregate([
            {$match:{_id:userId}},
            {$unwind:'$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group:{_id:'$_id',messages:{$push:'$messages'}}}
        ])

        // If no messages, aggregation returns empty array
        const messages = user.length > 0 ? user[0].messages : [];

        return Response.json(
            { success: true,
              message: "Messages fetched successfully", 
              messages: messages },
            { status: 200 }
        );
        
    } catch (error) {
        console.log("Error getting messages",error);
        return Response.json(
            { success: false, message: "Error getting messages" },
            { status: 500 }
        );
    }


}