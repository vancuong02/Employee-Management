import React from 'react'

type FormInputProps = {
    label: string
    id: string
    name: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    error?: string
    type?: string
    placeholder?: string
    options?: { value: string; label: string }[]
    max?: string
    autoFocus?: boolean
    required?: boolean
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    error,
    type = 'text',
    placeholder,
    options,
    max,
    autoFocus = false,
    required = false
}) => {
    const baseClass =
        'border rounded-lg p-3 outline-none focus:ring-2 ' +
        (error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-gray-300')

    return (
        <div className='flex flex-col'>
            <label htmlFor={id} className='font-medium text-gray-700'>
                {label} {required && <span className='text-red-500'>*</span>}
            </label>

            {options ? (
                <select id={id} name={name} value={value || ''} onChange={onChange} className={baseClass}>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    name={name}
                    className={baseClass}
                    type={type}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                    max={max}
                    autoFocus={autoFocus}
                />
            )}

            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    )
}

export default FormInput
