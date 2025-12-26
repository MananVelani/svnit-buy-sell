'use client'
import { verifySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as  z from 'zod';
import axios,{AxiosError} from 'axios'
import { toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const VerifyAccount = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const params = useParams<{username:string}>();
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver:zodResolver(verifySchema),
        defaultValues:{
        code:""
    }

    })

    const onSubmit =async (data: z.infer<typeof verifySchema>)=>{

    setIsSubmitting(true);

    try {
      
      const response = await axios.post('/api/verify-code',{
        username:params.username,
        code:data.code
      })  
      toast.success(response.data.message);
       router.replace('/sign-in')  
    } catch (error) {
      const axiosError =  error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message); 
      
    } finally {
      setIsSubmitting(false);
    }
}

    
  return (
      <div className="flex justify-center items-center min-h-screen bg-background">
    <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Join Svnit-Buy-Sell
        </h1>
        <p className="mb-4">You got a verification code through email</p>
      </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
   
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Verfiying ...' : 'VerifyCode'}
        </Button>
      </form>
    </Form>
    
    </div>
  </div>
  )
}

export default VerifyAccount