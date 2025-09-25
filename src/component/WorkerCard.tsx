'use client'

import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { WorkerType } from '@/types/workers'

interface WorkerCardProps {
  worker: WorkerType
  onContact?: (worker: WorkerType) => void
  currency?: string
  priority?: boolean // for above-the-fold images
}

const WorkerCard = ({
  worker,
  onContact,
  currency = '₹',
  priority = false,
}: WorkerCardProps) => {
  
  const handleContact: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    if (onContact) onContact(worker)
  }

  return (
    <div
      className="bg-white rounded-xl shadow-sm transition-all duration-300 overflow-hidden group border border-gray-100"
      role="article"
      aria-label={`Worker card for ${worker.name}`}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={worker.image}
          alt={`${worker.name} - ${worker.service}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 (max-width: 1280px) 33vw,
                 25vw"
          priority={priority}
          unoptimized
        />
        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {worker.name}
        </h3>
        <p className="text-gray-500 text-xs tracking-wide uppercase mb-3">
          {worker.service}
        </p>

        {/* Price + Action */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {currency}
              {worker.pricePerDay}
            </span>
            <span className="text-gray-500 text-sm ml-1">/day</span>
          </div>
          <button
            onClick={handleContact}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors duration-200 w-full sm:w-auto"
            aria-label={`Contact ${worker.name}`}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkerCard
