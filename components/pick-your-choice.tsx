"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronDown, ChevronUp, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

type FoodItem = {
  id: string
  name: string
  price: number
  image: string
  description?: string
}

type FoodCategory = {
  id: string
  name: string
  items: FoodItem[]
  allowMultiple?: boolean
  maxSelections?: number
}

export function PickYourChoice({ isHomepage = false }: { isHomepage?: boolean }) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({
    rice: [],
    beans: [],
    drinks: [],
    moiMoi: [],
    Swallow: [], // Added missing Swallow category
    soup: [],
  })
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [openCategories, setOpenCategories] = useState<string[]>(["rice"])
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const toggleItem = (categoryId: string, itemId: string) => {
    setSelectedItems((prev) => {
      // Create a copy of the current selections for this category
      const currentSelections = [...(prev[categoryId] || [])]

      // Find the category
      const category = categories.find((c) => c.id === categoryId)

      // If category allows multiple selections
      if (category?.allowMultiple) {
        // If item is already selected, remove it
        if (currentSelections.includes(itemId)) {
          return {
            ...prev,
            [categoryId]: currentSelections.filter((id) => id !== itemId),
          }
        }
        // If item is not selected, add it (if under max selections)
        else {
          const maxSelections = category.maxSelections || Number.POSITIVE_INFINITY
          if (currentSelections.length >= maxSelections) {
            return prev
          }
          return {
            ...prev,
            [categoryId]: [...currentSelections, itemId],
          }
        }
      }
      // For categories that only allow one selection
      else {
        // If item is already selected, deselect it
        if (currentSelections.includes(itemId)) {
          return {
            ...prev,
            [categoryId]: [],
          }
        }
        // If item is not selected, select it (replacing any current selection)
        else {
          return {
            ...prev,
            [categoryId]: [itemId],
          }
        }
      }
    })
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 1
      const newQuantity = Math.max(1, current + delta)
      return {
        ...prev,
        [itemId]: newQuantity,
      }
    })
  }

  const getItemQuantity = (itemId: string) => {
    return quantities[itemId] || 1
  }

  const isItemSelected = (categoryId: string, itemId: string) => {
    return (selectedItems[categoryId] || []).includes(itemId)
  }

  const categories: FoodCategory[] = [
    {
      id: "rice",
      name: "Rice Dishes",
      allowMultiple: true,
      maxSelections: 4,
      items: [
        {
          id: "jollof-rice",
          name: "Jollof Rice",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "Spicy Nigerian jollof rice cooked with tomatoes and peppers 1 scoop: add as many scoop",
        },
        {
          id: "fried-rice",
          name: "Fried Rice",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "Nigerian style fried rice with vegetables and proteins 1 scoop: add as many scoop",
        },
        {
          id: "white-rice",
          name: "White Rice",
          price: 250,
          image: "/placeholder.svg?height=100&width=100",
          description: "Plain white rice, perfect with stews and sauces 1 scoop: add as many scoop",
        },
        {
          id: "plantain",
          name: "Plantain",
          price: 100,
          image: "/placeholder.svg?height=100&width=100",
          description: "Fried sweet plantains 2pieces",
        },
        {
          id: "turkey",
          name: "Turkey",
          price: 2000,
          image: "/placeholder.svg?height=100&width=100",
          description: "Grilled or fried turkey",
        },
        {
          id: "beef",
          name: "Beef",
          price: 600,
          image: "/placeholder.svg?height=100&width=100",
          description: "Seasoned beef in sauce",
        },
        {
          id: "egg",
          name: "Egg",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "Fried egg",
        },
        {
          id: "spaghetti",
          name: "Spaghetti",
          price: 3000,
          image: "/placeholder.svg?height=100&width=100",
          description: "Nigerian style spaghetti with vegetables and spices with protein like egg",
        },
        {
          id: "beans-rice",
          name: "Beans",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "Nigerian beans porridge 1 scoop: add as many scoop",
        },
      ],
    },
    {
      id: "beans",
      name: "Beans Dishes",
      allowMultiple: true,
      maxSelections: 3,
      items: [
        {
          id: "beans-porridge",
          name: "Beans Porridge",
          price: 500,
          image: "/placeholder.svg?height=100&width=100",
          description: "Traditional Nigerian beans porridge 1 scoop: add as many scoop",
        },
        {
          id: "bread",
          name: "Bread",
          price: 500,
          image: "/placeholder.svg?height=100&width=100",
          description: "Fresh bread loaf",
        },
        {
          id: "beans-plantain",
          name: "Plantain",
          price: 100,
          image: "/placeholder.svg?height=100&width=100",
          description: "Fried sweet plantains",
        },
        {
          id: "beans-egg",
          name: "Egg",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "Fried egg",
        },
        {
          id: "garri",
          name: "Garri",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "Traditional Nigerian garri",
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      allowMultiple: true,
      maxSelections: 3,
      items: [
        {
          id: "pepsi",
          name: "Pepsi",
          price: 600,
          image: "/placeholder.svg?height=100&width=100",
          description: "Chilled Pepsi",
        },
        {
          id: "coke",
          name: "Coca-Cola",
          price: 600,
          image: "/placeholder.svg?height=100&width=100",
          description: "Chilled Coca-Cola",
        },
        {
          id: "hollandia",
          name: "Hollandia Yoghurt",
          price: 1500,
          image: "/placeholder.svg?height=100&width=100",
          description: "Hollandia yoghurt drink",
        },
        {
          id: "smoothie",
          name: "Fruit Smoothie",
          price: 1200,
          image: "/placeholder.svg?height=100&width=100",
          description: "Fresh fruit smoothie",
        },
        {
          id: "energy-drink",
          name: "Energy Drink",
          price: 700,
          image: "/placeholder.svg?height=100&width=100",
          description: "Energy drink for a boost",
        },
      ],
    },
    {
      id: "moiMoi",
      name: "Moi Moi & Sides",
      allowMultiple: true,
      maxSelections: 3,
      items: [
        {
          id: "moi-moi",
          name: "Moi Moi",
          price: 400,
          image: "/placeholder.svg?height=100&width=100",
          description: "Steamed bean pudding",
        },
        {
          id: "eko",
          name: "Eko (Agidi)",
          price: 100,
          image: "/placeholder.svg?height=100&width=100",
          description: "Traditional corn pudding 1 piece: add as many scoop",
        },
        {
          id: "moimoi-garri",
          name: "Garri",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "Traditional Nigerian garri",
        },
        {
          id: "moimoi-bread",
          name: "Bread",
          price: 400,
          image: "/placeholder.svg?height=100&width=100",
          description: "Fresh bread loaf",
        },
      ],
    },
    {
      id: "Swallow",
      name: "Swallow Dishes",
      allowMultiple: true,
      maxSelections: 2,
      items: [
        {
          id: "amala",
          name: "Amala",
          price: 400,
          image: "/placeholder.svg?height=100&width=100",
          description: "Wraps of amala",
        },
        {
          id: "eba",
          name: "Eba",
          price: 100,
          image: "/placeholder.svg?height=100&width=100",
          description: "Wraps of eba",
        },
        {
          id: "semo",
          name: "Semo",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "Wraps of semo",
        },
      ],
    },
     {
      id: "Soup",
      name: "Soup for swallow",
      allowMultiple: true,
      maxSelections: 2,
      items: [
        {
          id: "Efo",
          name: "Vegetable soup",
          price: 400,
          image: "/placeholder.svg?height=100&width=100",
          description: "Vegeatble soup",
        },
        {
          id: "Egusi",
          name: "Egusi",
          price: 100,
          image: "/placeholder.svg?height=100&width=100",
          description: "egusi soup",
        },
        {
          id: "Ewedu",
          name: "Ewedu",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "ewedu soup",
        },
        {
          id: "Okro",
          name: "Okro",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "okro soup",
        },
      ],
    },
    {
      id: "side dish",
      name: "Side dish",
      allowMultiple: true,
      maxSelections: 4,
      items: [
        {
          id: "turkey",
          name: "Turkey",
          price: 400,
          image: "/placeholder.svg?height=100&width=100",
          description: "Turkey",
        },
        {
          id: "fish",
          name: "Fish",
          price: 100,
          image: "/placeholder.svg?height=100&width=100",
          description: "Spicy fish",
        },
        {
          id: "Ponmo",
          name: "Ponmo",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "ponmo",
        },
        {
          id: "Inu eran",
          name: "Inu eran",
          price: 300,
          image: "/placeholder.svg?height=100&width=100",
          description: "inu eran like roundabount, shaki etc",
        },
      ],
    },
  ]

  const calculateTotal = () => {
    let total = 0

    Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
      itemIds.forEach((itemId) => {
        const category = categories.find((c) => c.id === categoryId)
        const item = category?.items.find((i) => i.id === itemId)
        if (item) {
          total += item.price * getItemQuantity(itemId)
        }
      })
    })

    return total
  }

  const getSelectedItemsCount = () => {
    return Object.values(selectedItems).reduce((acc, items) => acc + items.length, 0)
  }

  // Function to handle adding all selected items to the cart
  const handleAddToCart = () => {
    const selectedCount = getSelectedItemsCount()

    if (selectedCount === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to add to your cart.",
        variant: "destructive",
      })
      return
    }

    setIsAddingToCart(true)

    // Add each selected item to cart individually
    Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
      itemIds.forEach((itemId) => {
        const category = categories.find((c) => c.id === categoryId)
        const item = category?.items.find((i) => i.id === itemId)
        if (item) {
          const quantity = getItemQuantity(itemId)

          // Add item to cart with proper quantity handling
          for (let i = 0; i < quantity; i++) {
            addItem({
              id: item.id, // Keep as string to maintain consistency
              name: item.name,
              price: item.price,
              image: item.image,
              restaurant: "KOBIT Custom Meals",
            })
          }
        }
      })
    })

    // Show success toast
    toast({
      title: "Added to cart!",
      description: `${selectedCount} item${selectedCount > 1 ? "s" : ""} added to your cart.`,
    })

    // Reset selections
    setSelectedItems({
      rice: [],
      beans: [],
      drinks: [],
      moiMoi: [],
      Swallow: [],
    })
    setQuantities({})

    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  // For homepage, show a more compact version
  if (isHomepage) {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Pick Your Choice</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Customize your meal with our selection of Nigerian favorites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={`/placeholder.svg?height=300&width=400&text=${category.name}`}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-xl">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.items.length} items available</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2 mb-4">
                  {category.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="font-medium">₦{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  {category.items.length > 3 && (
                    <div className="text-sm text-muted-foreground">+ {category.items.length - 3} more items</div>
                  )}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/pick-your-choice">
                    <span>Customize</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/pick-your-choice">Customize Your Meal</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Full version for the dedicated page
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Pick Your Choice</h2>
        <p className="text-muted-foreground">Customize your meal with our selection of Nigerian favorites</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg overflow-hidden">
              {/* Header - Always visible */}
              <div
                className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  {category.allowMultiple && (
                    <p className="text-sm text-muted-foreground">Select up to {category.maxSelections} items</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{(selectedItems[category.id] || []).length} selected</Badge>
                  {openCategories.includes(category.id) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>

              {/* Content - Visible when expanded */}
              {openCategories.includes(category.id) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {category.items.map((item) => {
                    const isSelected = isItemSelected(category.id, item.id)
                    return (
                      <Card
                        key={item.id}
                        className={cn(
                          "overflow-hidden transition-all cursor-pointer hover:shadow-md",
                          isSelected ? "ring-2 ring-primary" : "",
                        )}
                        onClick={() => toggleItem(category.id, item.id)}
                      >
                        <div className="relative h-32">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <span className="font-semibold">₦{item.price.toLocaleString()}</span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                          )}
                          {isSelected && (
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateQuantity(item.id, -1)
                                  }}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">{getItemQuantity(item.id)}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateQuantity(item.id, 1)
                                  }}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <span className="text-sm font-medium">
                                ₦{(item.price * getItemQuantity(item.id)).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Your Selection</h3>

            {getSelectedItemsCount() === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No items selected yet</p>
                <p className="text-sm mt-2">Select items from the categories on the left</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {categories.map((category) => {
                    const selectedIds = selectedItems[category.id] || []
                    if (selectedIds.length === 0) return null

                    return (
                      <div key={category.id}>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">{category.name}</h4>
                        <div className="space-y-2">
                          {selectedIds.map((itemId) => {
                            const item = category.items.find((i) => i.id === itemId)
                            if (!item) return null

                            const quantity = getItemQuantity(itemId)
                            const itemTotal = item.price * quantity

                            return (
                              <div key={itemId} className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium">{item.name}</span>
                                  {quantity > 1 && (
                                    <span className="text-sm text-muted-foreground ml-1">x{quantity}</span>
                                  )}
                                </div>
                                <span>₦{itemTotal.toLocaleString()}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold text-lg mb-6">
                    <span>Total</span>
                    <span>₦{calculateTotal().toLocaleString()}</span>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || getSelectedItemsCount() === 0}
                  >
                    {isAddingToCart ? (
                      "Adding to Cart..."
                    ) : (
                      <>
                        Add to Cart
                        <ShoppingCart className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
