import { Search, UtensilsCrossed, Truck } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10" />,
      title: "Browse & Select",
      description: "Choose from thousands of restaurants and dishes",
    },
    {
      icon: <UtensilsCrossed className="h-10 w-10" />,
      title: "Order & Pay",
      description: "Securely place your order with just a few clicks",
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: "Track & Enjoy",
      description: "Follow your delivery in real-time and enjoy your meal",
    },
  ]

  return (
    <section className="bg-muted py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-6 rounded-full mb-6 text-primary">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
