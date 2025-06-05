"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Copy, CheckCircle } from "lucide-react"
import { apiClient } from "@/lib/api-client"

interface BankTransferPaymentProps {
  amount: number
  orderNumber: string
  customerEmail: string
  onPaymentSuccess?: (reference: string) => void
}

export function BankTransferPayment({
  amount,
  orderNumber,
  customerEmail,
  onPaymentSuccess,
}: BankTransferPaymentProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  // Generate a unique reference code for this payment
  const referenceCode = `KOB-${orderNumber}-${Date.now().toString().slice(-6)}`

  // Bank account details
  const bankAccounts = [
    {
      bank: "GTBank",
      accountNumber: "0123456789",
      accountName: "KOBIT Food Delivery Ltd",
    },
    {
      bank: "First Bank",
      accountNumber: "1234567890",
      accountName: "KOBIT Food Delivery Ltd",
    },
  ]

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 3000)
  }

  const handleConfirmPayment = async () => {
    setIsConfirming(true)
    try {
      // Call the API to record the bank transfer
      await apiClient.processBankTransfer({
        orderNumber,
        amount,
        customerEmail,
        reference: referenceCode,
        bankAccount: bankAccounts[0].bank,
      })

      setIsConfirmed(true)
      toast({
        title: "Transfer confirmation received",
        description: "We'll process your order once payment is confirmed.",
      })

      // Call the onPaymentSuccess callback if provided
      if (onPaymentSuccess) {
        onPaymentSuccess(referenceCode)
      }
    } catch (error) {
      console.error("Failed to confirm payment:", error)
      toast({
        title: "Confirmation failed",
        description: "Failed to confirm your payment. Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setIsConfirming(false)
    }
  }

  // Format currency in Naira
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (isConfirmed) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Transfer Confirmation Received</h3>
        <p className="text-gray-600 mb-4">
          We'll process your order once your payment is confirmed. You'll receive updates via email.
        </p>
        <p className="text-sm text-gray-500">Reference Code: {referenceCode}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> Please make your transfer using the details below. Include the reference code in
          your transfer description to help us identify your payment.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount to Pay:</span>
          <span className="font-bold text-lg">{formatCurrency(amount)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Reference Code:</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">{referenceCode}</span>
            <button
              onClick={() => handleCopy(referenceCode, "reference")}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Copy reference code"
            >
              {copied === "reference" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Bank Account Details</h3>
        <div className="space-y-4">
          {bankAccounts.map((account, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{account.bank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Account Number:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono">{account.accountNumber}</span>
                      <button
                        onClick={() => handleCopy(account.accountNumber, `account-${index}`)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Copy account number"
                      >
                        {copied === `account-${index}` ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Account Name:</span>
                    <span>{account.accountName}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleConfirmPayment}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isConfirming}
        >
          {isConfirming ? "Processing..." : "I've Made the Transfer"}
        </Button>
        <p className="text-xs text-center text-gray-500 mt-2">
          Click this button after you've completed your bank transfer
        </p>
      </div>
    </div>
  )
}
