import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request : Request){

    await dbConnect()
    try {
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username:searchParams.get('username')
        }
        //validation with zod
        const result = UsernameQuerySchema.safeParse(queryParam);

        if(!result.success){

            return Response.json({
            success:false,
            message:"Invalid query Parameters"
        },{status:400})
            

        } 

        const {username} = result.data

        const exisitingVerifiedUser = await UserModel.findOne({
            username,
            isVerified:true
        })
        if(exisitingVerifiedUser){
            return Response.json({
            success:false,
            message:"Username already taken"
            },{status:400})

        } 

        return Response.json({
                success:true,
                message:"Username is unique"
                },{status:200})
        
    } catch (error) {
        console.error("Error checking username ",error)
        return Response.json({
            success:false,
            message:"Error checking username"
        },{status:500})
        
    }
}