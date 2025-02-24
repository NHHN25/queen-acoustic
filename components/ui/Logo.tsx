import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="graphic-logo">
      <Image src="/favicon/web-app-manifest-192x192.png" alt="Logo" width={96} height={96} />
    </div>
  )
}