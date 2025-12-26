import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function DELETE(request : Request){
    await dbConnect()
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('messageId');
        const session = await getServerSession(authOptions);
        const user : User = session?.user as User;
    
        if(!session || !session.user){
            return Response.json(
            { success: false, message: "Not Authenticated" },
            { status: 401 }
          );
        }

    try {
    const result = await UserModel.updateOne(
        { "messages._id": messageId }, 
        { $pull: { messages: { _id: messageId } } }
    );

    if(result.modifiedCount == 0){
        return Response.json({
        success:false,
        message:"Message not found or already deleted."
    },{status:404})
    }
    

        return Response.json({
        success:true,
        message:"Message Deleted Successfully."
    },{status:200})
    
        
    } catch (error) {
    console.error("Error in Deleting message ",error)
        return Response.json({
            success:false,
            message:"Error in Deleting message "
        },{status:500})
    }


    
}
