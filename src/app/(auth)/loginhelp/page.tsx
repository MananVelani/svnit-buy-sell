'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginHelpSchema } from "@/schemas/LoginHelpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"


const LoginHelp = () => {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "code" | "password">("email")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof loginHelpSchema>>({
    resolver: zodResolver(loginHelpSchema),
    defaultValues: {
      email: "",
      code: "",
      password: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof loginHelpSchema>) => {
    setIsSubmitting(true)

    try {
      if (step === "email") {
        
        const response =await axios.post<ApiResponse>('/api/loginhelp/send-verification-code',data);
        if(response.data.success){
            toast.success("Verification code sent to your email")
            setStep("code")
        } else {
            toast.error(response.data.message);
        }
        
      } else if (step === "code") {
        const response =await axios.post<ApiResponse>('/api/loginhelp/verify-code',data);
        if(response.data.success){
            toast.success("Verification code verified successfully")
            setStep("password")
        } else {
            toast.error(response.data.message);
        }
      } else if (step === "password") {
        const response =await axios.post<ApiResponse>('/api/loginhelp/reset-password',data);
        if(response.data.success){
            toast.success("Password reset successful")
            router.replace("/sign-in")
        } else {
            toast.error(response.data.message);
        }
        

      }
        } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
    } else {
        toast.error("Something went wrong")
    }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Login help 
          </h1>
          <p className="mb-4">Verify your email to reset password</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {step === "email" && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === "code" && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter verification code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}


            {step === "password" && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}


            {step === "email" && (
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send Code"}
              </Button>
            )}

            {step === "code" && (
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </Button>
            )}

            {step === "password" && (
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Resetting Password..." : "Reset Password"}
              </Button>
            )}

          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Remembered your password?{" "}
            <Button variant="link" onClick={() => router.push("/sign-in")} className="text-blue-600 p-0">
              Sign In
            </Button>
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoginHelp
