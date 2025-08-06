import React, { useState } from 'react'

interface InputProps {
  label: string
  type: string
  name: string
  placeholder?: string
  value?: string
  backgroundColor?: string
  textColor?: string
  labelColor?: 'blue' | 'red' | 'green' | 'purple' | 'pink' | 'indigo'
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FloatingLabelInput({
  label,
  type,
  name,
  placeholder = '',
  value = '',
  textColor = 'white',
  backgroundColor = '[#0b0d36]',
  labelColor = 'blue',
  onChange
}: InputProps) {
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
    ? `text-lg -top-[0.6rem] left-4 bg-${backgroundColor} px-2 z-1 text-inherit h-4`
    : 'hidden'

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 pointer-events-none focus:[webkit-text-stroke:0.8px_white] ${labelClasses}`}
      >
        {label}
      </label>
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${fixBorder}`}
      >
        <span className="text-transparent">{label}</span>
      </label>

      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full px-3 pt-4 pb-4 z-0 bg-inherit border border-gray-400 rounded-xl focus:outline-none focus:ring-2 ${ring} text-${textColor} font-semibold focus:border-transparent`}
      />
    </div>
  )
}
