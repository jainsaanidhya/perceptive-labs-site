import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`h-12 w-full rounded-2xl border border-border bg-bg px-4 text-sm text-text placeholder:text-subtext/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 ${className}`}
      {...props}
    />
  );
}
