import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, MapPin, Receipt, Home } from "lucide-react"

export default function OrderConfirmation() {
  // In a real app, this data would come from the server or be passed via state
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  const estimatedDelivery = "30-45 minutes"

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. Your food is being prepared and will be on its way soon.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{orderNumber}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Estimated Delivery Time</h3>
                  <p className="text-muted-foreground">{estimatedDelivery}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Delivery Address</h3>
                  <p className="text-muted-foreground">......</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Receipt className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Payment</h3>
                  <p className="text-muted-foreground"></p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="w-full p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>2 × Margherita Pizza</span>
                    <span>25.98</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 × Double Cheeseburger</span>
                    <span>$9.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 × Chocolate Lava Cake</span>
                    <span>$6.99</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$42.96</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>$2.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span>$1.99</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2">
                      <span>Total</span>
                      <span>$47.94</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
