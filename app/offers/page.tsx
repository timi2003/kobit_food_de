import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { OffersPage } from "@/components/offers-page"

export default function Offers() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <OffersPage />
      </main>
      <Footer />
    </div>
  )
}
