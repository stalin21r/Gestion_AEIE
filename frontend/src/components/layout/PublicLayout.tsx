import { Outlet, Link } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">
              <Link to="/" className="hover:text-blue-200">
                Mi Aplicación
              </Link>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="hover:text-blue-200">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/casilleros" className="hover:text-blue-200">
                    Casilleros
                  </Link>
                </li>
                <li>
                  <Link to="/tienda" className="hover:text-blue-200">
                    Tienda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
                  >
                    Iniciar sesión
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Mi Aplicación</h3>
              <p className="text-gray-400">
                Ofrecemos los mejores servicios para nuestros clientes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/casilleros" className="hover:text-white">
                    Casilleros
                  </Link>
                </li>
                <li>
                  <Link to="/tienda" className="hover:text-white">
                    Tienda
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <address className="text-gray-400 not-italic">
                <p>Email: info@miapp.com</p>
                <p>Teléfono: (123) 456-7890</p>
                <p>Dirección: Calle Principal 123</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Mi Aplicación. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
