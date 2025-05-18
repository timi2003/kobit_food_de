import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CheckoutPage } from "@/components/checkout-page"

export default function Checkout() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  )
}
