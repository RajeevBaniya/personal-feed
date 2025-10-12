'use client';
import React from 'react';
const variants = {
  default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  elevated: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md',
  transparent: 'bg-white/10 dark:bg-gray-800/10 backdrop-blur border border-white/20 dark:border-gray-700/20',
  gradient: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur border border-blue-300/20',
};

export default function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  hoverable = false,
  ...props
}) {
  const variantClasses = variants[variant] || variants.default;
  const hoverClasses = hoverable ? 'hover:shadow-lg transition-shadow' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        ${variantClasses}
        ${hoverClasses}
        ${clickableClasses}
        rounded-xl overflow-hidden
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
}
