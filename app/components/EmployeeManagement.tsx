import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from './base/Button'
import type { Employee } from '~/types'
import { generateNumericId } from '~/utils'
import FormDialog from './dialog/FormDialog'
import ConfirmDialog from './dialog/ConfirmDialog'
import EmployeeTable from './tables/EmployeeTable'
import { names } from '~/constant'

const fakeEmployees: Employee[] = Array.from({ length: 60 }, (_, i) => {
    const year = 1990 + i
    const month = (i % 12) + 1
    const day = (i % 28) + 1

    return {
        id: generateNumericId() + i,
        name: names[i],
        dob: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        email: `employee${i + 1}@example.com`,
        address: i % 2 === 0 ? 'Ha Noi' : 'Phu Tho'
    }
})

export default function FormMangement() {
    const [employees, setEmployees] = useState<Employee[]>(fakeEmployees)
    const [form, setForm] = useState<Partial<Employee>>({})
    const [editingId, setEditingId] = useState<number | null>(null)
    const [showForm, setShowForm] = useState(false)

    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [newEmployeeId, setNewEmployeeId] = useState<number | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!form.name) newErrors.name = 'Name is required'
        if (!form.dob) {
            newErrors.dob = 'Date of Birth is required'
        } else if (new Date(form.dob) > new Date()) {
            newErrors.dob = 'Date of Birth cannot be in the future'
        }
        if (!form.email) {
            newErrors.email = 'Email is required'
        } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!form.address) newErrors.address = 'Address is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        if (editingId !== null) {
            setEmployees(employees.map((emp) => (emp.id === editingId ? ({ ...emp, ...form } as Employee) : emp)))
            setEditingId(null)
            toast.success('Employee updated successfully!')
        } else {
            const newId = generateNumericId()
            setNewEmployeeId(newId)
            setEmployees([...employees, { ...(form as Employee), id: newId, gender: form.gender || 'Male' }])
            toast.success('Employee added successfully!')
        }
        setForm({})
        setShowForm(false)
    }

    const handleEdit = (id: number) => {
        setErrors({})
        const emp = employees.find((e) => e.id === id)
        if (emp) {
            setForm(emp)
            setEditingId(id)
            setShowForm(true)
        }
    }

    const handleDelete = (id: number) => {
        setShowConfirm(true)
        setDeleteId(id)
    }

    const confirmDelete = () => {
        if (deleteId !== null) {
            setEmployees(employees.filter((e) => e.id !== deleteId))
            if (editingId === deleteId) {
                setEditingId(null)
                setForm({})
            }
        }
        setShowConfirm(false)
        setDeleteId(null)
        toast.success('Employee deleted successfully!')
    }

    const cancelDelete = () => {
        setShowConfirm(false)
        setDeleteId(null)
    }

    const openAddForm = () => {
        setForm({})
        setEditingId(null)
        setErrors({})
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditingId(null)
        setForm({})
        setErrors({})
    }

    return (
        <div className='flex w-full h-screen'>
            <div className='m-auto max-w-5xl md:max-w-7xl min-w-5xl px-10 py-6 shadow-sm border border-gray-200 rounded-xl'>
                <div className='mb-6'>
                    <h1 className='text-[27px] font-bold'>Employee Management</h1>
                    <p className='text-[#737373] font-normal text-[15px]'>
                        Employee information management system with full CRUD functionality
                    </p>
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <p className='text-sm text-gray-500 px-3 py-2 bg-[#f5f5f5] rounded-lg'>
                        Total Employees: <span className='font-medium text-black'>{employees.length}</span>
                    </p>
                    <Button variant='default' onClick={openAddForm}>
                        <Plus className='w-4 h-4' /> <span>Add Employee</span>
                    </Button>
                </div>

                <EmployeeTable
                    employees={employees}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    newEmployeeId={newEmployeeId}
                    setNewEmployeeId={setNewEmployeeId}
                />

                {showForm && (
                    <FormDialog
                        showForm={showForm}
                        editingId={editingId}
                        form={form}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        closeForm={closeForm}
                    />
                )}

                {showConfirm && (
                    <ConfirmDialog
                        show={showConfirm}
                        title='Are you sure?'
                        message='You will not be able to recover this employee!'
                        confirmText='Yes, delete it!'
                        cancelText='Cancel'
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                    />
                )}
            </div>
        </div>
    )
}
