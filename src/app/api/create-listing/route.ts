import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User";
import ListingModel from "@/model/Listing";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function POST(request:Request){
    await dbConnect()

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

        const data = await request.json();

//         (parameter) data: {
//     title: string;
//     description: string;
//     price: number;
//     category: string;
//     images: string[];
// }

    const newListing = new ListingModel({
                          title: data.title,
                          description: data.description,
                          price: data.price,
                          categorySlug: data.category,
                          images: data.images, 
                          userId,
                          createdAt:new Date(),
                          status:"active",

                })

    await newListing.save();

    return Response.json({
                        success:true,
                        message:"Listing created successfully !",
                        data: { listingId: newListing._id }

        },{status:201})
        
    } catch (error) {
        console.error("Error Creating Listing",error)
        return Response.json(
            {
                success:false,
                message:"Error Creating Listing"

            },
            {
                status:500
            }
        )
        
    }




}