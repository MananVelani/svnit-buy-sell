'use client'
import { useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ApiResponse } from '@/types/ApiResponse'
import { MessageDTO } from '@/types/Message'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Loader2, RefreshCcw, MessageSquare, List } from 'lucide-react'
import MessageCard from '@/components/MessageCard'
import Link from 'next/link'
import ListingCardSeller from '@/components/ListingCardSeller'

export default function UserDashboardPage() {
  const [messages, setMessages] = useState<MessageDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'messages' | 'listings'>('messages')

  const { data: session } = useSession()

  const [myListings, setMyListings] = useState<any[]>([])

  const username = session?.user?.username
  const [profileUrl, setProfileUrl] = useState("");

   useEffect(() => {
     if (typeof window !== "undefined") {
       setProfileUrl(`${window.location.origin}/u/${username}`);
     }
   }, [username]);

  const userId = session?.user._id;


const fetchMyListings = useCallback(async () => {
  if (!userId) return;
  try {
    const response = await axios.get(`/api/users/${userId}/listings`)
    if(response.data.success){
      setMyListings(response.data.data)
      toast.success(response.data.message);
    } else {
      toast.error("Failed to load your listings")
    }
    
  } catch (error) {
    toast.error("Failed to load your listings")
  }
}, [userId])




const handleDeleteListing = async (id: string) => {
  try {
    const response = await axios.delete(`/api/delete-listing/${id}`)
    if(response.data.success){
      setMyListings((prev) => prev.filter((item) => item._id !== id))
      toast.success("Listing Deleted Successfully")
    }

  } catch {
    toast.error("Failed to delete Listing")
  }
}




  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((message) => message._id !== messageId))
  }

  const fetchMessages = useCallback(async (refresh = false) => {
    setIsLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages ?? [])
      if (refresh) toast.success('Messages updated')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Failed to fetch messages")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
  if (session) {
    fetchMessages();
    fetchMyListings();
  }
},[session, userId, fetchMessages, fetchMyListings])







  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success("Profile URL copied to clipboard")
  }

    if (!session) return <div>Please Login</div>


  return (
    <div className="my-8  mx-4 md:mx-8 lg:mx-auto p-6 bg-accent rounded-md w-full max-w-6xl">
      
      <div className='flex flex-row justify-between '>
              <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>

        <Link href="/">
                  <Button className="font-semibold bg-chart-1 text-white ">
                    Home
                  </Button>
      </Link>
      </div>

      {/* Unique messaging link */}
      <div className="mb-8 bg-sidebar-ring rounded-md p-2">
        <h2 className="text-lg font-semibold mb-2 ml-1">Copy Your Unique Message Link</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="rounded-md bg-secondary w-full p-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <Separator className="bg-foreground" />

      {/* ===== BUTTON BAR (TABS) ===== */}
      <div className="flex items-center gap-3 mt-4">

        {/* Refresh */}
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            activeTab === 'messages' && fetchMessages(true)
          }}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
        </Button>

        {/* Messages Tab */}
        <Button
          variant={activeTab === 'messages' ? "default" : "secondary"}
          onClick={() => setActiveTab('messages')}
        >
          <MessageSquare className="h-4 w-4 mr-2" /> Messages
        </Button>

        {/* My Listings Tab */}
        <Button
          variant={activeTab === 'listings' ? "default" : "secondary"}
          onClick={() => setActiveTab('listings')}
        >
          <List className="h-4 w-4 mr-2" /> My Listings
        </Button>
      </div>

      {/* ===== TAB CONTENT ===== */}
      <div className="mt-6">

        {/* --- MESSAGES --- */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))
            ) : (
              <p>No messages yet.</p>
            )}
          </div>
        )}

        {/* --- LISTINGS --- */}



        {activeTab === 'listings' && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Your Listings</h2>
            <p>You can view all your listings here:</p>
            {activeTab === 'listings' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.length > 0 ? (
                  myListings.map((listing) => (
                    <ListingCardSeller
                      key={listing._id}
                      listing={listing}
                      onDelete={(id) => handleDeleteListing(id)}
                    />
                  ))
                ) : (
                  <p>No listings yet.</p>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}
