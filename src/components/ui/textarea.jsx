import React from 'react'

export function Textarea({ className='', ...props }) {
  return <textarea className={`min-h-[120px] w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 ${className}`} {...props} />
}
