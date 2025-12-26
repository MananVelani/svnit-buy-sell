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

  // 2. Set up state for your data
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // 3. Use useEffect to fetch once
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


  if (loading) return <div className="p-10 text-center">Loading listing...</div>
  
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
        {/* ========= HEADER ========== */}
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

        {/* ========= CONTENT ========== */}
        <CardContent className="space-y-6">

          {/* Images */}
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

          {/* Description */}
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
