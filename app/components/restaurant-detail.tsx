"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin, Phone, Globe, Filter, Heart } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Input } from "@/app/components/ui/input"
import { AddToCartButton } from "@/app/components/add-to-cart-button"

interface RestaurantDetailProps {
  slug: string
}

export function RestaurantDetail({ slug }: RestaurantDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  // In a real app, you would fetch this data based on the slug
  const restaurant = {
    name: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    rating: 4.8,
    reviewCount: 243,
    deliveryTime: "20-35 min",
    deliveryFee: "$2.99",
    minOrder: "$10.00",
    address: "123 Main Street, New York, NY 10001",
    phone: "(555) 123-4567",
    website: "https://example.com",
    description:
      "Serving delicious food made with fresh ingredients. Our menu offers a variety of options to satisfy any craving.",
    image: "/placeholder.svg?height=400&width=800",
    categories: ["Pizza", "Burgers", "Salads", "Desserts", "Drinks"],
  }

  // Sample menu items for this restaurant
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic tomato sauce, mozzarella, and basil",
      price: 12.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      restaurant: restaurant.name,
      tags: ["Bestseller", "Vegetarian"],
      category: "Pizza",
    },
    {
      id: 2,
      name: "Double Cheeseburger",
      description: "Two beef patties with cheese, lettuce, and special sauce",
      price: 9.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      restaurant: restaurant.name,
      tags: ["Bestseller"],
      category: "Burgers",
    },
    {
      id: 3,
      name: "Chicken Caesar Salad",
      description: "Fresh romaine lettuce, grilled chicken, parmesan, and croutons",
      price: 8.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      restaurant: restaurant.name,
      tags: ["Healthy"],
      category: "Salads",
    },
    {
      id: 4,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center",
      price: 6.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      restaurant: restaurant.name,
      tags: ["Dessert"],
      category: "Desserts",
    },
    {
      id: 5,
      name: "Veggie Supreme Pizza",
      description: "Bell peppers, mushrooms, onions, olives, and cheese",
      price: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      restaurant: restaurant.name,
      tags: ["Vegetarian"],
      category: "Pizza",
    },
    {
      id: 6,
      name: "Fresh Fruit Smoothie",
      description: "Blend of seasonal fruits with yogurt",
      price: 5.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      restaurant: restaurant.name,
      tags: ["Healthy", "Refreshing"],
      category: "Drinks",
    },
  ]

  return (
    <div>
      <div className="relative h-64 md:h-80">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>
                  {restaurant.rating} ({restaurant.reviewCount} reviews)
                </span>
              </div>
              <span className="text-white/60">•</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <span className="text-white/60">•</span>
              <div>Delivery: {restaurant.deliveryFee}</div>
              <span className="text-white/60">•</span>
              <div>Min: {restaurant.minOrder}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={isFavorite ? "text-red-500" : ""}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Input placeholder="Search menu items..." className="pl-8" />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="w-full justify-start overflow-auto">
                <TabsTrigger value="all" className="px-4">
                  All
                </TabsTrigger>
                {restaurant.categories.map((category) => (
                  <TabsTrigger key={category} value={category.toLowerCase()} className="px-4">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="flex">
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            <span className="font-bold">${item.price}</span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>
                          {item.tags.length > 0 && (
                            <div className="mb-3">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="mr-1">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <AddToCartButton item={item} size="sm" />
                        </div>
                        <div className="relative h-auto w-24 md:w-32">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {restaurant.categories.map((category) => (
                <TabsContent key={category} value={category.toLowerCase()} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menuItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="flex">
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold">{item.name}</h3>
                                <span className="font-bold">${item.price}</span>
                              </div>
                              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>
                              {item.tags.length > 0 && (
                                <div className="mb-3">
                                  {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="mr-1">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <AddToCartButton item={item} size="sm" />
                            </div>
                            <div className="relative h-auto w-24 md:w-32">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Restaurant Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Website</h4>
                      <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {restaurant.website.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Delivery Time</h4>
                      <p className="text-sm text-muted-foreground">{restaurant.deliveryTime}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                </div>

                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <Link href={`/menu?restaurant=${slug}`}>View Full Menu</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
