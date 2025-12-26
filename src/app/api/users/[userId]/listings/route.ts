import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import mongoose from "mongoose";
import ListingModel from "@/model/Listing";

export async function GET(request : Request,{ params }: { params: Promise<{ userId: string }> }){
    await dbConnect();
        const session = await getServerSession(authOptions);
        const user : User = session?.user as User;
    
        if(!session || !session.user){
            return Response.json(
            { success: false, message: "Not Authenticated" },
            { status: 401 }
          );
        }

        const {userId} = await params;
    
        const loggedInUserId = new mongoose.Types.ObjectId(user._id);
        if(loggedInUserId.toString() !== userId){
            return Response.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
        }

        try {

            const listings = await ListingModel.find({ userId });

            if (!listings || listings.length === 0) {
    return Response.json(
        { success: true, message: "No listings found", data: [] }, 
        { status: 200 } // Use 200 so the frontend doesn't think it's a failure
    );
}

return Response.json({ success: true,message:"Listings fetched successfully !", data: listings }, { status: 200 });

            
        } catch (error) {
            console.log("Error fetching Listings",error);
        return Response.json(
            { success: false, message: "Error fetching Listings" },
            { status: 500 }
        );
        }

        
}