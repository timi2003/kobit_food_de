import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { RestaurantsPage } from "@/components/restaurants-page"

export default function Restaurants() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <RestaurantsPage />
      </main>
      <Footer />
    </div>
  )
}
