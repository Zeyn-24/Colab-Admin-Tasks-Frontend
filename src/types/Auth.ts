export interface User {
    id: number,
    email: string,
    username: string
}

export type AuthContextType = {
    user?: User,
    isLoading: boolean,
    error?: Error | null
}