import React from "react";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  default:
    "bg-gradient-to-r from-brand to-brand2 text-white shadow-soft hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
  outline:
    "border border-border bg-bg text-text hover:bg-muted hover:border-border/80",
  ghost: "text-text hover:bg-muted",
};

const sizes = {
  default: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({ variant = "default", size = "default", className = "", ...props }) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  );
}
