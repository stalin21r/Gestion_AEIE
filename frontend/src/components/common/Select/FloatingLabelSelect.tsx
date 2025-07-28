import React, { useState } from 'react'

interface SelectProps {
  label: string
  name: string
  value?: string
  labelColor?: 'blue' | 'red' | 'green' | 'purple' | 'pink' | 'indigo'
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  children: React.ReactNode
}

export default function FloatingLabelSelect({
  label,
  name,
  value = '',
  labelColor = 'blue',
  onChange,
  children
}: SelectProps) {
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  // Mapear colores a clases específicas de Tailwind
  const getColorClasses = () => {
    switch (labelColor) {
      case 'red':
        return {
          text: 'text-red-600',
          ring: 'focus:ring-red-500'
        }
      case 'green':
        return {
          text: 'text-green-600',
          ring: 'focus:ring-green-500'
        }
      case 'purple':
        return {
          text: 'text-purple-600',
          ring: 'focus:ring-purple-500'
        }
      case 'pink':
        return {
          text: 'text-pink-600',
          ring: 'focus:ring-pink-500'
        }
      case 'indigo':
        return {
          text: 'text-indigo-600',
          ring: 'focus:ring-indigo-500'
        }
      case 'blue':
      default:
        return {
          text: 'text-blue-600',
          ring: 'focus:ring-blue-500'
        }
    }
  }

  const { text, ring } = getColorClasses()

  // Determinar el estado del label
  const shouldFloat = isFocused || value !== ''
  const labelClasses = shouldFloat
    ? `text-lg -top-4 left-4 bg-inherit z-2 px-1 ${isFocused ? `${text} font-bold ` : 'text-gray-500 font-normal'}`
    : 'text-gray-500 top-1/2 -translate-y-1/2'
  const fixBorder = shouldFloat
    ? `text-lg -top-[0.07rem] left-4 bg-white px-2 z-1 text-inherit h-1`
    : 'hidden'

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${labelClasses}`}
        style={{ WebkitTextStroke: '0.2px white' }}
      >
        {label}
      </label>
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${fixBorder}`}
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full px-3 pt-4 pb-4 z-10 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-2 ${ring} text-black font-semibold focus:border-transparent appearance-none cursor-pointer`}
      >
        {children}
      </select>

      {/* Icono de flecha personalizado */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  )
}
