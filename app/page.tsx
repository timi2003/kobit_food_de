import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FoodCategories } from "@/components/food-categories"
import { PopularItems } from "@/components/popular-items"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { MainNav } from "@/components/main-nav"
import { RestaurantsList } from "@/components/restaurants-list"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <HeroSection />
        <FoodCategories />
        <RestaurantsList />
        <PopularItems />
        <HowItWorks />
        <section className="container mx-auto py-12 px-4 md:py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Order?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Thousands of delicious options are just a few clicks away. Start your culinary journey with KOBIT today.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  )
}
