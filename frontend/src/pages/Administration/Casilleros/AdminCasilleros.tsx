import { useEffect, useState } from 'react'
import {
  FloatingLabelInput,
  FloatingLabelSelect,
  ModalForm,
  Pagination
} from '@/components'
import { toast } from 'react-toastify'
import {} from '@/services'
import {} from '@/types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/utils/constants'
export default function AdminCasilleros() {
  const MySwal = withReactContent(Swal)

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      <section className="w-7/9 flex items-center justify-between ">
        <h3 className="text-5xl font-bold text-white">Casilleros</h3>
        <NavLink
          to={ROUTES.ADMIN_TABLE_CASILLEROS}
          className="bg-[#1976d2] text-white border-none rounded-lg px-5 py-2 text-md font-semibold cursor-pointer shadow-md transition-colors duration-200 hover:bg-[#1565c0]"
        >
          Administrar casilleros
        </NavLink>
      </section>
    </div>
  )
}
