import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TLogInSchema, logInSchema } from '../types/formSchemas'
import api from "../services/Api"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"

function Login() {
    const [statusError, setStatusErrors] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        setError
    } = useForm<TLogInSchema>({ resolver: zodResolver(logInSchema) })
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const onSubmit = (data: TLogInSchema) => {
        setStatusErrors(null)
        setLoading(true)

        api.post('/auth/login', {
            email: data.email,
            password: data.password
        }).then(response => {
            toast.success(`${response.data.message}! Iniciando Sesion.`)
            reset()
            queryClient.invalidateQueries({ queryKey: ['User'] });
            setLoading(false)
            navigate('/dashboard')
        }).catch(error => {
            const { status, data } = error.response;
            if (status === 422) {
                data.errors.forEach((err: { field: string, message: string }) => {
                    setError(err.field as keyof TLogInSchema, {
                        type: "manual",
                        message: err.message
                    });
                });
            } else if (status === 400 || status === 409) {
                // Mostrar error de conflicto (email o username)
                setStatusErrors(data.error || data.message)
            } else if (status === 500) {
                // Error del servidor
                setStatusErrors(data.error || data.message)
            }
            toast.error('Something wrong!')
            setLoading(false)
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-secondary p-4">
            <div className="bg-primary-muted p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-primary text-center mb-6">
                    Iniciar Sesión
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-secondary-light mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="text"
                            id="email"
                            {...register('email')}
                            placeholder="Ingresa tu correo"
                            className="w-full border border-secondary-light rounded px-3 py-2 focus:outline-none focus:border-primary"
                        />
                        {errors.email && <p className="text-alert-error-light text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-secondary-light mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            placeholder="Ingresa tu contraseña"
                            className="w-full border border-secondary-light rounded px-3 py-2 focus:outline-none focus:border-primary"
                        />
                        {errors.password && <p className="text-alert-error-light text-sm">{errors.password.message}</p>}
                    </div>
                    {statusError && <p className="text-center text-alert-error-dark text-lg">{statusError}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-light text-white py-2 rounded-md font-semibold transition-colors duration-300 cursor-pointer"
                    >
                        {loading ? 'Iniciando Sesion...' : 'Iniciar Sesión'}
                    </button>
                </form>
                <p className="mt-4 text-center text-secondary">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-primary hover:underline">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login