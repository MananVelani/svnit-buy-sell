'use client'
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { User } from "next-auth"

export default function Navbar() {
  const { data: session } = useSession() 
  const user: User = session?.user as User

  return (
    <nav className="border-b border-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="text-2xl font-bold tracking-tight">
          SVNIT<span className="text-primary">-Buy-Sell</span>
        </Link>

        <div className="flex items-center gap-4">
          {
            session ? (
              <>
                <Link href="/dashboard">
                  <Button >
                    Dashboard
                  </Button>
                </Link>

                <Link href="/post">
                  <Button className="font-semibold bg-chart-2 ">
                    Sell Item
                  </Button>
                </Link>

                <Button 
                  variant="destructive"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
              <Link href="/post">
                  <Button className="font-semibold bg-chart-2 ">
                    Sell Item
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <button className="w-full bg-chart-4 text-foreground rounded-md md:w-auto font-semibold px-3 py-2">
                    Login
                  </button>
                </Link>

                <Link href="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )
          }

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
