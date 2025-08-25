import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('management-employee', 'routes/management-employee.tsx')
] satisfies RouteConfig
