"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface AddToCartButtonProps {
  item: {
    id: number
    name: string
    price: number
    image: string
    restaurant: string
  }
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function AddToCartButton({
  item,
  variant = "default",
  size = "default",
  className = "w-full",
}: AddToCartButtonProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(item)
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleAddToCart}>
      Add to Cart
      <Plus className="ml-2 h-4 w-4" />
    </Button>
  )
}


/*what this code does is that it Accepts a product item with properties like id, name, price, etc.

Accepts optional props for styling the button (variant, size, className).

Uses a cart context hook (useCart) to access the addItem function.

Renders a button labeled “Add to Cart” with a Plus icon.

When clicked, it adds the item to the cart.
*/
