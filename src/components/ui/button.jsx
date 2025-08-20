import React from 'react'

const base = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
const variants = {
  default: "bg-black text-white hover:bg-gray-900",
  outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
  ghost: "text-gray-900 hover:bg-gray-100"
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
