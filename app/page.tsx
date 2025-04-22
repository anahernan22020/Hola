import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { events } from "@/data/events"
import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"

export default function Home() {
  // Mostrar solo los primeros 6 eventos en la página principal
  const featuredEvents = events.slice(0, 6)

  // Categorías populares
  const categories = [
    { name: "Conciertos", icon: "🎵" },
    { name: "Deportes", icon: "⚽" },
    { name: "Teatro", icon: "🎭" },
    { name: "Festivales", icon: "🎪" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section con imagen de fondo */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-purple-900">
          {/* Usamos una imagen estática en lugar de Next.js Image */}
          <img
            src="/images/concert-bg.png"
            alt="Eventos en vivo"
            className="h-full w-full object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Ticket Más</h1>
          <p className="mb-8 text-xl">Tu portal para los mejores conciertos y eventos en México</p>

          {/* Barra de búsqueda */}
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos, artistas o lugares..."
              className="h-14 w-full rounded-full bg-white pl-12 pr-4 text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </section>

      {/* Categorías populares */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold">Categorías populares</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/eventos?categoria=${category.name.toLowerCase()}`}
                className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center transition-all hover:bg-purple-50 hover:shadow-md"
              >
                <span className="mb-2 text-4xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos destacados */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Eventos destacados</h2>
            <Link href="/eventos" className="flex items-center text-purple-600 hover:underline">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Promoción de descuento */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">¡OFERTA ESPECIAL!</h2>
          <p className="mb-6 text-xl">
            Obtén un <span className="text-2xl font-bold">25% DE DESCUENTO</span> en todos los eventos pagando con
            transferencia bancaria o en tiendas Oxxo
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/eventos">Ver eventos con descuento</Link>
          </Button>
        </div>
      </section>

      {/* Próximos eventos */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold">Próximos eventos</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.slice(6, 10).map((event) => (
              <EventCard key={event.id} event={event} compact />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
