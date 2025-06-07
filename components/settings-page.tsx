"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  User,
  Bell,
  MapPin,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Smartphone,
  Languages,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("account")

  const settingsSections = [
    {
      id: "account",
      label: "Account",
      icon: <User className="h-5 w-5" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      id: "payment",
      label: "Payment Methods",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />,
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: <Shield className="h-5 w-5" />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>john.doe@example.com</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeTab === section.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(section.id)}
                  >
                    {section.icon}
                    <span className="ml-2">{section.label}</span>
                  </Button>
                ))}
                <Separator className="my-2" />
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="h-5 w-5" />
                  <span className="ml-2">Help & Support</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
                  <Link href="/logout">
                    <LogOut className="h-5 w-5" />
                    <span className="ml-2">Logout</span>
                  </Link>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">
          <Card>
            <CardHeader>
              <CardTitle>{settingsSections.find((s) => s.id === activeTab)?.label}</CardTitle>
              <CardDescription>Manage your {activeTab} settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us a little about yourself"
                      className="min-h-[100px]"
                      defaultValue="Food enthusiast and regular KOBIT customer."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Order Updates</h3>
                        <p className="text-sm text-muted-foreground">Receive notifications about your orders</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Special Offers</h3>
                        <p className="text-sm text-muted-foreground">Get notified about promotions and deals</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Delivery Updates</h3>
                        <p className="text-sm text-muted-foreground">Track your food in real-time</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing Emails</h3>
                        <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Channels</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <span>Push Notifications</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>Email</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span>SMS</span>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Saved Addresses</h3>
                      <Button variant="outline" size="sm">
                        Add New Address
                      </Button>
                    </div>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Home</h4>
                              <Badge>Default</Badge>
                            </div>
                            <p className="text-sm">123 Main Street, Apt 4B</p>
                            <p className="text-sm">New York, NY 10001</p>
                            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="font-medium">Work</h4>
                            <p className="text-sm">456 Business Ave, Floor 12</p>
                            <p className="text-sm">New York, NY 10002</p>
                            <p className="text-sm text-muted-foreground">+1 (555) 987-6543</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Payment Methods</h3>
                      <Button variant="outline" size="sm">
                        Add Payment Method
                      </Button>
                    </div>
                    {/* <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Visa ending in 4242</h4>
                              <p className="text-sm text-muted-foreground">Expires 12/25</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge>Default</Badge>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card> */}
                    {/* <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Mastercard ending in 5678</h4>
                              <p className="text-sm text-muted-foreground">Expires 10/24</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Set as Default
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card> */}
                    {/* <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <img src="/placeholder.svg?height=20&width=20" alt="Paystack" className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Paystack</h4>
                              <p className="text-sm text-muted-foreground">Card ending in 7890</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Set as Default
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card> */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <img src="/placeholder.svg?height=20&width=20" alt="Flutterwave" className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Bank Transfer</h4>
                              <p className="text-sm text-muted-foreground">Card ending in 3456</p>
                            </div>
                          </div>
                          {/* <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Set as Default
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div> */}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Dark Mode</h3>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                      </div>
                      <Switch
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">Theme</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="h-4 w-4 mr-2" />
                          Light
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="h-4 w-4 mr-2" />
                          Dark
                        </Button>
                        <Button
                          variant={theme === "system" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setTheme("system")}
                        >
                          <Laptop className="h-4 w-4 mr-2" />
                          System
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">Language</h3>
                      <div className="flex items-center gap-4">
                        <Languages className="h-5 w-5 text-muted-foreground" />
                        <Select defaultValue="en">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground">Change your password</p>
                      </div>
                      <Button variant="outline">Update</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Data Privacy</h3>
                        <p className="text-sm text-muted-foreground">Manage how your data is used</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Delete Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data associated with it
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Add missing imports
import { Mail, MessageSquare, Pencil, Trash2, Laptop, Badge } from "lucide-react"
