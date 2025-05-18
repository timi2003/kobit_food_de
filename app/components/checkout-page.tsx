"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Separator } from "@/app/components/ui/separator"
import { Textarea } from "@/app/components/ui/textarea"
import { PaymentMethodSelector } from "@/app/components/payment/payment-method-selector"
import { toast } from "@/app/hooks/use-toast"
import { MapPin, Clock, CreditCard, ChevronRight, ChevronLeft } from "lucide-react"
import { useCart } from "@/app/context/cart-context"

export function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [paymentComplete, setPaymentComplete] = useState(false)

  // Delivery details
  const [address, setAddress] = useState("")
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [deliveryInstructions, setDeliveryInstructions] = useState("")

  const deliveryFee = deliveryOption === "express" ? 5.99 : 2.99
  const serviceFee = 1.99
  const total = subtotal + deliveryFee + serviceFee

  // Convert to Naira for Nigerian payment methods (example conversion rate)
  const exchangeRate = 1500 // Example: 1 USD = 1500 Naira
  const totalInNaira = Math.round(total * exchangeRate)

  const handleNextStep = () => {
    if (step === 1 && !address) {
      toast({
        title: "Missing information",
        description: "Please enter your delivery address",
        variant: "destructive",
      })
      return
    }

    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handlePaymentSuccess = (reference: string, method: string) => {
    setPaymentComplete(true)

    // In a real app, you would submit the order to your backend here
    setTimeout(() => {
      clearCart() // Clear the cart after successful payment
      router.push("/order-confirmation")
    }, 2000)
  }

  const handlePaymentCancel = () => {
    toast({
      title: "Payment cancelled",
      description: "Your payment has been cancelled",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center ${
                step >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center ${
                step >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center ${
                step >= 3 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Step {step} of 3</div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Details
              </CardTitle>
              <CardDescription>Where should we deliver your order?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Delivery Options</Label>
                <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="font-medium">Standard Delivery</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        30-45 minutes
                      </div>
                    </Label>
                    <span className="font-medium">${deliveryOption === "standard" ? "2.99" : "5.99"}</span>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="font-medium">Express Delivery</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        15-25 minutes
                      </div>
                    </Label>
                    <span className="font-medium">${deliveryOption === "express" ? "5.99" : "2.99"}</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special instructions for delivery?"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNextStep}>
                Continue to Order Summary
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order before payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Delivery Details</h3>
                <p className="text-sm">{address}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {deliveryOption === "standard" ? "Standard Delivery (30-45 min)" : "Express Delivery (15-25 min)"}
                </p>
                {deliveryInstructions && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Instructions:</p>
                    <p className="text-sm text-muted-foreground">{deliveryInstructions}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Continue to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
              <CardDescription>Complete your order by making a payment</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentMethodSelector
                amount={totalInNaira}
                email="customer@example.com" // In a real app, this would come from the user's profile
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />
            </CardContent>
            {!paymentComplete && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </CardFooter>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
