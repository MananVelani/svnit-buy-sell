import dbConnect from "@/lib/dbConnect"
import { sendVerificationEmail } from "@/lib/sendEmail";
import UserModel from "@/model/User";
import { success } from "zod";


export async function POST(request:Request){
    await dbConnect()

    try {
        const {email} =await request.json();
        const existingUserByEmail = await UserModel.findOne({
                        email
                    })

        if(!existingUserByEmail){
            return Response.json({
                success:false,
                message : "User with this email id does not exists"
            },{status:400})
        }

        const verifyCode = Math.floor(100000 + 900000 * Math.random()).toString()

        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)

        const updatedUser = await UserModel.findOneAndUpdate(
    { email: email }, 
    { 
      verifyCode:verifyCode ,
      verifyCodeExpiry: expiryDate 
    },                
    { new: true }    
  );

  if (!updatedUser) {
    return Response.json({success:false, message: "User not found" }, { status: 404 });
  }

        const emailResponse = await sendVerificationEmail(
            email,
            existingUserByEmail.username,
            verifyCode
        )

            if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message

            },{status:500})
        }

                return Response.json({
                        success:true,
                        message:"Verfication Email Send SuccessFully. Please Verify Your Email Id."

                    },{status:201})
        
    } catch (error) {
        console.error("Error Sending Verification Email",error)
        return Response.json(
            {
                success:false,
                message:"Error Sending Verification Email"

            },
            {
                status:500
            }
        ) 
    }


}