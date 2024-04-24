import React from 'react'
import { useCurrentUser } from 'context/userContext'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { UserRole } from 'Interfaces/common'

const PrivateRoute = () => {
	const location = useLocation()
	const { currentUser } = useCurrentUser()

	if (location.pathname === '/auth' && currentUser?.token) {
		return <Navigate to="/" replace />
	}

	if (location.pathname.startsWith('/admin/') && currentUser?.role !== UserRole.Admin) {
		return <Navigate to="/unauthorized" replace />
	}

	return currentUser?.token ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />
}

export default PrivateRoute