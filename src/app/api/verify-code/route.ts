import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request : Request){

    await dbConnect();

    try {
        const {username , code} = await request.json();

        const decodedUsername =  decodeURIComponent(username);

        //check if username exists
        const user = await UserModel.findOne({
            username:decodedUsername
        })

        if(!user){
            return Response.json({
                success:false,
                message:"Username not found"
            },{status:400})            
        } 

        //if user exists check verifycode and expiry date

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