import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, MapPin, Tag } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  name: string
  date: string
  time: string
  venue: string
  location: string
  image: string
  category: string
  prices: {
    zone: string
    price: number
  }[]
  description: string
  discount?: {
    paymentMethods: string[]
    percentage: number
  }
}

interface EventCardProps {
  event: Event
  compact?: boolean
}

export function EventCard({ event, compact = false }: EventCardProps) {
  // Encontrar el precio más bajo
  const lowestPrice = Math.min(...event.prices.map((p) => p.price))

  // Calcular precio con descuento si existe
  const hasDiscount = !!event.discount
  const discountedPrice = hasDiscount ? lowestPrice * (1 - event.discount!.percentage / 100) : lowestPrice

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full bg-gray-200">
        {/* Usamos una imagen estática en lugar de Next.js Image para mayor compatibilidad */}
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Si la imagen falla, usar un placeholder
            const target = e.target as HTMLImageElement
            target.src = `https://via.placeholder.com/400x200?text=${encodeURIComponent(event.name)}`
          }}
        />
        {hasDiscount && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
            {event.discount!.percentage}% OFF
          </div>
        )}
      </div>
      <CardContent className={`p-4 ${compact ? "pb-2" : ""}`}>
        <h3 className="mb-2 text-lg font-bold line-clamp-1">{event.name}</h3>
        <div className="mb-4 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-purple-500" />
            <span>
              {event.date} - {event.time}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-purple-500" />
            <span className="line-clamp-1">
              {event.venue}, {event.location}
            </span>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-gray-600">Desde</span>
          </div>
          <div className="flex items-center gap-2">
            {hasDiscount && <p className="text-sm text-gray-500 line-through">${lowestPrice.toFixed(2)}</p>}
            <p className="text-lg font-bold text-purple-600">${discountedPrice.toFixed(2)}</p>
          </div>
          {hasDiscount && <p className="text-xs text-gray-500">Con {event.discount!.paymentMethods.join(" o ")}</p>}
        </div>
      </CardContent>
      {!compact && (
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full">
            <Link href={`/eventos/${event.id}`}>Ver Detalles</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
