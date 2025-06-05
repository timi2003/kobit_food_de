"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Clock, MapPin, Search } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

interface Restaurant {
  _id: string
  name: string
  slug: string
  description: string
  cuisine: string[]
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  images: {
    logo: string
    cover: string
  }
  location: {
    address: string
    city: string
  }
  features: {
    hasCustomMeals: boolean
    acceptsOnlinePayment: boolean
  }
}

interface RestaurantsListProps {
  featured?: boolean
  limit?: number
}

export function RestaurantsList({ featured = false, limit }: RestaurantsListProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("")

  useEffect(() => {
    fetchRestaurants()
  }, [featured, limit, searchTerm, selectedCuisine])

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const params: any = {}

      if (featured) params.featured = "true"
      if (limit) params.limit = limit.toString()
      if (searchTerm) params.search = searchTerm
      if (selectedCuisine) params.cuisine = selectedCuisine

      const response = await apiClient.getRestaurants(params)
      setRestaurants(response.restaurants)
    } catch (error) {
      console.error("Failed to fetch restaurants:", error)
    } finally {
      setLoading(false)
    }
  }

  const cuisineTypes = ["Nigerian", "Continental", "Chinese", "Indian", "Italian", "Fast Food"]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded mb-4" />
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-16" />
                <div className="h-3 bg-gray-200 rounded w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Cuisines</option>
          {cuisineTypes.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={restaurant.images.cover || "/placeholder.svg?height=200&width=400"}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              {restaurant.features.hasCustomMeals && (
                <Badge className="absolute top-2 left-2 bg-orange-500">Featured</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={restaurant.images.logo || "/placeholder.svg?height=40&width=40"}
                    alt={`${restaurant.name} logo`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{restaurant.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">({restaurant.reviewCount})</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{restaurant.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {restaurant.cuisine.slice(0, 2).map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="text-xs">
                    {cuisine}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>₦{restaurant.deliveryFee} delivery</span>
                </div>
              </div>

              <Link href={`/restaurants/${restaurant.slug}`}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">View Menu</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {restaurants.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No restaurants found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
