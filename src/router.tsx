import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import StationsPage from './pages/StationsPage'
import DashboardPage from './pages/DashboardPage'
import FloorMapPage from './pages/FloorMapPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: 'stations',
        element: <StationsPage />,
        handle: {
          breadcrumb: 'Stations',
          title: 'Stations',
          subtitle: '6 stations · 1 fault',
        },
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        handle: {
          breadcrumb: 'Dashboard',
          title: 'Dashboard',
          subtitle: 'Utilisation & throughput',
        },
      },
      {
        path: 'floor-map',
        element: <FloorMapPage />,
        handle: {
          breadcrumb: 'Floor map',
          title: 'Floor map',
          subtitle: 'Live status',
        },
      },
      { path: 'jobs', element: <Navigate to="/stations" replace /> },
      { path: 'valves', element: <Navigate to="/stations" replace /> },
      { path: 'reports', element: <Navigate to="/stations" replace /> },
      { path: 'alerts', element: <Navigate to="/stations" replace /> },
      { path: 'settings', element: <Navigate to="/stations" replace /> },
    ],
  },
])
