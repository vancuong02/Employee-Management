import React, { forwardRef } from 'react'

type ButtonSize = 'sm' | 'md' | 'lg' | 'full'
type ButtonVariant = 'default' | 'outline' | 'destructive' | 'secondary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
}

function cn(...classes: (string | undefined | false | null)[]) {
    return classes.filter(Boolean).join(' ')
}

const variantClasses: Record<ButtonVariant, string> = {
    default:
        'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400',
    outline:
        'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400',
    destructive:
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400',
    secondary:
        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400'
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-2.5 py-1.5 text-sm rounded-md',
    md: 'px-3 py-2 text-sm rounded-md',
    lg: 'px-4 py-2.5 text-base rounded-lg',
    full: 'w-full px-4 py-2.5 text-base rounded-lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)
