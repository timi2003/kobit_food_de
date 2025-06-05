import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FoodCategories } from "@/components/food-categories"
import { PopularItems } from "@/components/popular-items"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { MainNav } from "@/components/main-nav"
import { RestaurantsList } from "@/components/restaurants-list"
import { PickYourChoice } from "@/components/pick-your-choice"
import { Star, Clock, ShieldCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <HeroSection />
        <FoodCategories />

        {/* Pick Your Choice Section */}
        <section className="py-12 bg-muted/30">
          <PickYourChoice isHomepage={true} />
        </section>

        <RestaurantsList />
        <PopularItems />
        <HowItWorks />

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KOBIT?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're more than just a food delivery service. We're your partner in enjoying delicious meals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Our delivery partners ensure your food arrives in 20 minutes or less.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Restaurants</h3>
                <p className="text-muted-foreground">
                  We partner with the all your favourite food vendor in Lasued and environs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Ordering</h3>
                <p className="text-muted-foreground">
                  Ordering your favorite meals is made easy and hassle-free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="download" className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Order?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Your delicious food options are just a few clicks away. Start your culinary journey with KOBIT today.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
