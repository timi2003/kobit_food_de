"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddToCartButton } from "@/components/add-to-cart-button"

export function MenuPage() {
  const [priceRange, setPriceRange] = useState([0, 50])

  const categories = ["All", "Pizza", "Burgers","Swallow-Food", "Staple-Food", "Sandwiches", "Desserts", "Drinks"]

  const menuItems = [
    {
      id: 1,
      name: "Pounded Yam",
      description: "Pounded Yam, Egusi, Beef, Chicken",
      price: 3500,
      image: "/pounded_yam.png?height=300&width=300",
      rating: 4.8,
      deliveryTime: "20-30 min",
      restaurant: "Iya-Oge Buka",
      tags: ["Bestseller", "Vegetarian"],
      category: "Swallow-Food",
    },
    {
      id: 2,
      name: "Jollof Rice",
      description: "Spicy Jollof Rice, Beef Chicken, Salad",
      price: 3500,
      image: "/Jollof-rice.png?height=300&width=300",
      rating: 4.7,
      deliveryTime: "15-25 min",
      restaurant: "Winnyz",
      tags: ["Bestseller"],
      category: "Staple-Foods",
    },
    {
      id: 3,
      name: "Yamarita",
      description: "Boiled Yam and Fried Egg",
      price: 2500,
      image: "/Yamarita.jpg?height=300&width=300",
      rating: 4.5,
      deliveryTime: "15-20 min",
      restaurant: "Winnyz",
      tags: ["Healthy"],
      category: "Staple-Foods",
    },
    {
      id: 4,
      name: "Beans and Plantain",
      description: "Ewa agoyin and plantain",
      price: 2000,
      image: "/Beans_and_Plantain.jpg?height=300&width=300",
      rating: 4.9,
      deliveryTime: "25-35 min",
      restaurant: "Iya-Oge Buka",
      tags: ["Popular"],
      category: "Staple-Food",
    },
    {
      id: 5,
      name: "Fried Rice",
      description: "Fried rice,chicken and salad plantain",
      price: 3000,
      image: "/Fried-rice.jpg?height=300&width=300",
      rating: 4.6,
      deliveryTime: "20-35 min",
      restaurant: "Winnyz",
      tags: ["Bestseller"],
      category: "Staple-Food",
    },
    {
      id: 6,
      name: "Spicy Chicken Sandwich",
      description: "shreded chicken with spicy sauce",
      price: 700,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      deliveryTime: "15-25 min",
      restaurant: "Favourite Hub",
      tags: ["Spicy", "Bestseller"],
      category: "Sandwiches",
    },
    {
      id: 7,
      name: "Fresh Fruit Smoothie",
      description: "Blend of seasonal fruits with yogurt",
      price: 1000,
      image: "/smothie.png?height=300&width=300",
      rating: 4.8,
      deliveryTime: "10-20 min",
      restaurant: "Juice Bar",
      tags: ["Healthy", "Refreshing"],
      category: "Drinks",
    },
    {
      id: 8,
      name: "Burger",
      description: "chicken, ketchup, BBQ sauce",
      price: 2500,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      deliveryTime: "20-30 min",
      restaurant: "Burger Joint",
      tags: ["Bestseller"],
      category: "Burgers",
    },
    {
      id: 8,
      name: "Moi-Moi",
      description: "Moi, Egg, Fish",
      price: 2500,
      image: "/Moi-Moi.jpg?height=300&width=300",
      rating: 4.9,
      deliveryTime: "20-30 min",
      restaurant: "Iya-Oge",
      tags: ["Bestseller"],
      category: "Staple-Food",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu</h1>
          <p className="text-muted-foreground">Discover delicious food from our partners</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-[250px]">
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
          <Select defaultValue="recommended">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription>Narrow down your food choices</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Dietary Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegetarian" />
                      <Label htmlFor="vegetarian">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegan" />
                      <Label htmlFor="vegan">Vegan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gluten-free" />
                      <Label htmlFor="gluten-free">Gluten Free</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="text-sm text-muted-foreground">
                      N{priceRange[0]} - N{priceRange[1]}
                    </div>
                  </div>
                  <Slider defaultValue={[0, 50]} max={50} step={1} value={priceRange} onValueChange={setPriceRange} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Ratings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rating-4.5" />
                      <Label htmlFor="rating-4.5" className="flex items-center">
                        4.5+ <Star className="h-3 w-3 ml-1 text-yellow-500" />
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rating-4.0" />
                      <Label htmlFor="rating-4.0" className="flex items-center">
                        4.0+ <Star className="h-3 w-3 ml-1 text-yellow-500" />
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rating-3.5" />
                      <Label htmlFor="rating-3.5" className="flex items-center">
                        3.5+ <Star className="h-3 w-3 ml-1 text-yellow-500" />
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="w-full justify-start overflow-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="px-4">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuItems
                .filter((item) => category === "All" || item.category === category)
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      {item.tags.length > 0 && (
                        <div className="absolute top-2 left-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="mr-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <span className="font-bold">N{item.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="mr-3">{item.rating}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.deliveryTime}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.restaurant}</div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <AddToCartButton item={item} />
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
