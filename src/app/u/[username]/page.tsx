'use client'

import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';



const page = () => {
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [message, setMessage] = useState("")

  
  const params = useParams();
  const username = params.username;

  const handleSendMessage = async () => {
    if (!message) return toast.error("Message cannot be empty");
    setIsSendingMessage(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        username,
        content: message 
      })
      if (response.data.success) {
        toast.success(response.data.message);
        setMessage(""); // Clear message on success
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Failed to Send Messages.");
    } finally {
      setIsSendingMessage(false);
    }
  }





  return (
    <div className="container mx-auto py-10 max-w-4xl px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Public Profile Link</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Send Message to @{username}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <Textarea 
            placeholder="Write your anonymous message here..."
            className="min-h-30 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          <Button 
            onClick={handleSendMessage}
            disabled={isSendingMessage || !message}
            className="bg-foreground text-background hover:bg-slate-800 px-8 py-6 text-lg rounded-md"
          >
            {isSendingMessage ? (
              <><Loader className='animate-spin mr-2'/></>
            ) : ('Send It')}
          </Button>
        </CardContent>
      </Card>



      

      <Separator className="my-10 " />

      <div className="text-center space-y-4">
        <p className="text-sm font-medium">Get Your Message Board</p>
        <Button className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-4">
          Create Your Account
        </Button>
      </div>
    </div>
  )
}

export default page
