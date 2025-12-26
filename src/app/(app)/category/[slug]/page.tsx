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
        <p>Loading...</p>
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
