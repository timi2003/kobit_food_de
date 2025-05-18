import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { SettingsPage } from "@/components/settings-page"

export default function Settings() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <SettingsPage />
      </main>
      <Footer />
    </div>
  )
}
