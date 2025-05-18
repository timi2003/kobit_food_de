"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Utensils,
} from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Sheet, SheetContent } from "@/app/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Orders",
      icon: <ShoppingBag className="h-5 w-5" />,
      href: "/admin/orders",
      active: pathname === "/admin/orders",
    },
    {
      label: "Menu Management",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/menu",
      active: pathname === "/admin/menu",
      subItems: [
        {
          label: "Food Items",
          href: "/admin/menu/items",
          active: pathname === "/admin/menu/items",
        },
        {
          label: "Categories",
          href: "/admin/menu/categories",
          active: pathname === "/admin/menu/categories",
        },
        {
          label: "Promotions",
          href: "/admin/menu/promotions",
          active: pathname === "/admin/menu/promotions",
        },
      ],
    },
    {
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/customers",
      active: pathname === "/admin/customers",
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 z-40 lg:hidden"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left" className="p-0">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/admin" className="flex items-center gap-2 font-bold text-2xl text-primary">
              <Utensils className="h-5 w-5" />
              KOBIT Admin
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <div className="flex flex-col gap-2 p-4">
            {routes.map((route) =>
              route.subItems ? (
                <Collapsible key={route.label} open={route.active} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant={route.active ? "secondary" : "ghost"} className="w-full justify-start">
                      {route.icon}
                      <span className="ml-2">{route.label}</span>
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 pt-2">
                    {route.subItems.map((subItem) => (
                      <Button
                        key={subItem.label}
                        variant={subItem.active ? "secondary" : "ghost"}
                        className="w-full justify-start mb-1"
                        asChild
                      >
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Button
                  key={route.label}
                  variant={route.active ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={route.href}>
                    {route.icon}
                    <span className="ml-2">{route.label}</span>
                  </Link>
                </Button>
              ),
            )}
          </div>
          <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
              <Link href="/admin/logout">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex w-64 flex-col border-r bg-muted/40 h-screen sticky top-0">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Utensils className="h-5 w-5" />
            KOBIT Admin
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-2 px-4">
            {routes.map((route) =>
              route.subItems ? (
                <Collapsible key={route.label} open={route.active} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant={route.active ? "secondary" : "ghost"} className="w-full justify-start">
                      {route.icon}
                      <span className="ml-2">{route.label}</span>
                      <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 pt-2">
                    {route.subItems.map((subItem) => (
                      <Button
                        key={subItem.label}
                        variant={subItem.active ? "secondary" : "ghost"}
                        className="w-full justify-start mb-1"
                        asChild
                      >
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Button
                  key={route.label}
                  variant={route.active ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={route.href}>
                    {route.icon}
                    <span className="ml-2">{route.label}</span>
                  </Link>
                </Button>
              ),
            )}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
            <Link href="/admin/logout">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>
    </>
  )
}
