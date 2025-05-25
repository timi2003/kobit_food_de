"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Building2,
  Calendar,
  DollarSign,
  User,
  Phone,
  Mail,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAppStore } from "@/lib/store"

export function AdminPaymentConfirmations() {
  const { state, dispatch } = useAppStore()
  const [selectedTab, setSelectedTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const handleConfirmPayment = (paymentId: string) => {
    dispatch({
      type: "UPDATE_PAYMENT_CONFIRMATION",
      payload: {
        id: paymentId,
        updates: {
          status: "confirmed",
          reviewedAt: new Date().toISOString(),
          reviewedBy: "Admin",
        },
      },
    })

    toast({
      title: "Payment Confirmed",
      description: "Payment has been confirmed and order is being processed",
    })
  }

  const handleRejectPayment = (paymentId: string) => {
    dispatch({
      type: "UPDATE_PAYMENT_CONFIRMATION",
      payload: {
        id: paymentId,
        updates: {
          status: "rejected",
          reviewedAt: new Date().toISOString(),
          reviewedBy: "Admin",
        },
      },
    })

    toast({
      title: "Payment Rejected",
      description: "Payment has been rejected and customer will be notified",
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const paymentConfirmationsWithDetails = state.paymentConfirmations.map((payment) => {
    const order = state.orders.find((o) => o.id === payment.orderId)
    const customer = state.customers.find((c) => c.id === payment.customerId)

    return {
      ...payment,
      customer: customer || order?.customer,
      orderItems:
        order?.items.map((item) => `${item.quantity}x ${item.name} (₦${item.price.toLocaleString()})`).join(", ") ||
        "N/A",
    }
  })

  const filteredPayments = paymentConfirmationsWithDetails.filter(
    (payment) =>
      payment.status === selectedTab &&
      (payment.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transferReference.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Confirmations</h2>
          <p className="text-muted-foreground">Review and manage bank transfer confirmations</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payments..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({state.paymentConfirmations.filter((p) => p.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed ({state.paymentConfirmations.filter((p) => p.status === "confirmed").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({state.paymentConfirmations.filter((p) => p.status === "rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={payment.customer?.avatar || "/placeholder.svg"} alt={payment.customer?.name} />
                      <AvatarFallback>{payment.customer?.name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{payment.customer?.name || "Unknown Customer"}</h3>
                        <span className="text-sm text-muted-foreground">{payment.orderId}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Submitted {new Date(payment.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(payment.status)}
                    <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold">₦{payment.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Transfer Ref</p>
                      <p className="font-mono text-sm">{payment.transferReference}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Transfer Date</p>
                      <p className="text-sm">{new Date(payment.transferDate).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="text-sm">{payment.customer?.phone || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {payment.status === "pending" && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      size="sm"
                      onClick={() => handleConfirmPayment(payment.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Confirm Payment
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleRejectPayment(payment.id)}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject Payment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredPayments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No {selectedTab} payments found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {selectedPayment && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg overflow-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Payment Details - {selectedPayment.orderId}</CardTitle>
              <CardDescription>Complete payment confirmation information</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setSelectedPayment(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Customer Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{selectedPayment.customer?.name || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{selectedPayment.customer?.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{selectedPayment.customer?.phone || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Payment Information</h4>
                <div className="space-y-2">
                  <div>
                    <Label>Amount</Label>
                    <p className="text-lg font-bold">₦{selectedPayment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label>Transfer Reference</Label>
                    <p className="font-mono">{selectedPayment.transferReference}</p>
                  </div>
                  <div>
                    <Label>Transfer Date</Label>
                    <p>{new Date(selectedPayment.transferDate).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Order Items</h4>
              <p className="text-sm text-muted-foreground">{selectedPayment.orderItems}</p>
            </div>

            {selectedPayment.customerNotes && (
              <div>
                <h4 className="font-semibold mb-2">Customer Notes</h4>
                <p className="text-sm text-muted-foreground">{selectedPayment.customerNotes}</p>
              </div>
            )}

            {selectedPayment.status === "pending" && (
              <div className="flex gap-4 pt-4 border-t">
                <Button
                  onClick={() => {
                    handleConfirmPayment(selectedPayment.id)
                    setSelectedPayment(null)
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Confirm Payment
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleRejectPayment(selectedPayment.id)
                    setSelectedPayment(null)
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Payment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
