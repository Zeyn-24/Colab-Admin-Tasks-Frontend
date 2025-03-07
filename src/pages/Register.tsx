import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUpSchema } from '../types/formSchemas'
import { toast } from 'react-toastify'
import api from "../services/Api";

function Register() {
    const [statusError, setStatusErrors] = useState<string | null>(null)
    const {
        register,
        formState: { isSubmitting, errors },
        handleSubmit,
        reset,
        setError
    } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) })
    const navigate = useNavigate()

    const onSubmit = async (data: TSignUpSchema) => {
        setStatusErrors(null)

        await api.post('/auth/sign-up', {
            username: data.username,
            email: data.email,
            password: data.password
        }).then(response => {
            toast.success(response.data.message)
            reset()
            navigate('/')
        }).catch(error => {
            const { status, data } = error.response;
            if (status === 422) {
                data.errors.forEach((err: { field: string, message: string }) => {
                    setError(err.field as keyof TSignUpSchema, {
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
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-secondary p-4">
            <div className="bg-primary-muted p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-primary text-center mb-6">
                    Registro
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-secondary-light mb-1">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register('username')}
                            placeholder="Ingresa tu nombre de usuario"
                            className="w-full border border-secondary-light rounded px-3 py-2 focus:outline-none focus:border-primary"
                        />
                        {errors.username && <p className="text-alert-error-light text-sm">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-secondary-light mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
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
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block text-secondary-light mb-1"
                        >
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            {...register('confirmPassword')}
                            placeholder="Confirma tu contraseña"
                            className="w-full border border-secondary-light rounded px-3 py-2 focus:outline-none focus:border-primary"
                        />
                        {errors.confirmPassword && <p className="text-alert-error-light text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                    {statusError && <p className="text-alert-error-dark text-lg text-center">{statusError}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-light text-white py-2 rounded-md font-semibold transition-colors duration-300 cursor-pointer"
                    >
                        {isSubmitting ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                <p className="mt-4 text-center text-secondary">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/" className="text-primary hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register