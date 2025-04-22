import { EventCard } from "@/components/event-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { events } from "@/data/events"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Todos los Eventos</h1>
          <p className="text-lg mb-6">Encuentra los mejores eventos en México</p>

          {/* Barra de búsqueda principal */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos, artistas o lugares..."
              className="h-14 w-full rounded-full bg-white pl-12 pr-4 text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="mb-8 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Filtros:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="conciertos">Conciertos</SelectItem>
                  <SelectItem value="deportes">Deportes</SelectItem>
                  <SelectItem value="teatro">Teatro</SelectItem>
                  <SelectItem value="festivales">Festivales</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Cualquier fecha</SelectItem>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="tomorrow">Mañana</SelectItem>
                  <SelectItem value="weekend">Este fin de semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-asc">Fecha (más cercana)</SelectItem>
                  <SelectItem value="date-desc">Fecha (más lejana)</SelectItem>
                  <SelectItem value="price-asc">Precio (menor a mayor)</SelectItem>
                  <SelectItem value="price-desc">Precio (mayor a menor)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full md:w-auto whitespace-nowrap">Aplicar filtros</Button>
          </div>
        </div>

        {/* Promoción de descuento */}
        <div className="mb-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">¡OFERTA ESPECIAL!</h2>
              <p className="text-lg">
                Obtén un <span className="font-bold">25% DE DESCUENTO</span> en todos los eventos pagando con
                transferencia bancaria o en tiendas Oxxo
              </p>
            </div>
            <Button className="mt-4 md:mt-0 bg-white text-purple-600 hover:bg-gray-100">Ver detalles</Button>
          </div>
        </div>

        {/* Lista de eventos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}
