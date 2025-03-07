import { useAuth } from '../context/AuthContext'
import api from '../services/Api'
import { QueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const { user } = useAuth()
    const queryClient = new QueryClient()

    const handleLogOut = async () => {
        try {
            const response = await api.post('/auth/logout')
            queryClient.invalidateQueries({ queryKey: ['User'] })
            toast.success(response.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
            <h1 className='text-3xl text-primary'><strong>Welcum:</strong> {user?.username}</h1>
            <button onClick={() => handleLogOut()} className='py-2 px-4 rounded-lg text-2xl text-primary-light hover:text-primary border border-secondary-dark bg-primary-muted cursor-pointer'>Log Out</button>
        </div>
    )
}

export default Dashboard