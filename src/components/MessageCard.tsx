'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Reply, X } from "lucide-react"
import { Message } from '@/model/User'
import { toast } from 'sonner';
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { useRouter } from 'next/navigation'

import dayjs from 'dayjs';
import { MessageDTO } from '@/types/Message'

type MessageCardProps = {
    message:MessageDTO
    onMessageDelete:(messageId: string)=>void;
}


const MessageCard = ({message,onMessageDelete}:MessageCardProps) => {

  const handleDeleteConfirm =async ()=>{
        const response = await axios.delete<ApiResponse>(
          `/api/delete-message?messageId=${message._id}`
        );
        toast(response.data.message)
        onMessageDelete(message._id.toString())
    }     

    const router = useRouter();

  return (

<Card>
  <CardHeader className="flex justify-between items-start">
    <div className="space-y-4">
      <CardTitle className="text-2xl">{message.content}</CardTitle>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="px-2 py-0.5 rounded-md bg-secondary">
          @{message.username}
        </span>
        — {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
      </div>
    </div>

    {/* 👉 RIGHT SIDE BUTTON STACK */}
    <div className="flex flex-col gap-2">
      {/* Reply Button (colored) */}
      <Button 
        className="w-fit bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => router.push(`/u/${message.username}`)}
      >
        <Reply className=" h-4 w-4" /> 
      </Button>

      {/* Delete Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-fit " variant="destructive">
            <X className=" h-4 w-4 text-white" /> 
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

  </CardHeader>
</Card>




  )
}


export default MessageCard