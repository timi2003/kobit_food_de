import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { AboutPage } from "@/components/about-page"

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <AboutPage />
      </main>
      <Footer />
    </div>
  )
}
