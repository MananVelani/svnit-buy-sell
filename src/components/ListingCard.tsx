"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ListingCardProps {
  listing: {
    _id: string
    title: string
    price: number
    categorySlug: string
    images: string[]
    userId: {
      _id: string
      username: string
    }
    
  }
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden border border-border">
      {/* ---- IMAGE SECTION ---- */}
      <Link href={`/listing/${listing._id}`}>
        <div className="relative w-full h-48 bg-muted overflow-hidden group">
          {listing.images?.[0] ? (
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image Available
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="backdrop-blur-md bg-white/80 dark:bg-black/60">
              {listing.categorySlug}
            </Badge>
          </div>
        </div>
      </Link>

      {/* ---- CONTENT SECTION ---- */}
      <CardHeader className="pt-4 pb-1 px-4">
        <CardTitle className="text-base font-bold truncate capitalize">
          {listing.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-0 space-y-4">
        <div className="flex items-baseline justify-between">
          <p className="text-xl font-bold text-primary">
            ₹{listing.price.toLocaleString()}
          </p>
        </div>

        {/* ---- ACTION BUTTONS ---- */}
        <div className="pt-2 space-y-2">
          <Link href={`/listing/${listing._id}`} className="w-full block">
            <Button className="w-full font-medium" variant="default">
              View Details
            </Button>
          </Link>

          <Link href={`/u/${listing.userId.username}`} className="w-full block">
            <Button className="w-full font-medium" variant="secondary">
              Contact Seller
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
