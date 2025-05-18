"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { toast } from "@/app/hooks/use-toast"
import { CreditCard, Mail, User, Phone, CheckCircle2 } from "lucide-react"

interface FlutterwavePaymentProps {
  amount: number
  email: string
  onSuccess: (reference: string) => void
  onCancel: () => void
}

export function FlutterwavePayment({ amount, email, onSuccess, onCancel }: FlutterwavePaymentProps) {
  const [paymentEmail, setPaymentEmail] = useState(email || "")
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")

    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }

    return digits
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    return value.replace(/\D/g, "").slice(0, 11)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentEmail || !fullName || !phoneNumber || !cardNumber || !expiryDate || !cvv) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      // Generate a fake reference
      const reference = `FLW_${Math.random().toString(36).substring(2, 15)}`

      toast({
        title: "Payment Successful",
        description: `Your payment of ₦${amount.toFixed(2)} was successful`,
      })

      // Call the success callback with the reference
      setTimeout(() => {
        onSuccess(reference)
      }, 1500)
    }, 2000)
  }

  if (isComplete) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex flex-col items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground text-center mb-4">
            Your payment of ₦{amount.toFixed(2)} has been processed successfully.
          </p>
          <p className="text-sm text-muted-foreground">Redirecting to order confirmation...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img src="/placeholder.svg?height=24&width=24" alt="Flutterwave" className="h-6" />
          Flutterwave Payment
        </CardTitle>
        <CardDescription>Fast and secure payments with Flutterwave</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Your full name"
                className="pl-10"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                className="pl-10"
                value={paymentEmail}
                onChange={(e) => setPaymentEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phoneNumber"
                placeholder="Your phone number"
                className="pl-10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="pl-10"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                maxLength={3}
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">You will be charged:</p>
            <p className="text-2xl font-bold">₦{amount.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay ₦${amount.toFixed(2)}`}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
