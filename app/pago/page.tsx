"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Landmark, Store } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PurchaseInfo {
  eventId: string
  eventName: string
  zone: string
  quantity: number
  unitPrice: number
  discountedPrice: number | null
  discount: {
    paymentMethods: string[]
    percentage: number
  } | null
  total: number
}

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "oxxo">("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Recuperar información de compra del localStorage
    const storedInfo = localStorage.getItem("purchaseInfo")
    if (storedInfo) {
      setPurchaseInfo(JSON.parse(storedInfo))
    } else {
      // Si no hay información de compra, redirigir a la página principal
      router.push("/")
    }
  }, [router])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulación de procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (paymentMethod === "card") {
        // En un caso real, aquí se enviaría la información a un procesador de pagos
        // Por ahora, simulamos el envío de datos por correo
        const paymentData = {
          method: "card",
          cardNumber,
          cardName,
          expiryDate,
          cvv,
          purchaseInfo,
          timestamp: new Date().toISOString(),
        }

        // Simulamos el envío de datos al correo (en un caso real, esto se haría en el backend)
        console.log("Datos de pago enviados:", paymentData)

        // Enviar datos a un webhook o servicio para notificar al administrador
        // Esta parte sería implementada en un backend real
      }

      // Guardar método de pago para la página de confirmación
      localStorage.setItem("paymentMethod", paymentMethod)

      // Limpiar información de compra
      localStorage.removeItem("purchaseInfo")

      toast({
        title:
          paymentMethod === "card"
            ? "Pago procesado correctamente"
            : paymentMethod === "transfer"
              ? "Información de transferencia enviada"
              : "Información de pago en Oxxo enviada",
        description:
          paymentMethod === "card"
            ? "Tus boletos han sido reservados. Recibirás un correo con los detalles."
            : paymentMethod === "transfer"
              ? "Realiza la transferencia y envía el comprobante para confirmar tu compra."
              : "Realiza el pago en Oxxo y envía el comprobante para confirmar tu compra.",
      })

      // Redirigir a página de confirmación
      router.push("/confirmacion")
    } catch (error) {
      toast({
        title: "Error al procesar el pago",
        description: "Ha ocurrido un error. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!purchaseInfo) {
    return <div className="container mx-auto p-8 text-center">Cargando información de compra...</div>
  }

  // Verificar si el método de pago seleccionado aplica para descuento
  const isDiscountApplicable =
    purchaseInfo.discount &&
    purchaseInfo.discount.paymentMethods.includes(
      paymentMethod === "transfer" ? "Transferencia" : paymentMethod === "oxxo" ? "Oxxo" : "",
    )

  // Calcular total con o sin descuento
  const finalTotal = isDiscountApplicable ? purchaseInfo.total : purchaseInfo.unitPrice * purchaseInfo.quantity * 1.1

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-6 text-3xl font-bold text-center">Finalizar Compra</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Método de Pago</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handlePayment}>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as "card" | "transfer" | "oxxo")}
                    className="mb-6 space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 font-medium">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                        Tarjeta de Crédito/Débito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex items-center gap-2 font-medium">
                        <Landmark className="h-5 w-5 text-purple-600" />
                        Transferencia Bancaria
                        {purchaseInfo.discount && purchaseInfo.discount.paymentMethods.includes("Transferencia") && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {purchaseInfo.discount.percentage}% descuento
                          </span>
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oxxo" id="oxxo" />
                      <Label htmlFor="oxxo" className="flex items-center gap-2 font-medium">
                        <Store className="h-5 w-5 text-purple-600" />
                        Pago en Oxxo
                        {purchaseInfo.discount && purchaseInfo.discount.paymentMethods.includes("Oxxo") && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {purchaseInfo.discount.percentage}% descuento
                          </span>
                        )}
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input
                          id="cardName"
                          placeholder="JUAN PEREZ"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Fecha de Expiración (MM/AA)</Label>
                          <Input
                            id="expiryDate"
                            placeholder="12/25"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ) : paymentMethod === "transfer" ? (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-2 font-semibold">Datos para Transferencia</h3>
                      <p className="mb-4 text-sm text-gray-600">
                        Realiza una transferencia bancaria con los siguientes datos y envía el comprobante al correo{" "}
                        <span className="font-medium">boletia@tusboletomx.com</span>
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Banco:</span>
                          <span>Inbursa</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Titular:</span>
                          <span>Ticket Más S.A. de C.V.</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Cuenta:</span>
                          <span>036260711506296288</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">CLABE:</span>
                          <span>012345678901234567</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Referencia:</span>
                          <span>
                            {purchaseInfo.eventId}-{Date.now().toString().slice(-6)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-2 font-semibold">Datos para Pago en Oxxo</h3>
                      <p className="mb-4 text-sm text-gray-600">
                        Realiza el pago en cualquier tienda Oxxo con los siguientes datos y envía el comprobante al
                        correo <span className="font-medium">boletia@tusboletomx.com</span>
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Número de referencia:</span>
                          <span>9876543210</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Concepto:</span>
                          <span>Ticket Más - {purchaseInfo.eventName}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Monto:</span>
                          <span>${finalTotal.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Vigencia:</span>
                          <span>48 horas</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Procesando..." : paymentMethod === "card" ? "Pagar Ahora" : "Confirmar Pedido"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Compra</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{purchaseInfo.eventName}</h3>
                    <p className="text-sm text-gray-600">Zona: {purchaseInfo.zone}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Precio unitario:</span>
                      <span>${purchaseInfo.unitPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cantidad:</span>
                      <span>{purchaseInfo.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${(purchaseInfo.unitPrice * purchaseInfo.quantity).toFixed(2)}</span>
                    </div>

                    {isDiscountApplicable ? (
                      <div className="flex justify-between text-green-600">
                        <span>Descuento ({purchaseInfo.discount!.percentage}%):</span>
                        <span>
                          -$
                          {(
                            (purchaseInfo.unitPrice * purchaseInfo.quantity * purchaseInfo.discount!.percentage) /
                            100
                          ).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span>Cargo por servicio:</span>
                        <span>${(purchaseInfo.unitPrice * purchaseInfo.quantity * 0.1).toFixed(2)}</span>
                      </div>
                    )}

                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
