"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShoppingBag,
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  Loader2,
  Home,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { apiClient } from "@/lib/api-client"
import { toast } from "@/hooks/use-toast"
import { DevelopmentNotice } from "@/components/development-notice"

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: string
}

interface Address {
  _id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

interface Order {
  _id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  restaurant: {
    name: string
  }
}

export function AccountPage() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  })

  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  })

  const [addresses, setAddresses] = useState<Address[]>([])
  const [recentOrders, setRecentOrders] = useState<Order[]>([])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/account")
    }
  }, [isAuthenticated, authLoading, router])

  // Load user data when user is available
  useEffect(() => {
    if (user && isAuthenticated) {
      const userProfile = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "customer",
      }
      setProfile(userProfile)
      setEditedProfile(userProfile)
      loadAccountData()
    }
  }, [user, isAuthenticated])

  const loadAccountData = async () => {
    try {
      setIsLoading(true)

      // Load addresses and recent orders in parallel
      const [addressesResponse, ordersResponse] = await Promise.allSettled([
        apiClient.getAddresses(),
        apiClient.getOrders({ limit: 5 }),
      ])

      if (addressesResponse.status === "fulfilled" && addressesResponse.value.success) {
        setAddresses(addressesResponse.value.data.addresses || [])
      }

      if (ordersResponse.status === "fulfilled" && ordersResponse.value.success) {
        setRecentOrders(ordersResponse.value.data.orders || [])
      }
    } catch (error) {
      console.error("Failed to load account data:", error)
      toast({
        title: "Error",
        description: "Failed to load account data. Please refresh the page.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true)

      const response = await apiClient.updateProfile({
        firstName: editedProfile.firstName,
        lastName: editedProfile.lastName,
        phoneNumber: editedProfile.phoneNumber,
      })

      if (response.success) {
        setProfile(editedProfile)
        setIsEditing(false)
        toast({
          title: "Profile updated",
          description: "Your profile don update well well!",
        })
      } else {
        throw new Error(response.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Profile update failed:", error)
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "E no gree update. Abeg try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You don comot. Come back soon!",
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "delivered":
        return "bg-green-100 text-green-800"
      case "preparing":
      case "in_transit":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "Confirmed"
      case "delivered":
        return "Delivered"
      case "preparing":
        return "Dey Prepare"
      case "in_transit":
        return "Dey Road"
      case "pending":
        return "Dey Wait"
      case "cancelled":
        return "Cancelled"
      default:
        return status.replace("_", " ")
    }
  }

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Abeg wait small...</p>
          </div>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#f5f5f5]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-[#008751] text-white p-4 rounded-lg">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="opacity-90">See your profile and orders</p>
          </div>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="bg-[#FF9A00] hover:bg-[#FF7A00] text-white border-none"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Comot
          </Button>
        </div>
        <DevelopmentNotice />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="border-2 border-[#008751] shadow-md">
              <CardHeader className="bg-[#008751]/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-[#008751]">
                    <User className="h-5 w-5 mr-2" />
                    Your Profile
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="border-[#008751] text-[#008751]"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-[#008751] hover:bg-[#006741]"
                      >
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-16 w-16 bg-[#008751] text-white">
                    <AvatarFallback className="text-lg">
                      {getInitials(profile.firstName, profile.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <Badge variant="outline" className="mt-1 border-[#008751] text-[#008751]">
                      {profile.role === "customer" ? "Customer" : profile.role}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={editedProfile.firstName}
                        onChange={(e) => setEditedProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="border-[#008751]/30 focus-visible:ring-[#008751]"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-medium border-b pb-1 border-[#008751]/20">{profile.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={editedProfile.lastName}
                        onChange={(e) => setEditedProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="border-[#008751]/30 focus-visible:ring-[#008751]"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-medium border-b pb-1 border-[#008751]/20">{profile.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2 text-[#008751]" />
                    <p className="text-sm font-medium">{profile.email}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phoneNumber"
                      value={editedProfile.phoneNumber}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="Enter your phone number"
                      className="border-[#008751]/30 focus-visible:ring-[#008751]"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-[#008751]" />
                      <p className="text-sm font-medium">{profile.phoneNumber || "No phone number added"}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Addresses */}
            <Card className="border-2 border-[#FF9A00] shadow-md">
              <CardHeader className="bg-[#FF9A00]/10">
                <CardTitle className="flex items-center text-[#FF9A00]">
                  <MapPin className="h-5 w-5 mr-2" />
                  Your Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-[#FF9A00]" />
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div key={address._id} className="p-3 border-2 border-[#FF9A00]/20 rounded-lg bg-white">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{address.name}</p>
                            <p className="text-sm">
                              {address.street}, {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                          {address.isDefault && <Badge className="text-xs bg-[#FF9A00] text-white">Main Address</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-[#FF9A00]/30 rounded-lg">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-[#FF9A00]/50" />
                    <p className="text-[#FF9A00]">You never add any address</p>
                    <Button className="mt-4 bg-[#FF9A00] hover:bg-[#FF7A00]">Add New Address</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card className="border-2 border-[#008751] shadow-md">
              <CardHeader className="bg-[#008751]/10">
                <CardTitle className="text-[#008751]">Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-center justify-between p-2 bg-[#008751]/5 rounded-md">
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2 text-[#008751]" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <span className="font-semibold text-[#008751]">{recentOrders.length}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#008751]/5 rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-[#008751]" />
                    <span className="text-sm">Payment Methods</span>
                  </div>
                  <span className="font-semibold text-[#008751]">1</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#008751]/5 rounded-md">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#008751]" />
                    <span className="text-sm">Saved Addresses</span>
                  </div>
                  <span className="font-semibold text-[#008751]">{addresses.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="border-2 border-[#FF9A00] shadow-md">
              <CardHeader className="bg-[#FF9A00]/10">
                <CardTitle className="text-[#FF9A00]">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-[#FF9A00]" />
                  </div>
                ) : recentOrders.length > 0 ? (
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div key={order._id} className="p-3 border-2 border-[#FF9A00]/20 rounded-lg bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">#{order.orderNumber}</p>
                            <p className="text-xs text-[#FF9A00]">{order.restaurant?.name || "Restaurant"}</p>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">₦{order.total?.toLocaleString() || "0"}</span>
                          <span className="text-xs text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-[#FF9A00]/30 rounded-lg">
                    <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-[#FF9A00]/50" />
                    <p className="text-[#FF9A00]">You never order anything</p>
                    <Button className="mt-4 bg-[#FF9A00] hover:bg-[#FF7A00]">Find Food</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 border-[#008751] shadow-md">
              <CardHeader className="bg-[#008751]/10">
                <CardTitle className="text-[#008751]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#008751] text-[#008751] hover:bg-[#008751]/10"
                  size="sm"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Back Home
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#008751] text-[#008751] hover:bg-[#008751]/10"
                  size="sm"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  See All Orders
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#008751] text-[#008751] hover:bg-[#008751]/10"
                  size="sm"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
                <Button className="w-full justify-start mt-4 bg-[#008751] hover:bg-[#006741]" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
