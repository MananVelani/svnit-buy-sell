'use client'

import { useEffect, useState } from "react"
import { categories } from "@/lib/categories"
import ListingCard from "@/components/ListingCard"
import axios from "axios"
import { toast } from "sonner"
import { useParams } from "next/navigation"

interface Props {
  params: { slug: string }
}

export default function CategoryPage({ params }: Props) {
  const { slug } = useParams() as { slug: string }
  

  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return 
    const fetchListings = async () => {
      try {
        const response = await axios.get(`/api/category/${slug}/listings`)
        if (response.data.success) {
          setListings(response.data.data)
        } else {
          toast.error(response.data.message)
        }
      } catch (err) {
        toast.error("Failed to load listings")
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [slug])   

    if (!slug) {
    return <div className="p-10">Loading category...</div>
  }

  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    return <h1 className="text-3xl font-bold p-10">Category not found</h1>
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">
        {category.icon} {category.name}
      </h1>

      {loading ? (
          <div className="p-10 flex gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-100 h-110 bg-gray-200 rounded-xl animate-pulse flex flex-col"
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

      ) : listings.length === 0 ? (
        <p className="text-muted-foreground">No listings yet in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
