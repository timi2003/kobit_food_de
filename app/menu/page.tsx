import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MenuPage } from "@/components/menu-page"

export default function Menu() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <MenuPage />
      </main>
      <Footer />
    </div>
  )
}
