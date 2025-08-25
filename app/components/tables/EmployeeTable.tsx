import React, { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Trash2, UserX } from 'lucide-react'

import Tooltip from '../base/Tooltip'
import type { Employee } from '~/types'
import { Pagination } from '../base/Pagination'

type TProps = {
    employees: Employee[]
    handleEdit: (id: number) => void
    handleDelete: (id: number) => void
    newEmployeeId?: number | null
    setNewEmployeeId: (id: number | null) => void
}

const DEFAULT_LIMIT = 5
const EmployeeTable: React.FC<TProps> = ({ employees, handleEdit, handleDelete, newEmployeeId, setNewEmployeeId }) => {
    // Đọc query param từ URL
    const params = new URLSearchParams(window.location.search)
    const initialPage = parseInt(params.get('page') || '1', 10)
    const initialLimit = parseInt(params.get('limit') || String(DEFAULT_LIMIT), 10)

    const [currentPage, setCurrentPage] = useState(initialPage)
    const [limit, setLimit] = useState(initialLimit)
    const [sortAsc, setSortAsc] = useState(true)
    const [sortBy, setSortBy] = useState<'name' | 'address' | null>(null)

    const handleSort = (field: 'name' | 'address') => {
        if (sortBy === field) {
            setSortAsc(!sortAsc)
        } else {
            setSortBy(field)
            setSortAsc(true)
        }
    }

    const sortedEmployees = [...employees].sort((a, b) => {
        if (!sortBy) return 0
        const valA = a[sortBy].toLowerCase()
        const valB = b[sortBy].toLowerCase()

        if (valA < valB) return sortAsc ? -1 : 1
        if (valA > valB) return sortAsc ? 1 : -1
        return 0
    })

    // Pagination
    const totalPages = Math.ceil(sortedEmployees.length / limit)
    const startIndex = (currentPage - 1) * limit
    const currentItems = sortedEmployees.slice(startIndex, startIndex + limit)

    const updateUrl = (page: number, limit: number) => {
        const newParams = new URLSearchParams(window.location.search)
        newParams.set('page', String(page))
        newParams.set('limit', String(limit))
        window.history.pushState({}, '', `?${newParams.toString()}`)
    }

    const onPageChange = (page: number) => {
        setNewEmployeeId(null)
        setCurrentPage(page)
        updateUrl(page, limit)
    }

    const onLimitChange = (newLimit: number) => {
        setLimit(newLimit)
        setCurrentPage(1)
        updateUrl(1, newLimit)
    }

    // Tự động chuyển đến page chứa nó nếu cần
    useEffect(() => {
        if (!newEmployeeId) return
        const idx = sortedEmployees.findIndex((emp) => emp.id === newEmployeeId)
        if (idx === -1) return
        const page = Math.floor(idx / DEFAULT_LIMIT) + 1
        if (page !== currentPage) setCurrentPage(page)
    }, [newEmployeeId, sortedEmployees, currentPage])

    return (
        <div className='flex flex-col gap-4'>
            {employees.length > 0 ? (
                <div className=' overflow-x-auto overflow-y-scroll max-h-[500px] rounded-xl border border-[#e5e5e5] bg-white'>
                    <table className='min-w-full divide-y divide-[#e5e5e5]'>
                        <thead>
                            <tr className='bg-[#f9f9f9]'>
                                <th className='px-4 py-3 text-left font-medium'>No</th>
                                <th className='px-4 py-3 text-left font-medium'>ID</th>
                                <th
                                    className='px-4 py-3 text-left font-semibold cursor-pointer select-none hover:text-blue-900'
                                    onClick={() => handleSort('name')}
                                >
                                    Name{' '}
                                    {sortBy === 'name' ? (
                                        sortAsc ? (
                                            <ArrowUp className='inline w-4 h-4' />
                                        ) : (
                                            <ArrowDown className='inline w-4 h-4' />
                                        )
                                    ) : (
                                        <ArrowUpDown className='inline w-4 h-4 text-gray-400' />
                                    )}
                                </th>
                                <th className='px-4 py-3 text-left font-medium'>Date of Birth</th>
                                <th className='px-4 py-3 text-left font-medium'>Gender</th>
                                <th className='px-4 py-3 text-left font-medium'>Email</th>
                                <th
                                    className='px-4 py-3 text-left font-semibold cursor-pointer select-none hover:text-blue-900'
                                    onClick={() => handleSort('address')}
                                >
                                    Address{' '}
                                    {sortBy === 'address' ? (
                                        sortAsc ? (
                                            <ArrowUp className='inline w-4 h-4' />
                                        ) : (
                                            <ArrowDown className='inline w-4 h-4' />
                                        )
                                    ) : (
                                        <ArrowUpDown className='inline w-4 h-4 text-gray-400' />
                                    )}
                                </th>
                                <th className='px-4 py-3 text-left font-medium'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-[15px]'>
                            {currentItems.map((emp, idx) => (
                                <tr
                                    key={emp.id}
                                    className={`hover:bg-[#f9f9f9] ${currentItems.length - 1 !== idx ? 'border-b border-[#e5e5e5]' : ''}`}
                                >
                                    <td className='px-4 py-3 font-medium'>{startIndex + idx + 1}</td>
                                    <td className='px-4 py-3'>{emp.id}</td>
                                    <td className='px-4 py-3'>{emp.name}</td>
                                    <td className='px-4 py-3'>{emp.dob}</td>
                                    <td className='text-sm px-4 py-3'>
                                        <span
                                            className={`px-2 py-1 rounded-lg ${emp.gender === 'Male' ? 'bg-black text-white' : 'bg-[#f5f5f5]'}`}
                                        >
                                            {emp.gender}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3'>{emp.email}</td>
                                    <td className='px-4 py-3'>{emp.address}</td>
                                    <td className='px-4 py-3'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <Tooltip text='Edit'>
                                                <button
                                                    className='transition cursor-pointer p-2 rounded-md border border-gray-200 shadow'
                                                    onClick={() => handleEdit(emp.id)}
                                                >
                                                    <Edit className='w-4 h-4' />
                                                </button>
                                            </Tooltip>
                                            <Tooltip text='Delete'>
                                                <button
                                                    className='text-red-600 transition cursor-pointer p-2 rounded-md border border-gray-200 shadow'
                                                    onClick={() => handleDelete(emp.id)}
                                                >
                                                    <Trash2 className='w-4 h-4' />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {sortedEmployees.length === 0 && (
                                <tr>
                                    <td colSpan={7} className='text-center p-4 text-gray-500'>
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-12 text-gray-500 bg-white border border-[#e5e5e5] rounded-xl shadow'>
                    <UserX className='w-16 h-16 text-gray-400 mb-4' />
                    <p className='text-lg font-medium'>No employees found.</p>
                    <p className='text-sm'>
                        Click <span className='font-medium text-blue-600'>Add</span> to create your first employee.
                    </p>
                </div>
            )}

            <div className='flex justify-end'>
                <Pagination
                    limit={limit}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    onLimitChange={onLimitChange}
                />
            </div>
        </div>
    )
}

export default EmployeeTable
