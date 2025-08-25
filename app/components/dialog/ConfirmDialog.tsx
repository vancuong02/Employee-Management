import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '../base/Button'

type ConfirmDialogProps = {
    show: boolean
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmDialog({
    show,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmText = 'OK',
    cancelText = 'Cancel',
    onConfirm,
    onCancel
}: ConfirmDialogProps) {
    // ESC để đóng popup
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCancel()
        }
        if (show) document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [show, onCancel])

    if (!show) return null

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute inset-0 bg-black opacity-30' onClick={onCancel}></div>

            <div className='relative bg-white rounded-lg shadow-lg px-8 py-8 w-full max-w-md text-center flex flex-col items-center'>
                <AlertCircle className='w-16 h-16 text-orange-400 mb-4' strokeWidth={1.5} />
                <div className='mb-2 text-2xl font-semibold text-gray-800'>{title}</div>
                <div className='mb-6 text-gray-500 text-base'>{message}</div>
                <div className='flex justify-center gap-3 w-full'>
                    <Button size='full' onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button size='full' variant='destructive' onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    )
}
