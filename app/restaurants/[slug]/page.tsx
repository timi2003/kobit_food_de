import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { RestaurantDetail } from "@/components/restaurant-detail"


export default function RestaurantPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <RestaurantDetail slug={params.slug} />
      </main>
      <Footer />
    </div>
  )
}
