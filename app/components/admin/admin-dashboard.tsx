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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,628",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Total Orders",
      value: "1,429",
      change: "+8.2%",
      trend: "up",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "New Customers",
      value: "342",
      change: "+32.1%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Avg. Order Value",
      value: "$28.50",
      change: "-4.3%",
      trend: "down",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ]

  const recentOrders = [
    {
      id: "#3210",
      customer: "Sophia Anderson",
      items: 3,
      total: "$42.50",
      status: "Delivered",
      time: "10 min ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "#3209",
      customer: "James Wilson",
      items: 2,
      total: "$28.99",
      status: "Preparing",
      time: "25 min ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "#3208",
      customer: "Emma Thompson",
      items: 4,
      total: "$56.20",
      status: "In Transit",
      time: "45 min ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "#3207",
      customer: "Michael Brown",
      items: 1,
      total: "$12.99",
      status: "Delivered",
      time: "1 hour ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "#3206",
      customer: "Olivia Davis",
      items: 5,
      total: "$78.45",
      status: "Delivered",
      time: "2 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const topItems = [
    {
      name: "Margherita Pizza",
      sold: 342,
      revenue: "$4,445.80",
      growth: 12.5,
    },
    {
      name: "Double Cheeseburger",
      sold: 276,
      revenue: "$2,757.24",
      growth: 8.3,
    },
    {
      name: "Chicken Caesar Salad",
      sold: 189,
      revenue: "$1,699.11",
      growth: 5.7,
    },
    {
      name: "Chocolate Lava Cake",
      sold: 156,
      revenue: "$1,091.44",
      growth: 15.2,
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
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
                <div key={order.id} className="flex items-center justify-between">
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
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Preparing"
                            ? "outline"
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
