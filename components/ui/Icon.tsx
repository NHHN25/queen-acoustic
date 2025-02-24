import React from 'react'
import Image from 'next/image'

export const Icon = () => {
  return (
    <div className="graphic-logo">
      <Image src="/favicon/web-app-manifest-192x192.png" alt="Logo" width={50} height={50} />
    </div>
  )
}