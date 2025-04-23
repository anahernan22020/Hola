"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { events } from "@/data/events"
import { Calendar, Clock, MapPin, Tag, Info, CreditCard, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trackEventView, trackPurchaseStart } from "@/lib/analytics"

export default function EventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const event = events.find((e) => e.id === params.id)
  const [selectedZone, setSelectedZone] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // Rastrear vista de evento cuando la página se carga
    if (event) {
      trackEventView(event.id, event.name)
    }
  }, [event])

  if (!event) {
    return <div className="container mx-auto p-8 text-center">Evento no encontrado</div>
  }

  // Calcular precio con descuento si existe
  const hasDiscount = !!event.discount
  const selectedPrice = event.prices.find((p) => p.zone === selectedZone)?.price || 0
  const discountedPrice = hasDiscount ? selectedPrice * (1 - event.discount!.percentage / 100) : selectedPrice
  const total = discountedPrice * quantity

  const handleBuyTickets = () => {
    if (!selectedZone) {
      alert("Por favor selecciona una zona")
      return
    }

    // Rastrear inicio de compra
    trackPurchaseStart(event.id, event.name)

    // Guardar información de compra en localStorage para usarla en la página de pago
    localStorage.setItem(
      "purchaseInfo",
      JSON.stringify({
        eventId: event.id,
        eventName: event.name,
        zone: selectedZone,
        quantity,
        unitPrice: selectedPrice,
        discountedPrice: hasDiscount ? discountedPrice : null,
        discount: hasDiscount ? event.discount : null,
        total: hasDiscount ? total : selectedPrice * quantity,
      }),
    )

    router.push("/pago")
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Imagen y detalles del evento */}
          <div className="md:col-span-2">
            <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-lg md:h-[400px] bg-gray-200">
              <img src={event.image || "/placeholder.svg"} alt={event.name} className="h-full w-full object-cover" />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {event.discount!.percentage}% OFF
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="mb-4 text-3xl font-bold">{event.name}</h1>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Hora</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Lugar</p>
                    <p className="font-medium">
                      {event.venue}, {event.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Categoría</p>
                    <p className="font-medium capitalize">{event.category}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <Tabs defaultValue="descripcion">
                <TabsList className="mb-4">
                  <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                  <TabsTrigger value="informacion">Información</TabsTrigger>
                </TabsList>
                <TabsContent value="descripcion">
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="informacion">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Info className="h-5 w-5 text-purple-600" />
                        Información general
                      </h3>
                      <p className="text-gray-700">
                        Las puertas abren 2 horas antes del evento. Se recomienda llegar con anticipación.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                        Métodos de pago
                      </h3>
                      <p className="text-gray-700">
                        Aceptamos tarjetas de crédito/débito, transferencias bancarias y pagos en tiendas Oxxo.
                        {hasDiscount && (
                          <span className="block mt-2 font-medium text-purple-600">
                            ¡Obtén un {event.discount!.percentage}% de descuento pagando con{" "}
                            {event.discount!.paymentMethods.join(" o ")}!
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Selección de boletos */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-purple-600" />
                  Seleccionar Boletos
                </h2>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium">Zona</label>
                  <select
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                  >
                    <option value="">Seleccionar zona</option>
                    {event.prices.map((price) => (
                      <option key={price.zone} value={price.zone}>
                        {price.zone} - ${price.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium">Cantidad</label>
                  <select
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "boleto" : "boletos"}
                      </option>
                    ))}
                  </select>
                </div>

                {hasDiscount && (
                  <div className="mb-6 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <h3 className="text-sm font-semibold text-purple-700 mb-1">¡OFERTA ESPECIAL!</h3>
                    <p className="text-xs text-purple-600">
                      Obtén un {event.discount!.percentage}% de descuento pagando con{" "}
                      {event.discount!.paymentMethods.join(" o ")}
                    </p>
                  </div>
                )}

                <Separator className="mb-6" />

                <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Precio unitario:</span>
                    <span>${selectedPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cantidad:</span>
                    <span>{quantity}</span>
                  </div>
                  {hasDiscount && selectedZone && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Descuento ({event.discount!.percentage}%):</span>
                      <span>-${((selectedPrice * quantity * event.discount!.percentage) / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleBuyTickets}>
                  Comprar Boletos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
