import { z } from "zod"

export const listingSchema = z.object({
  title: z.string().min(3,"Title must be at least 3 characters").max(100,"Title must be less than 100 characters"),
  description: z.string().min(10),
  price: z.number("Price must be a number").positive("Price must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  images: z.array(z.url()).min(1,"Please select atleast 1 image").max(5,"Max 5 images allowed"),
})
