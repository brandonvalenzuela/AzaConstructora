"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, LogOut, Menu, X, Images, Presentation } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Toaster } from '@/components/ui/toaster'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  if (!isAuthenticated) {
    return <div>Cargando...</div>
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Gestión de Blog", href: "/admin/blog", icon: FileText },
    { name: "Gestión de Medios", href: "/admin/media", icon: Images },
    { name: "Slideshow", href: "/admin/slideshow", icon: Presentation },
  ]

  return (
    <div className="min-h-screen bg-brand-accent/10">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-brand-primary bg-opacity-75" onClick={() => setIsSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-brand-accent">
            <div className="flex items-center">
              <Image src="/aza-constructora.png" alt="Logo AZA Constructora" width={36} height={36} className="mr-2" />
              <span className="ml-2 text-lg font-semibold text-brand-primary">Admin</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-brand-primary rounded-md hover:bg-brand-accent/20 hover:text-brand-accent"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-brand-accent" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-brand-accent">
          <div className="flex h-16 items-center px-4 border-b border-brand-accent">
            <Image src="/aza-constructora.png" alt="Logo AZA Constructora" width={36} height={36} className="mr-2" />
            <span className="ml-2 text-lg font-semibold text-brand-primary">Panel Admin</span>
          </div>
          <nav className="flex-1 px-4 py-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-brand-primary rounded-md hover:bg-brand-accent/20 hover:text-brand-accent"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-brand-accent" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-brand-accent">
            <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent text-brand-accent border-brand-accent hover:bg-brand-accent/10">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-brand-accent bg-white px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:px-6">
          <Button variant="ghost" size="sm" className="lg:hidden text-brand-primary" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-brand-primary">AZA Constructora - Administración</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="outline" size="sm" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent/10">
                <Link href="/" target="_blank">
                  Ver Sitio
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
