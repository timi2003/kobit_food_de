"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Copy, Building2, CheckCircle2 } from "lucide-react"

interface PaymentMethodSelectorProps {
  amount: number
  email: string
  onSuccess: (reference: string, method: string) => void
  onCancel: () => void
}

export function PaymentMethodSelector({ amount, email, onSuccess, onCancel }: PaymentMethodSelectorProps) {
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState(email || "")
  const [customerPhone, setCustomerPhone] = useState("")
  const [transferReference, setTransferReference] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [transferDate, setTransferDate] = useState("")
  const [transferNotes, setTransferNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bankDetails = {
    bankName: "First Bank of Nigeria",
    accountName: "KOBIT RESTAURANT LTD",
    accountNumber: "3085467291",
    sortCode: "011151003",
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerName || !customerEmail || !customerPhone || !transferReference || !transferAmount || !transferDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(transferAmount) !== amount) {
      toast({
        title: "Amount mismatch",
        description: `Transfer amount must be exactly ₦${amount.toFixed(2)}`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate submission processing
    setTimeout(() => {
      const reference = `BT_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`

      toast({
        title: "Transfer confirmation submitted",
        description: "Your payment confirmation is being reviewed",
      })

      onSuccess(reference, "bank_transfer")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Bank Transfer Payment
          </CardTitle>
          <CardDescription>Transfer ₦{amount.toFixed(2)} to the account below and confirm your payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-lg">Bank Account Details</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Bank Name</Label>
                <div className="flex items-center justify-between p-2 bg-background rounded border">
                  <span className="font-mono">{bankDetails.bankName}</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(bankDetails.bankName, "Bank name")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Account Name</Label>
                <div className="flex items-center justify-between p-2 bg-background rounded border">
                  <span className="font-mono">{bankDetails.accountName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bankDetails.accountName, "Account name")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Account Number</Label>
                <div className="flex items-center justify-between p-2 bg-background rounded border">
                  <span className="font-mono text-lg font-bold">{bankDetails.accountNumber}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bankDetails.accountNumber, "Account number")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Sort Code</Label>
                <div className="flex items-center justify-between p-2 bg-background rounded border">
                  <span className="font-mono">{bankDetails.sortCode}</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(bankDetails.sortCode, "Sort code")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Amount to Transfer:</strong> ₦{amount.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confirm Your Transfer</CardTitle>
          <CardDescription>
            After making the transfer, please fill out this form to confirm your payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  placeholder="Your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email Address *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number *</Label>
                <Input
                  id="customerPhone"
                  placeholder="080XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transferReference">Transfer Reference *</Label>
                <Input
                  id="transferReference"
                  placeholder="Bank reference number"
                  value={transferReference}
                  onChange={(e) => setTransferReference(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transferAmount">Amount Transferred *</Label>
                <Input
                  id="transferAmount"
                  type="number"
                  step="0.01"
                  placeholder={amount.toFixed(2)}
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transferDate">Transfer Date *</Label>
                <Input
                  id="transferDate"
                  type="datetime-local"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transferNotes">Additional Notes (Optional)</Label>
              <Textarea
                id="transferNotes"
                placeholder="Any additional information about your transfer"
                value={transferNotes}
                onChange={(e) => setTransferNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Confirm Transfer"}
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
