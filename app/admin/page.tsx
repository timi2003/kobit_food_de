"use client"

import { AppProvider } from "@/lib/store"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminPaymentConfirmations } from "@/components/admin/admin-payment-confirmation"
import { AdminCustomers } from "@/components/admin/admin-customers"
import { AdminMenuManagement } from "@/components/admin/admin-menu-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Utensils } from "lucide-react"

export default function Page() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Utensils className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-primary">KOBIT Restaurant Admin</h1>
              </div>
              <div className="text-sm text-muted-foreground">Restaurant Management System</div>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-6 h-12">
                <TabsTrigger value="dashboard" className="text-sm">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="orders" className="text-sm">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="payments" className="text-sm">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="customers" className="text-sm">
                  Customers
                </TabsTrigger>
                <TabsTrigger value="menu" className="text-sm">
                  Menu
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="dashboard" className="m-0">
                  <AdminDashboard />
                </TabsContent>

                <TabsContent value="orders" className="m-0">
                  <AdminDashboard />
                </TabsContent>

                <TabsContent value="payments" className="m-0">
                  <AdminPaymentConfirmations />
                </TabsContent>

                <TabsContent value="customers" className="m-0">
                  <AdminCustomers />
                </TabsContent>

                <TabsContent value="menu" className="m-0">
                  <AdminMenuManagement />
                </TabsContent>

                <TabsContent value="checkout" className="m-0">
                  <div className="bg-white min-h-full rounded-lg">
                    
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </AppProvider>
  )
}

