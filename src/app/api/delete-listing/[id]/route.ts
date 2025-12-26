import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";
import ListingModel from "@/model/Listing";

export async function DELETE(request : Request,{ params }: { params: Promise<{ id: string }> }){
    await dbConnect()
    
        const session = await getServerSession(authOptions);
        const user : User = session?.user as User;
    
        if(!session || !session.user){
            return Response.json(
            { success: false, message: "Not Authenticated" },
            { status: 401 }
          );
        }

        const {id} = await params;



    try {

        const listing = await ListingModel.findById(id); 

        if (!listing) {
            return Response.json(
                { success: false, message: "Listing not found" },
                { status: 404 }
            );
        }

        if(!listing.userId.equals(user._id)){
            return Response.json(
                { success: false, message: "You are not the owner of the Listing" },
                { status: 403 }
            );            
        }

        await ListingModel.findByIdAndDelete(id);

        return Response.json({ success: true, message: "Listing Deleted Successfully !" });


    
        
    

    //     return Response.json({
    //     success:true,
    //     message:"Message Deleted Successfully."
    // },{status:200})
    
        
    } catch (error) {
    console.error("Error in Deleting Listing ",error)
        return Response.json({
            success:false,
            message:"Error in Deleting Listing "
        },{status:500})
    }


    
}
