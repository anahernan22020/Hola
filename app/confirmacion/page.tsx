"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ConfirmationPage() {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

  useEffect(() => {
    // Recuperar método de pago de localStorage (simulado)
    const method = localStorage.getItem("paymentMethod") || "card"
    setPaymentMethod(method)
  }, [])

  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">¡Gracias por tu compra!</h1>

          {paymentMethod === "card" ? (
            <p className="mb-6 text-gray-600">
              Tu pago ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de tu compra y
              tus boletos.
            </p>
          ) : (
            <p className="mb-6 text-gray-600">
              Hemos registrado tu pedido. Por favor realiza la transferencia bancaria y envía el comprobante a
              boletia@tusboletomx.com para confirmar tu compra.
            </p>
          )}

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/">Volver al Inicio</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/eventos">Ver más eventos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
