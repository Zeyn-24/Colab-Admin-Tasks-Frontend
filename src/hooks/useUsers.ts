import { useQuery } from "@tanstack/react-query"
import api from "../services/Api"

const fetchTasks = async () => {
    try {
        const { data } = await api.get('/users')
        return data
    } catch (error) {
        console.error('Error: ' + error)
        throw new Error(error as string)
    }
}

export const useUsers = () => {
    const {data: users, isLoading, error} = useQuery({
        queryKey: ['Usuarios'],
        queryFn: fetchTasks,
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1
    })

    return { users, isLoading, error}
}