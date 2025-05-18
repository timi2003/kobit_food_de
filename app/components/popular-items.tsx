import Link from "next/link"
import Image from "next/image"
import { Star, Clock } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { AddToCartButton } from "@/app/components/add-to-cart-button"

export function PopularItems() {
  const popularItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic tomato sauce, mozzarella, and basil",
      price: 12.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      deliveryTime: "20-30 min",
      restaurant: "Pizza Palace",
      tags: ["Bestseller", "Vegetarian"],
    },
    {
      id: 2,
      name: "Double Cheeseburger",
      description: "Two beef patties with cheese, lettuce, and special sauce",
      price: 9.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      deliveryTime: "15-25 min",
      restaurant: "Burger Joint",
      tags: ["Bestseller"],
    },
    {
      id: 3,
      name: "Chicken Caesar Salad",
      description: "Fresh romaine lettuce, grilled chicken, parmesan, and croutons",
      price: 8.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      deliveryTime: "15-20 min",
      restaurant: "Green Eats",
      tags: ["Healthy"],
    },
    {
      id: 4,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center",
      price: 6.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      deliveryTime: "25-35 min",
      restaurant: "Sweet Treats",
      tags: ["Dessert"],
    },
  ]

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Popular Right Now</h2>
        <Button asChild variant="ghost">
          <Link href="/menu">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularItems.map((item) => (
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
                <span className="font-bold">${item.price}</span>
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
    </section>
  )
}
