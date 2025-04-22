"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, Search, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Verificar si el usuario está logueado
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (loggedIn) {
      const userInfo = JSON.parse(localStorage.getItem("user") || "{}")
      setUserName(userInfo.name || "Usuario")
    }

    // Detectar scroll para cambiar el estilo del header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname]) // Re-verificar cuando cambia la ruta

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUserName("")
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Ticket Más" width={40} height={40} />
          <span className={`text-xl font-bold ${isScrolled || pathname !== "/" ? "text-black" : "text-white"}`}>
            Ticket Más
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-purple-600 ${
              isScrolled || pathname !== "/" ? "text-gray-700" : "text-white"
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/eventos"
            className={`text-sm font-medium transition-colors hover:text-purple-600 ${
              isScrolled || pathname !== "/" ? "text-gray-700" : "text-white"
            }`}
          >
            Eventos
          </Link>
          <Link
            href="/contacto"
            className={`text-sm font-medium transition-colors hover:text-purple-600 ${
              isScrolled || pathname !== "/" ? "text-gray-700" : "text-white"
            }`}
          >
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className={`hidden md:flex items-center justify-center rounded-full p-2 transition-colors ${
              isScrolled || pathname !== "/" ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </button>

          <button
            className={`hidden md:flex items-center justify-center rounded-full p-2 transition-colors ${
              isScrolled || pathname !== "/" ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favoritos</span>
          </button>

          {isLoggedIn ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className={`text-sm ${isScrolled || pathname !== "/" ? "text-gray-700" : "text-white"}`}>
                Hola, {userName}
              </span>
              <Button
                variant={isScrolled || pathname !== "/" ? "outline" : "secondary"}
                size="sm"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Button
                asChild
                variant={isScrolled || pathname !== "/" ? "outline" : "secondary"}
                size="sm"
                className="mr-2"
              >
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className={!isScrolled && pathname === "/" ? "bg-white text-purple-600 hover:bg-gray-100" : ""}
              >
                <Link href="/registro">Registrarse</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={isScrolled || pathname !== "/" ? "outline" : "secondary"}
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-purple-600">
                  Inicio
                </Link>
                <Link href="/eventos" className="text-sm font-medium transition-colors hover:text-purple-600">
                  Eventos
                </Link>
                <Link href="/contacto" className="text-sm font-medium transition-colors hover:text-purple-600">
                  Contacto
                </Link>

                <div className="my-2 h-px bg-gray-200" />

                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{userName}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild size="sm" className="w-full">
                      <Link href="/registro">Registrarse</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
