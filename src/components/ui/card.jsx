import React from 'react'

export function Card({ className='', ...props }) {
  return <div className={`border border-border/70 bg-surface shadow-soft ${className}`} {...props} />
}

export function CardHeader({ className='', ...props }) {
  return <div className={`p-4 border-b border-border/60 ${className}`} {...props} />
}

export function CardTitle({ className='', ...props }) {
  return <div className={`font-semibold ${className}`} {...props} />
}

export function CardContent({ className='', ...props }) {
  return <div className={`p-4 ${className}`} {...props} />
}
