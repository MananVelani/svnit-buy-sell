import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request : Request){

    await dbConnect();

    try {
        const {email , code} = await request.json();

        

       
        const user = await UserModel.findOne({
            email
        })

        if(!user){
            return Response.json({
                success:false,
                message:"User with this Email is not found"
            },{status:400})            
        } 

        

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeNotExpired && isCodeValid){
            user.isVerified = true;
            await user.save();
            return Response.json({
                success:true,
                message:"Account Verified Successfully"
            },{status:200})              
        } else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"Verification code is expired"
            },{status:400})             
        } else {
            return Response.json({
                success:false,
                message:"Verification code is incorrect"
            },{status:400})             
        }
        
    } catch (error) {
        console.error("Error Verifying code ",error)
        return Response.json({
            success:false,
            message:"Error Verifying code "
        },{status:500})
        
    }

}