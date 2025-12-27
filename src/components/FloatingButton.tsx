"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation, Home, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function FloatingButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
      
      {open && (
        <div className="flex flex-col items-end gap-2 transition-all">
          <Link href="/">
            <Button variant="default" size="sm" className="shadow-md flex items-center gap-2">
              <Home size={16} />
              Home
            </Button>
          </Link>

            <Button
      onClick={() => router.back()}
      variant="secondary"
      size="sm"
      className="shadow-md flex items-center gap-2"
    >
      <ArrowLeft size={16} />
      Back
    </Button>
        </div>
      )}

      <Button
        size="icon"
        className="rounded-full shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <Navigation className={`h-5 w-5 transition-transform ${open ? "rotate-90" : ""}`} />
      </Button>
    </div>
  )
}
