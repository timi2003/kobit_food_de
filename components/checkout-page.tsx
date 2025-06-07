"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MapPin, CreditCard, Clock, Loader2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { BankTransferPayment } from "@/components/payment/bank-transfer-payment"
import { toast } from "@/hooks/use-toast"

interface DeliveryAddress {
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  contact: string
  instructions?: string
}

interface OrderDetails {
  _id: string
  orderNumber: string
  pricing: {
    total: number
    subtotal: number
    deliveryFee: number
    serviceFee: number34
    tax: number
  }
  status: string
}

export function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    contact: "",
    instructions: "",
  })

  const [specialInstructions, setSpecialInstructions] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)

  // Update delivery address when user data is available
  useEffect(() => {
    if (user) {
      setDeliveryAddress((prev) => ({
        ...prev,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      }))
    }
  }, [user])

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push("/login?redirect=/checkout")
    return null
  }

  // Show empty cart message
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some delicious items to your cart first!</p>
          <Button onClick={() => router.push("/restaurants")}>Browse Restaurants</Button>
        </div>
      </div>
    )
  }

  const subtotal = getTotalPrice()
  const deliveryFee = 500 // ₦500 base delivery fee
  const serviceFee = Math.round(subtotal * 0.05) // 5% service fee
  const tax = Math.round(subtotal * 0.075) // 7.5% VAT
  const total = subtotal + deliveryFee + serviceFee + tax

  const handleCreateOrder = async () => {
    try {
      setIsProcessing(true)

      // Validate address
      if (!deliveryAddress.name || !deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.state) {
        toast({
          title: "Missing information",
          description: "Please fill in all delivery address fields",
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }

      // Get restaurant ID from first item (use a default if not available)
      const restaurantId = items[0]?.restaurantId || "default-restaurant-id"

      const orderData = {
        restaurantId,
        items: items.map((item) => ({
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          customizations: item.customizations || {},
        })),
        deliveryAddress: {
          ...deliveryAddress,
          coordinates: {
            latitude: 6.5244, // Default Lagos coordinates
            longitude: 3.3792,
          },
        },
        paymentMethod: "bank_transfer",
        specialInstructions,
        pricing: {
          subtotal,
          deliveryFee,
          serviceFee,
          tax,
          total,
        },
        customer: {
          id: user?._id || user?.id,
          email: user?.email,
          name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        },
      }

      const response = await apiClient.createOrder(orderData)

      if (response.success && response.data) {
        setOrderDetails(response.data.order)
        setOrderCreated(true)

        toast({
          title: "Order created",
          description: `Your order #${response.data.order.orderNumber} has been created successfully!`,
        })
      } else {
        throw new Error(response.error || "Failed to create order")
      }
    } catch (error) {
      console.error("Order creation failed:", error)
      toast({
        title: "Order failed",
        description: error instanceof Error ? error.message : "Failed to create your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = async (reference: string) => {
    try {
      if (!orderDetails) {
        throw new Error("No order details available")
      }

      // Update order with payment reference
      await apiClient.updateOrderPayment({
        orderId: orderDetails._id,
        paymentReference: reference,
        status: "payment_pending",
      })

      toast({
        title: "Payment initiated",
        description: "Your payment has been initiated. We'll process your order once payment is confirmed.",
      })

      // Clear cart after successful payment initiation
      clearCart()

      // Redirect to order confirmation
      router.push(`/order-confirmation?orderId=${orderDetails._id}`)
    } catch (error) {
      console.error("Payment update failed:", error)
      toast({
        title: "Payment update failed",
        description: "Failed to update payment information. Please contact support.",
        variant: "destructive",
      })
    }
  }

  if (orderCreated && orderDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-600">Order Created Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-lg font-semibold">Order #{orderDetails.orderNumber}</p>
                <p className="text-gray-600">Total: ₦{orderDetails.pricing.total.toLocaleString()}</p>
              </div>

              <BankTransferPayment
                orderNumber={orderDetails.orderNumber}
                amount={orderDetails.pricing.total}
                customerEmail={user?.email || ""}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={deliveryAddress.name}
                    onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">contact</Label>
                  <Input
                    id="contact"
                    value={deliveryAddress.contact}
                    onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, contact: e.target.value }))}
                    placeholder="Enter your contact"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="street">Location</Label>
                <Input
                  id="street"
                  value={deliveryAddress.street}
                  onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, street: e.target.value }))}
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={deliveryAddress.state}
                    onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, state: e.target.value }))}
                    placeholder="Enter your state"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  value={deliveryAddress.instructions}
                  onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Any special delivery instructions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Special Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests for your order..."
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">BANK</span>
                  </div>
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-600">Pay via bank transfer to complete your order</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {item.customizations && Object.keys(item.customizations).length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Object.entries(item.customizations).map(([key, value]) => (
                            <span key={key} className="block">
                              {key}: {Array.isArray(value) ? value.join(", ") : String(value)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₦{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (7.5%)</span>
                  <span>₦{tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Estimated Delivery Time */}
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Estimated delivery: 30-45 minutes</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                size="lg"
                onClick={handleCreateOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Order...
                  </>
                ) : (
                  `Place Order - ₦${total.toLocaleString()}`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
