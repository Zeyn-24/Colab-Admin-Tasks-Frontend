import { useQuery } from "@tanstack/react-query"
import api from "../services/Api"

const fetchTasks = async () => {
    try {
        const { data } = await api.get('/tasks')
        return data
    } catch (error) {
        console.error('Error: ' + error)
        throw new Error(error as string)
    }
}

export const useTasks = () => {
    const {data: tasks, isLoading, error} = useQuery({
        queryKey: ['Tasks'],
        queryFn: fetchTasks,
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1
    })

    return { tasks, isLoading, error}
}