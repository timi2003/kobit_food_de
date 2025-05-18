"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Label } from "@/app/components/ui/label"
import { PaystackPayment } from "./paystack-payment"
import { FlutterwavePayment } from "./flutterwave-payment"
import { CreditCard, Wallet } from "lucide-react"

interface PaymentMethodSelectorProps {
  amount: number
  email: string
  onSuccess: (reference: string, method: string) => void
  onCancel: () => void
}

export function PaymentMethodSelector({ amount, email, onSuccess, onCancel }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("card")
  const [selectedProvider, setSelectedProvider] = useState<string>("paystack")

  const handleSuccess = (reference: string) => {
    onSuccess(reference, selectedProvider)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="h-5 w-5" />
              <span>Card Payment</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value="bank" id="bank" disabled />
            <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer text-muted-foreground">
              <Wallet className="h-5 w-5" />
              <span>Bank Transfer (Coming Soon)</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {selectedMethod === "card" && (
        <div>
          <h3 className="text-lg font-medium mb-4">Select Payment Provider</h3>
          <RadioGroup value={selectedProvider} onValueChange={setSelectedProvider} className="space-y-3">
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="paystack" id="paystack" />
              <Label htmlFor="paystack" className="flex items-center gap-2 cursor-pointer">
                <img src="/placeholder.svg?height=24&width=24" alt="Paystack" className="h-6" />
                <span>Paystack</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="flutterwave" id="flutterwave" />
              <Label htmlFor="flutterwave" className="flex items-center gap-2 cursor-pointer">
                <img src="/placeholder.svg?height=24&width=24" alt="Flutterwave" className="h-6" />
                <span>Flutterwave</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      <div className="pt-4">
        {selectedMethod === "card" && selectedProvider === "paystack" && (
          <PaystackPayment amount={amount} email={email} onSuccess={handleSuccess} onCancel={onCancel} />
        )}

        {selectedMethod === "card" && selectedProvider === "flutterwave" && (
          <FlutterwavePayment amount={amount} email={email} onSuccess={handleSuccess} onCancel={onCancel} />
        )}
      </div>
    </div>
  )
}
