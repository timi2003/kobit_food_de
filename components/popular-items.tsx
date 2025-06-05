import Link from "next/link"
import Image from "next/image"
import { Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"

export function PopularItems() {
  const popularItems = [
    {
      id: 1,
      name: "Pounded Yam",
      description: "Pounded Yam, Egusi, Beef, Chicken",
      price: 5000,
      image: "/pounded_yam.png?height=300&width=300",
      rating: 4.8,
      deliveryTime: "20-30 min",
      restaurant: "Iya-Oge Buka",
      tags: ["Bestseller", "Vegetarian"],
    },
    {
      id: 2,
      name: "Jollof Rice",
      description: "3 scoop Spicy Jollof Rice, Beef Chicken, Salad",
      price: 3500,
      image: "/Jollof-rice.png?height=300&width=300",
      rating: 4.7,
      deliveryTime: "15-25 min",
      restaurant: "Winnyz",
      tags: ["Bestseller"],
    },
    {
      id: 3,
      name: "Yamarita",
      description: "Boiled Yam and Fried Egg",
      price: 3000,
      image: "/Yamarita.jpg?height=300&width=300",
      rating: 4.5,
      deliveryTime: "15-20 min",
      restaurant: "Winnyz",
      tags: ["Healthy"],
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
    </section>
  )
}
