"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Copy, Clock, Tag, Percent, Gift, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast({
      title: "Promo code copied!",
      description: `${code} has been copied to your clipboard.`,
    })
    setTimeout(() => setCopiedCode(null), 3000)
  }

  // const featuredOffers = [
  //   {
  //     id: 1,
  //     title: "20% Off Your First Order",
  //     description: "New users get 30% off their first order up to N1000",
  //     code: "WELCOME50",
  //     expiryDate: "May 31, 2025",
  //     image: "/placeholder.svg?height=200&width=400",
  //     backgroundColor: "bg-gradient-to-r from-orange-500 to-red-500",
  //   },
  //   {
  //     id: 2,
  //     title: "Free Delivery Weekend",
  //     description: "Enjoy free delivery on first two orders this weekend",
  //     code: "FREEWEEKEND",
  //     expiryDate: "May 19, 2025",
  //     image: "/placeholder.svg?height=200&width=400",
  //     backgroundColor: "bg-gradient-to-r from-blue-500 to-purple-500",
  //   },
  // ]

  const promoOffers = [
    {
      id: 3,
      title: "Order and get 20% discount",
      description: "Buy any main dish and get 20% discount on products",
      // code: "BOGOFREE",
      // expiryDate: "June 15, 2025",
      restaurants: [""],
      discount: "20%",
      minOrder: "N10000",
    },
    {
      id: 4,
      title: "10% Off Stir Fry",
      description: "Get 10% off Stir purchase",
      // code: "SWEET30",
      // expiryDate: "May 25, 2025",
      restaurants: [""],
      discount: "15%",
      minOrder: "N5000",
    },
    // {
    //   id: 5,
    //   title: "N500 Off Orders Over N3000",
    //   description: "Save N500 on your next order over N3000",
    //   code: "SAVE5",
    //   expiryDate: "June 30, 2025",
    //   restaurants: ["All Restaurants"],
    //   discount: "N500",
    //   minOrder: "N3000",
    // },
    {
      id: 6,
      title: "10% Off for Students",
      description: "Students get 10% off all orders with valid ID",
      code: "STUDENT15",
      restaurants: ["All Restaurants"],
      discount: "10%",
      minOrder: "None",
    },
  ]

  const restaurantDeals = [
    {
      id: 7,
      restaurant: "Dele Foods",
      title: "Cliques Meal Deal",
      description: "Fried rice, Stir fry, Turkey for N20000",
      image: "/placeholder.svg?height=150&width=300",
      // expiryDate: "June 30, 2025",
    },
    // {
    //   id: 8,
    //   restaurant: "Burger Joint",
    //   title: "Burger Combo Special",
    //   description: "Any burger, fries, and drink for N4500",
    //   image: "/bugcomb.jpeg?height=150&width=300",
    //   expiryDate: "May 31, 2025",
    // },
    {
      id: 9,
      restaurant: "Iya-blessing Buka",
      title: "Stockup Food for weekend",
      description: "Buffet for as low as N30000",
      image: "/buffet.jpeg?height=150&width=300",
      // expiryDate: "June 15, 2025",
    },
    {
      id: 10,
      restaurant: "Iya-Blessing Buka",
      title: "Family Meal",
      description: "Get 15% discount",
      image: "/family-meal.jpeg?height=150&width=300",
      expiryDate: "Ongoing",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Special Offers & Deals</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover exclusive promotions, discounts, and special deals from your favorite restaurants.
        </p>
      </div>

      <div className="space-y-12">
        {/* Featured Offers */}
        {/* <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden border-0 shadow-lg">
                <div className={`${offer.backgroundColor} text-white p-6`}>
                  <CardTitle className="text-2xl mb-2">{offer.title}</CardTitle>
                  <CardDescription className="text-white/90">{offer.description}</CardDescription>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Promo Code:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{offer.code}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(offer.code)}
                        className="h-8 w-8"
                      >
                        {copiedCode === offer.code ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Expires: {offer.expiryDate}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-6 pb-6">
                  <Button className="w-full" asChild>
                    <Link href="/menu">Order Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section> */}

        {/* Promo Codes */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Promo Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promoOffers.map((promo) => (
              <Card key={promo.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{promo.title}</CardTitle>
                      <CardDescription>{promo.description}</CardDescription>
                    </div>
                    <Badge className="bg-primary">{promo.discount} Off</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Code:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{promo.code}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => copyToClipboard(promo.code)}
                          className="h-8 w-8"
                        >
                          {copiedCode === promo.code ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {/* <span>Expires: {promo.expiryDate}</span> */}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span>Min. Order: {promo.minOrder}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Valid at: </span>
                      <span>{promo.restaurants.join(", ")}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/menu">
                      Use Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Restaurant Deals */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Restaurant Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurantDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden">
                <div className="relative h-40">
                  <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">{deal.restaurant}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{deal.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Expires: {deal.expiryDate}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full" size="sm" asChild>
                    <Link href={`/restaurants/${deal.restaurant.toLowerCase().replace(/\s+/g, "-")}`}>
                      View Restaurant
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-muted rounded-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Gift className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Never Miss a Deal</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to receive exclusive offers and promotions directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" className="sm:flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
