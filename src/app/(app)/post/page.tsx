"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { categories } from "@/lib/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form"
import { listingSchema } from "@/schemas/listingSchema"
import { uploadImagesToCloudinary } from "@/lib/uploadImages"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { useRouter } from 'next/navigation'



type ListingFormData = z.infer<typeof listingSchema>


export default function PostPage() {
  const form = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      price: undefined,
      description: "",
      category: "",
      images: undefined,
    },
  })

  const router = useRouter();

  const onSubmit = async(data: ListingFormData) => {
    console.log(data);
    try {
      const response = await axios.post<ApiResponse>('/api/create-listing',data)
      if(response.data.success){
        router.replace(`/listing/${response.data.data?.listingId}`)
      }
      
    } catch (error) {
      console.error("Submission failed", error)
    }

  }

  

  return (
    <>
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create a New Listing</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="MacBook Air M1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₹)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="5000" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => field.onChange(cat.slug)}
                          className={`border rounded-md px-3 py-2 text-sm flex items-center gap-2
                            ${field.value === cat.slug ? "bg-primary text-primary-foreground" : "bg-card"}
                          `}
                        >
                          <span>{cat.icon}</span> {cat.name}
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Images */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Images (up to 5)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files) return;

                          const urls = await uploadImagesToCloudinary(files);
                          field.onChange(urls); // <-- set URLs directly into form
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="Describe your product..." {...field}
                      className="resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button className="w-full font-semibold" type="submit">
                Post Listing
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

    
    </>
  )
}



