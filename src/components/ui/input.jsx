import React from 'react'

export function Input({ className='', ...props }) {
  return <input className={`h-10 w-full rounded-2xl border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 ${className}`} {...props} />
}
