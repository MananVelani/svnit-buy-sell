import "./globals.css"
import { ThemeProvider } from "next-themes"
import Navbar from "@/components/Navbar"
import AuthProvider from "@/context/AuthProvider"
import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
      </AuthProvider>
    </html>
  )
}
