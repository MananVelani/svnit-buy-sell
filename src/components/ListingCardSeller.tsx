"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface ListingCardSellerProps {
  listing: {
    _id: string
    title: string
    price: number
    categorySlug: string
    images: string[]
  }
  onDelete: (id: string) => void
}

export default function ListingCardSeller({ listing, onDelete }: ListingCardSellerProps) {
  return (
    <Card className="hover:shadow-lg transition rounded-lg overflow-hidden">
      {/* ---- IMAGE ---- */}
      <div className="relative w-full h-40 bg-secondary">
        {listing.images?.[0] && (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* ---- TITLE ---- */}
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg font-semibold truncate capitalize">
          {listing.title}
        </CardTitle>
      </CardHeader>

      {/* ---- DETAILS ---- */}
      <CardContent className="space-y-3 text-sm">
        {/* Price */}
        <div className="flex flex-row items-center gap-3">
          <span className="text-muted-foreground font-medium w-20">Price:</span>
          <p className="text-primary font-semibold text-lg">
            ₹ {listing.price.toLocaleString()}
          </p>
        </div>

        {/* Category */}
        <div className="flex flex-row items-center gap-3">
          <span className="text-muted-foreground font-medium w-20">Category:</span>
          <Badge className="bg-primary text-primary-foreground capitalize">
            {listing.categorySlug}
          </Badge>
        </div>

        {/* ---- ACTIONS ---- */}
        <div className="flex items-center gap-2 pt-4">
          <Link href={`/listing/${listing._id}`} className="w-full">
            <Button className="w-full" variant="outline">
              View
            </Button>
          </Link>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => onDelete(listing._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
