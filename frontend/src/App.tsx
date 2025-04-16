import { RouterProvider } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import router from '@/routes'
import { ToastContainer, Zoom } from 'react-toastify'
import '@fortawesome/fontawesome-free/css/all.min.css'

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </AuthProvider>
  )
}
