import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CartPage } from "@/components/cart-page"

export default function Cart() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
