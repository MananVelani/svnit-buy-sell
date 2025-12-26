import mongoose from "mongoose";

type ConnectionObject = {
    isConnected? : number
}

const connection : ConnectionObject = {}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("already connected to database");
        return 
    }

    try{
        const db =await mongoose.connect(process.env.MONGODB_URI || '',{})

        connection.isConnected =  db.connections[0].readyState
        console.log("DB Connected Successfully!");
    } catch(error){
        console.log("Connection to database failed",error)
        process.exit(1)
    }
}

export default dbConnect
// later try console.log db and db.connections ok do not forget it you
//will learn something according to sir
