import { createContext, useContext } from "react"
import { useQuery } from '@tanstack/react-query'
import api from "../services/Api"
import { AuthContextType } from "../types/Auth"

const AuthContext = createContext<AuthContextType | null>(null)

const fetchUserData = async () => {
    try {
        const { data } = await api.get("/auth");
        return data;
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['User'],
        queryFn: fetchUserData,
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1
    })

    return (
        <AuthContext.Provider value={{ user: data?.user || '', isLoading, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType
}