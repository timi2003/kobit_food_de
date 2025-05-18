import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Delicious food background"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          Delicious Food, <br />
          Delivered Fast
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mb-8">
          KOBIT brings your favorite meals from the best local restaurants straight to your door. Order in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
            <Link href="/menu">Order Now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 text-white border-white hover:bg-white/10"
          >
            <Link href="/restaurants">View Restaurants</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
