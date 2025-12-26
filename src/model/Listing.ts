import mongoose,{Schema,Document} from "mongoose";


export interface Listing extends Document {
  title: string
  description: string
  price: number
  categorySlug: string
  images: string[]        
  userId: mongoose.Types.ObjectId
  createdAt: Date
  status:string
}

const ListingSchema: Schema<Listing> = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  categorySlug: {
    type: String,
    required: true,
    index: true, 
  },
  images: {
    type: [String],  
    validate: [(arr: string[]) => arr.length <= 5, "Max 5 images allowed"],        
    default: [],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",             
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
  type: String,
  enum: ["active", "sold", "hidden"],
  default: "active",
}

})

const ListingModel =
  (mongoose.models.Listing as mongoose.Model<Listing>) ||
  mongoose.model<Listing>("Listing", ListingSchema)

export default ListingModel
