import type { Employee } from '~/types'
import FormInput from '../base/FormInput'
import { optionGender } from '~/constant'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '../base/Button'

interface IFormDialogProps {
    showForm: boolean
    editingId: number | null
    form: Partial<Employee>
    errors: { [key: string]: string }
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: (e: React.FormEvent) => void
    closeForm: () => void
}

export default function FormDialog({
    showForm,
    editingId,
    form,
    errors,
    handleChange,
    handleSubmit,
    closeForm
}: IFormDialogProps) {
    // Đóng popup form khi nhấn ESC
    useEffect(() => {
        if (!showForm) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeForm()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [closeForm, showForm])

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black opacity-30' onClick={closeForm}></div>
            <div className='relative bg-white rounded-xl shadow-lg p-8 w-full max-w-lg mx-auto'>
                <button
                    type='button'
                    className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer'
                    onClick={closeForm}
                    aria-label='Close'
                >
                    <X className='w-6 h-6' />
                </button>
                <div className='mb-4'>
                    <h2 className='text-xl font-bold'>{editingId !== null ? 'Edit Employee' : 'Add New Employee'}</h2>
                    <p className='text-gray-500 text-sm'>
                        {editingId !== null ? 'Update employee information' : 'Fill in the form to add a new employee'}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4 text-[15px]'>
                    <div className='grid grid-cols-1 gap-4'>
                        <FormInput
                            label='Name'
                            id='name'
                            name='name'
                            autoFocus={true}
                            value={form.name || ''}
                            onChange={handleChange}
                            error={errors.name}
                            placeholder='Nguyen Van A'
                            required
                        />
                        <FormInput
                            label='Date of Birth'
                            id='dob'
                            name='dob'
                            type='date'
                            value={form.dob || ''}
                            onChange={handleChange}
                            error={errors.dob}
                            max={new Date().toISOString().split('T')[0]}
                            required
                        />
                        <FormInput
                            label='Gender'
                            id='gender'
                            name='gender'
                            value={form.gender || ''}
                            onChange={handleChange}
                            error={errors.gender}
                            options={optionGender}
                        />
                        <FormInput
                            label='Email'
                            id='email'
                            name='email'
                            type='email'
                            value={form.email || ''}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder='example@gmail.com'
                            required
                        />
                        <FormInput
                            label='Address'
                            id='address'
                            name='address'
                            value={form.address || ''}
                            onChange={handleChange}
                            error={errors.address}
                            placeholder='Ha Noi'
                            required
                        />
                    </div>
                    <div className='flex items-center justify-end mt-4 gap-2'>
                        <Button type='button' variant='outline' onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button type='submit'>{editingId !== null ? 'Update' : 'Add'}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
