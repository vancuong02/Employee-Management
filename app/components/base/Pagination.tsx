import { Fragment } from 'react/jsx-runtime'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from './Button'

interface PaginationProps {
    currentPage: number
    totalPages: number
    limit: number
    onPageChange: (page: number) => void
    onLimitChange: (limit: number) => void
}

export function Pagination({ currentPage, totalPages, limit, onPageChange, onLimitChange }: PaginationProps) {
    const getVisiblePages = () => {
        if (totalPages <= 4) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        const pages: (number | string)[] = []

        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, '...', totalPages)
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
        } else {
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
        }

        return pages
    }

    const visiblePages = getVisiblePages()

    return (
        <div className='flex items-center gap-4'>
            {/* Chọn limit */}
            <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600'>Rows per page:</span>
                <select
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className='border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    {[5, 10, 20, 50].map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex items-center gap-1'>
                {/* Nút First */}
                <Button variant='outline' size='sm' onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                    <ChevronsLeft className='w-4 h-4' />
                </Button>
                {/* Nút Prev */}
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className='w-4 h-4' />
                </Button>
            </div>

            {/* Các số trang */}
            <div className='flex items-center gap-1'>
                {visiblePages.map((page, index) => (
                    <Fragment key={index}>
                        {page === '...' ? (
                            <span className='px-2 py-1 text-sm text-gray-500'>...</span>
                        ) : (
                            <Button
                                variant={currentPage === page ? 'default' : 'outline'}
                                size='sm'
                                onClick={() => onPageChange(page as number)}
                                className='w-8 h-8 p-0'
                            >
                                {page}
                            </Button>
                        )}
                    </Fragment>
                ))}
            </div>

            <div className='flex items-center gap-1'>
                {/* Nút Next */}
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className='w-4 h-4' />
                </Button>

                {/* Nút Last */}
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronsRight className='w-4 h-4' />
                </Button>
            </div>
        </div>
    )
}
