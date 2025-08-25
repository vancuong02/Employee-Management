import { Link } from 'react-router'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Home' }, { name: 'description', content: 'Welcome to home page!' }]
}

export default function Home() {
    return (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            {/* Header */}
            <header className='bg-white shadow'>
                <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
                    <h1 className='text-2xl font-bold text-indigo-600'>Management System</h1>
                    <nav className='space-x-6'>
                        <Link to='/' className='text-gray-700 hover:text-indigo-600'>
                            Home
                        </Link>
                        <Link to='/about' className='text-gray-700 hover:text-indigo-600'>
                            About
                        </Link>
                        <Link to='/contact' className='text-gray-700 hover:text-indigo-600'>
                            Contact
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <main className='flex-1 max-w-7xl mx-auto px-4 py-10'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-6'>Management Functions</h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* Employee Management */}
                    <Link
                        to='/management-employee'
                        className='bg-white shadow rounded-xl p-6 hover:shadow-lg transition'
                    >
                        <h3 className='text-lg font-semibold mb-2 text-indigo-600'>Employee Management</h3>
                        <p className='text-gray-600'>Add, update, delete and manage employee list.</p>
                    </Link>

                    {/* Product Management */}
                    <div className='bg-white shadow rounded-xl p-6 hover:shadow-lg transition cursor-pointer'>
                        <h3 className='text-lg font-semibold mb-2 text-indigo-600'>Product Management</h3>
                        <p className='text-gray-600'>Monitor and update the product catalog.</p>
                    </div>

                    {/* Order Management */}
                    <div className='bg-white shadow rounded-xl p-6 hover:shadow-lg transition cursor-pointer'>
                        <h3 className='text-lg font-semibold mb-2 text-indigo-600'>Order Management</h3>
                        <p className='text-gray-600'>Check and process customer orders.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className='bg-gray-100 py-4 text-center text-gray-600'>
                © {new Date().getFullYear()} Management System. All rights reserved.
            </footer>
        </div>
    )
}
