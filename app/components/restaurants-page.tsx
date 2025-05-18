"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Clock, Filter, Search, MapPin } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

export function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample restaurant data - in a real app, this would come from an API
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      slug: "pizza-palace",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.8,
      reviewCount: 243,
      cuisineType: "Italian",
      deliveryTime: "20-35 min",
      deliveryFee: "$2.99",
      minOrder: "$10.00",
      featured: true,
      tags: ["Popular", "Free Delivery"],
      address: "123 Main Street, New York, NY 10001",
    },
    {
      id: 2,
      name: "Burger Joint",
      slug: "burger-joint",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.7,
      reviewCount: 187,
      cuisineType: "American",
      deliveryTime: "15-25 min",
      deliveryFee: "$1.99",
      minOrder: "$8.00",
      featured: true,
      tags: ["Bestseller"],
      address: "456 Burger Ave, New York, NY 10002",
    },
    {
      id: 3,
      name: "Green Eats",
      slug: "green-eats",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.5,
      reviewCount: 156,
      cuisineType: "Healthy",
      deliveryTime: "20-30 min",
      deliveryFee: "$2.50",
      minOrder: "$12.00",
      featured: false,
      tags: ["Healthy", "Vegan Options"],
      address: "789 Veggie St, New York, NY 10003",
    },
    {
      id: 4,
      name: "Sushi Express",
      slug: "sushi-express",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.9,
      reviewCount: 312,
      cuisineType: "Japanese",
      deliveryTime: "25-40 min",
      deliveryFee: "$3.99",
      minOrder: "$15.00",
      featured: true,
      tags: ["Premium"],
      address: "101 Sushi Lane, New York, NY 10004",
    },
    {
      id: 5,
      name: "Taco Town",
      slug: "taco-town",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.6,
      reviewCount: 178,
      cuisineType: "Mexican",
      deliveryTime: "15-30 min",
      deliveryFee: "$2.49",
      minOrder: "$10.00",
      featured: false,
      tags: ["Spicy"],
      address: "202 Taco Blvd, New York, NY 10005",
    },
    {
      id: 6,
      name: "Sweet Treats",
      slug: "sweet-treats",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.7,
      reviewCount: 203,
      cuisineType: "Desserts",
      deliveryTime: "20-35 min",
      deliveryFee: "$3.49",
      minOrder: "$8.00",
      featured: false,
      tags: ["Desserts"],
      address: "303 Sweet St, New York, NY 10006",
    },
    {
      id: 7,
      name: "Noodle House",
      slug: "noodle-house",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.6,
      reviewCount: 167,
      cuisineType: "Asian",
      deliveryTime: "20-30 min",
      deliveryFee: "$2.99",
      minOrder: "$12.00",
      featured: false,
      tags: ["Asian Fusion"],
      address: "404 Noodle Ave, New York, NY 10007",
    },
    {
      id: 8,
      name: "Curry Corner",
      slug: "curry-corner",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.8,
      reviewCount: 221,
      cuisineType: "Indian",
      deliveryTime: "25-40 min",
      deliveryFee: "$3.49",
      minOrder: "$15.00",
      featured: false,
      tags: ["Spicy", "Vegetarian Options"],
      address: "505 Curry Lane, New York, NY 10008",
    },
    {
      id: 9,
      name: "Mediterranean Delights",
      slug: "mediterranean-delights",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.7,
      reviewCount: 198,
      cuisineType: "Mediterranean",
      deliveryTime: "20-35 min",
      deliveryFee: "$2.99",
      minOrder: "$12.00",
      featured: false,
      tags: ["Healthy", "Vegetarian Options"],
      address: "606 Med Blvd, New York, NY 10009",
    },
  ]

  const cuisineTypes = [
    "All",
    "Italian",
    "American",
    "Japanese",
    "Mexican",
    "Healthy",
    "Desserts",
    "Asian",
    "Indian",
    "Mediterranean",
  ]

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
          <p className="text-muted-foreground">Discover the best food from our partner restaurants</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-[250px]">
            <Input
              placeholder="Search restaurants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
              <SelectItem value="price-low">Delivery Fee: Low to High</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="w-full justify-start overflow-auto">
          {cuisineTypes.map((cuisine) => (
            <TabsTrigger key={cuisine} value={cuisine} className="px-4">
              {cuisine}
            </TabsTrigger>
          ))}
        </TabsList>
        {cuisineTypes.map((cuisine) => (
          <TabsContent key={cuisine} value={cuisine} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants
                .filter((restaurant) => cuisine === "All" || restaurant.cuisineType === cuisine)
                .map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden">
                    <Link href={`/restaurants/${restaurant.slug}`}>
                      <div className="relative h-48">
                        <Image
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                        {restaurant.tags.length > 0 && (
                          <div className="absolute top-2 left-2">
                            {restaurant.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="mr-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{restaurant.rating}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{restaurant.cuisineType}</p>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="truncate">{restaurant.address}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{restaurant.deliveryTime}</span>
                          </div>
                          <div>
                            <span>Delivery: {restaurant.deliveryFee}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
