import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Ticket Más</h3>
            <p className="text-sm text-gray-600">
              Tu portal para los mejores eventos en México. Encuentra boletos para conciertos, deportes, teatro y más.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-gray-600 hover:text-purple-600">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-600 hover:text-purple-600">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-600 hover:text-purple-600">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-600 hover:text-purple-600">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Teléfono: 33 22 09 1849</li>
              <li>Teléfono: 33 26 31 9606</li>
              <li>Email: boletia@tusboletomx.com</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Ticket Más. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
