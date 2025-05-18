import Link from "next/link"
import { Pizza, Coffee, Salad, Beef, IceCream, Sandwich } from "lucide-react"

export function FoodCategories() {
  const categories = [
    {
      name: "Pizza",
      icon: <Pizza className="h-8 w-8" />,
      href: "/menu/pizza",
    },
    {
      name: "Burgers",
      icon: <Beef className="h-8 w-8" />,
      href: "/menu/burgers",
    },
    {
      name: "Salads",
      icon: <Salad className="h-8 w-8" />,
      href: "/menu/salads",
    },
    {
      name: "Sandwiches",
      icon: <Sandwich className="h-8 w-8" />,
      href: "/menu/sandwiches",
    },
    {
      name: "Desserts",
      icon: <IceCream className="h-8 w-8" />,
      href: "/menu/desserts",
    },
    {
      name: "Drinks",
      icon: <Coffee className="h-8 w-8" />,
      href: "/menu/drinks",
    },
  ]

  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center p-6 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">{category.icon}</div>
            <span className="font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
