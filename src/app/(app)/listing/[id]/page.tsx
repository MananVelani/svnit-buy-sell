'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Listing } from "@/model/Listing"
import { use, useEffect, useState } from "react"

interface Props {
  params: { id: string }
}



export default function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const response = await axios.get<ApiResponse<Listing>>(`/api/listings/${id}`)
        
        if (response.data.success && response.data.data) {
          setListing(response.data.data)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error("Fetch error:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [id])  


  if (loading) return <div className="p-10 text-center">
    <div className="p-10 flex justify-center gap-6">
      {[1].map((i) => (
        <div
          key={i}
          className="w-200 h-120 bg-gray-200 rounded-xl animate-pulse flex flex-col"
        >
          <div className="h-36 w-full bg-gray-300 rounded-t-xl" />

          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-3 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  if (error || !listing) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-bold">Listing not found</h1>
      </div>
    )
  }

  

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {listing.title}
          </CardTitle>

          <div className="flex gap-3 text-sm text-muted-foreground">
            <Badge>
              {listing?.categorySlug}
            </Badge>
            <span className="font-semibold text-lg">₹ {listing.price.toLocaleString()}</span>
            <span className="font-semibold text-lg">•</span>
            <span className="font-semibold text-lg">{listing.images.length} image{listing.images.length > 1 ? "s" : ""}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {listing.images.map((url: string, idx: number) => (
              <div key={idx} className="relative w-full h-40 rounded-md overflow-hidden">
                <Image
                  src={url}
                  alt={listing.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />

              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-wrap leading-relaxed">
              {listing.description}
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}


//Things Required for listing

// photos
// price
// description
// seller info
// contact button

// Homepage
//    ↓
// Category page (/category/study)
//    ↓
// Listings grid
//    ↓ click one item
// /listing/abc123
