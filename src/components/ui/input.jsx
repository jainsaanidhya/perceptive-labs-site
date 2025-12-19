import React from 'react'

export function Input({ className='', ...props }) {
  return (
    <input
      className={`h-10 w-full rounded-2xl border border-border/70 bg-surface px-3 text-sm text-text placeholder:text-subtext/80 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 ${className}`}
      {...props}
    />
  )
}
