import React, { useState } from 'react'

interface TooltipProps {
    text: string
    children: React.ReactNode
}

export default function Tooltip({ text, children }: TooltipProps) {
    const [visible, setVisible] = useState(false)

    return (
        <div
            className='relative flex items-center z-50'
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div className='absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50'>
                    {text}
                    <div className='absolute left-1/2 -bottom-1 w-2 h-2 bg-gray-800 rotate-45 -translate-x-1/2'></div>
                </div>
            )}
        </div>
    )
}
