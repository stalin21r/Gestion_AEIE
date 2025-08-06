import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import authService from '@/services/auth.service'
import { LoboLogin, Logo1, CloudLogin, ElectronicaText } from '@/assets/images'
import { FloatingLabelInput, LoadingOverlay } from '@/components'
import { toast } from 'react-toastify'
import { ROUTES } from '@/utils/constants'

export default function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, userInfo } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (userInfo) {
      navigate(ROUTES.ADMIN_HOME, { replace: true })
    }
  })
  // Obtener la ruta de redirección (si existe)
  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user.trim()) {
      toast.error('El usuario es requerido')
      return
    }
    if (!password) {
      toast.error('La contraseña es requerida')
      return
    }
    setLoading(true)
    authService
      .login({ user, password })
      .then(res => {
        toast.success(res.message)
        // actualizar el contexto de autenticación
        login(res.token)
        navigate(from, { replace: true })
        setLoading(false)
      })
      .catch(err => {
        if (err instanceof Error) {
          toast.error(err.message)
        } else {
          toast.error('Error desconocido durante el inicio de sesión')
        }
        setLoading(false)
      })
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Right section */}
      <section className="hidden md:flex md:flex-1 flex-col items-center justify-center">
        <img src={LoboLogin} className="h-auto" />
        <img src={ElectronicaText} className="w-[80%] h-auto" />
      </section>

      {/* Left section */}
      {/* section que tiene como backgorund la imagen cloudlogin */}
      <section
        className="flex-[1.4] flex flex-col items-center md:items-end justify-center bg-no-repeat p-5"
        style={{
          backgroundImage: `url(${CloudLogin})`,
          backgroundPositionY: '11%',
          backgroundSize: '178% 125%',
          backgroundPositionX: '10%'
        }}
      >
        <div className="w-[80%] md:w-[60%] flex flex-col justify-center items-center md:mr-20 space-y-4">
          <img src={Logo1} className="w-[150px] mb-4 h-auto" />
          <h2 className="text-black font-bold text-2xl">INICIAR SESIÓN</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-3/4 space-y-4"
          >
            <FloatingLabelInput
              label="Usuario"
              type="text"
              name="user"
              backgroundColor="white"
              textColor="black"
              value={user}
              onChange={e => setUser(e.target.value)}
            />

            <FloatingLabelInput
              label="Contraseña"
              type="password"
              name="password"
              backgroundColor="white"
              textColor="black"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-3/4 text-white bg-[#001366] hover:bg-[#001d91] hover:scale-105 rounded-lg text-base font-bold px-5 py-2.5 text-center disabled:opacity-50 cursor-pointer transition duration-300 ease-in-out"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </section>
      {loading && <LoadingOverlay />}
    </div>
  )
}
