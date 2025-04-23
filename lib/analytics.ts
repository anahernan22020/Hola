"use client"

import { track } from "@vercel/analytics"

// Función para rastrear vistas de eventos
export function trackEventView(eventId: string, eventName: string) {
  track("event_view", {
    eventId,
    eventName,
  })
}

// Función para rastrear clics en "Comprar boletos"
export function trackPurchaseStart(eventId: string, eventName: string) {
  track("purchase_start", {
    eventId,
    eventName,
  })
}

// Función para rastrear selección de método de pago
export function trackPaymentMethodSelected(method: string) {
  track("payment_method_selected", {
    method,
  })
}

// Función para rastrear compras completadas
export function trackPurchaseComplete(eventId: string, eventName: string, amount: number) {
  track("purchase_complete", {
    eventId,
    eventName,
    amount,
  })
}
