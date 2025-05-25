"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppStore } from "@/lib/store"

export function AdminDashboard() {
  const { state } = useAppStore()
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Total Revenue",
      value: `₦${state.stats.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Total Orders",
      value: state.stats.totalOrders.toString(),
      change: "+8.2%",
      trend: "up",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "New Customers",
      value: state.stats.newCustomers.toString(),
      change: "+32.1%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Avg. Order Value",
      value: `₦${state.stats.avgOrderValue.toLocaleString()}`,
      change: "-4.3%",
      trend: "down",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ]

  const recentOrders = state.orders.slice(0, 5).map((order) => ({
    id: order.id,
    customer: order.customer.name,
    email: order.customer.email,
    phone: order.customer.phone,
    items: order.items.length,
    total: `₦${order.total.toLocaleString()}`,
    paymentMethod: "Bank Transfer",
    transferRef: order.transferReference || "Pending",
    status:
      order.status === "payment_confirmed"
        ? "Payment Confirmed"
        : order.status === "preparing"
          ? "Preparing"
          : order.status === "pending_payment"
            ? "Pending Payment"
            : order.status,
    time: new Date(order.createdAt).toLocaleString(),
    avatar: order.customer.avatar || "/placeholder.svg?height=32&width=32",
    orderDetails: order.items.map((item) => `${item.quantity}x ${item.name}`).join(", "),
  }))

  // Use the deterministic sales data from the store instead of Math.random()
  const topItems = state.menuItems.map((item) => ({
    name: item.name,
    sold: item.sold,
    revenue: `₦${item.revenue.toLocaleString()}`,
    growth: item.growth,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">Monitor your restaurant's performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="today" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full text-primary">{stat.icon}</div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h2 className="text-3xl font-bold">{stat.value}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders and their status</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={order.avatar || "/placeholder.svg"} alt={order.customer} />
                        <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.id}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{order.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                      </div>
                      <Badge
                        variant={
                          order.status === "Payment Confirmed"
                            ? "default"
                            : order.status === "Pending Payment"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Contact</p>
                      <p>{order.email}</p>
                      <p>{order.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment</p>
                      <p>{order.paymentMethod}</p>
                      <p className="font-mono text-xs">{order.transferRef}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Order Items</p>
                      <p>{order.orderDetails}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>Best performing menu items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topItems.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.sold} sold</span>
                        <span>•</span>
                        <span>{item.revenue}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {item.growth}%
                    </div>
                  </div>
                  <Progress value={item.sold / 4} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Products
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
