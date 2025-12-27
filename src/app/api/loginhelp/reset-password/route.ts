import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request : Request){

    await dbConnect();

    try {
        const {email,password} = await request.json();

        

       
        const user = await UserModel.findOne({
            email
        })

        if(!user){
            return Response.json({
                success:false,
                message:"User with this Email is not found"
            },{status:400})            
        } 

        const hashedPassword =await bcrypt.hash(password,10);

        const updatedUser = await UserModel.findOneAndUpdate(
            { email: email }, 
            { 
              password:hashedPassword
            },                
            { new: true }    
          );
        
          if (!updatedUser) {
            return Response.json({success:false, message: "User not found" }, { status: 404 });
          }


            return Response.json({
                        success:true,
                        message:"Password Reset Successfull!"

                    },{status:201})
        



     
        
    } catch (error) {
        console.error("Error in Reseting Password ",error)
        return Response.json({
            success:false,
            message:"Error in Reseting Password "
        },{status:500})
        
    }

}