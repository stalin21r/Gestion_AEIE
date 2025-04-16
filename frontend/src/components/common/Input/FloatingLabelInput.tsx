import React, { useState } from 'react'

interface InputProps {
  label: string
  type: string
  name: string
  placeholder?: string
  value?: string
  labelColor?: 'blue' | 'red' | 'green' | 'purple' | 'pink' | 'indigo'
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FloatingLabelInput({
  label,
  type,
  name,
  placeholder = '',
  value = '',
  labelColor = 'blue',
  onChange
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

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
    ? `text-sm -top-3 left-4 bg-white px-1 ${isFocused ? `${text} font-semibold` : 'text-gray-500 font-normal'}`
    : 'text-gray-500 top-1/2 -translate-y-1/2'

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${labelClasses}`}
      >
        {label}
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
        className={`w-full px-3 pt-4 pb-4 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 ${ring} text-black font-semibold focus:border-transparent`}
      />
    </div>
  )
}
