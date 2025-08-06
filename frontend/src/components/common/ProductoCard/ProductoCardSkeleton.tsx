// components/ProductoCardSkeleton.tsx
export default function ProductoCardSkeleton() {
  return (
    <div className="p-5 space-y-2 flex flex-col items-center justify-center bg-[#1c1c4b] border-none rounded-xl text-center text-white animate-pulse">
      <div className="border-b-2 border-blue-300/20 pb-3">
        <div className="w-36 h-36 rounded-xl bg-gray-400/30" />
      </div>
      <div className="h-4 bg-gray-400/30 rounded w-24 mt-2" />
      <div className="h-4 bg-gray-400/30 rounded w-16" />
    </div>
  )
}
