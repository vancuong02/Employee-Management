import type { Route } from './+types/home'
import EmployeeManagement from '~/components/EmployeeManagement'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Employee Management' },
        { name: 'description', content: 'Employee information management system' }
    ]
}

export default function EmployeeManagementPage() {
    return <EmployeeManagement />
}
