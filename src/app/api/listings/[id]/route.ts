import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";
import ListingModel from "@/model/Listing";


export async function GET(request : Request,{ params }: { params: Promise<{ id: string }> }){
    await dbConnect();
    

    const session = await getServerSession(authOptions);
    const user : User = session?.user as User;

    if(!session || !session.user){
        return Response.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {

        const listing = await ListingModel.findById(id);

        if(!listing){
            return Response.json(
            { success: false, message: "Listing not found" },
            { status: 401 }
          );
        }

        return Response.json(
            { success: true, message: "Listing found" ,data:listing},
            { status: 200 }
          );
        
    } catch (error) {
        return Response.json(
            { success: false, message: "Error in finding Listing." },
            { status: 500 }
          );
        
    }

}