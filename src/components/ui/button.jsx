import React from 'react'

const base = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-bg"
const variants = {
  default: "bg-gradient-to-r from-brand to-brand2 text-white shadow-soft hover:opacity-95",
  outline: "border border-border/70 bg-surface text-text hover:bg-muted",
  ghost: "text-text hover:bg-muted"
}
const sizes = {
  default: "h-10",
  lg: "h-11 px-5 text-base"
}

export function Button({ variant='default', size='default', className='', ...props }) {
  const v = variants[variant] || variants.default
  const s = sizes[size] || sizes.default
  return <button className={`${base} ${v} ${s} ${className}`} {...props} />
}
