import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisiblePages?: number
  showFirstLast?: boolean
  disabled?: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  disabled = false
}) => {
  // Calcular qué páginas mostrar
  const getVisiblePages = (): number[] => {
    const pages: number[] = []
    const half = Math.floor(maxVisiblePages / 2)

    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, start + maxVisiblePages - 1)

    // Ajustar el inicio si estamos cerca del final
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const visiblePages = getVisiblePages()
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handlePageClick = (page: number) => {
    if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  if (totalPages <= 1) return null

  return (
    <nav role="navigation" aria-label="Paginación">
      <div className="flex items-center justify-center space-x-1">
        {/* Botón Primera Página */}
        {showFirstLast && (
          <button
            onClick={() => handlePageClick(1)}
            disabled={disabled || isFirstPage}
            className={`
              flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer
              ${
                disabled || isFirstPage
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:bg-gray-100 hover:text-blue-600'
              }
            `}
            aria-label="Primera página"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41z"
                fill="currentColor"
              />
              <path d="M6 6h2v12H6z" fill="currentColor" />
            </svg>
          </button>
        )}

        {/* Botón Página Anterior */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={disabled || isFirstPage}
          className={`
            flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer
            ${
              disabled || isFirstPage
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-gray-300 hover:bg-gray-100 hover:text-blue-600'
            }
          `}
          aria-label="Página anterior"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Botón de primera página si no está visible */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              disabled={disabled}
              className={`
                flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer
                text-gray-600 hover:bg-gray-100 hover:text-blue-600
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="flex items-center justify-center w-7 h-7 text-gray-400">
                ...
              </span>
            )}
          </>
        )}

        {/* Números de página */}
        {visiblePages.map(page => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={disabled}
            className={`
              flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 font-medium cursor-pointer
              ${
                page === currentPage
                  ? 'bg-blue-600 text-white shadow-md'
                  : disabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }
            `}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Botón de última página si no está visible */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="flex items-center justify-center w-7 h-7 text-gray-400">
                ...
              </span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              disabled={disabled}
              className={`
                flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer
                text-gray-600 hover:bg-gray-100 hover:text-blue-600
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Botón Página Siguiente */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={disabled || isLastPage}
          className={`
            flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer
            ${
              disabled || isLastPage
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-gray-300 hover:bg-gray-100 hover:text-blue-600'
            }
          `}
          aria-label="Página siguiente"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Botón Última Página */}
        {showFirstLast && (
          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={disabled || isLastPage}
            className={`
              flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer
              ${
                disabled || isLastPage
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:bg-gray-100 hover:text-blue-600'
              }
            `}
            aria-label="Última página"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41z"
                fill="currentColor"
              />
              <path d="M16 6h2v12h-2z" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
    </nav>
  )
}

export default Pagination
