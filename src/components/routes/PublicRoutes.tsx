import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../Spinner'

export const PublicRoutes = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner />
    }

    if (user) {
        return <Navigate to="/dashboard" />
    }

    return <Outlet />;
}