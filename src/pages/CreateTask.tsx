import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, TCreateTask } from "../types/Tasks";
import { useUsers } from "../hooks/useUsers";
import { User } from "../types/Auth";
import { useState } from "react";
import api from "../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

function CreateTask() {
    const { users } = useUsers()
    const [statusError, setStatusErrors] = useState<string|null>(null)
    const navigate = useNavigate()
    const queryClient = new QueryClient()
    // Configuración del useForm con el resolver de zod
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError
    } = useForm<TCreateTask>({
        resolver: zodResolver(createTaskSchema),
    });

    // Función que se ejecuta al enviar el formulario
    const onSubmit = async (data: TCreateTask) => {
        setStatusErrors(null)

        api.post('/tasks', {
            title: data.title,
            description: data.description,
            assigned_to: data.assignedTo
        }).then(response => {
            toast.success(`${response.data.message}!`)
            queryClient.invalidateQueries({ queryKey: ['Tasks'] });
            reset()
            navigate('/tasks')
        }).catch(error => {
            const { status, data } = error.response;
            if (status === 422) {
                data.errors.forEach((err: { field: string, message: string }) => {
                    setError(err.field as keyof TCreateTask, {
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
        })
    };

    return (
        <main className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-4xl text-center text-primary font-semibold mb-4">
                    Crear Tarea
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Título de la tarea */}
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-xl font-medium text-text-light mb-1"
                        >
                            Título
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Ingrese el título"
                            {...register("title")}
                            className="text-text-light w-full border border-secondary-light rounded px-3 py-2 focus:outline-none focus:border-primary placeholder:text-gray-400"
                        />
                        {errors.title && (
                            <p className="text-alert-error-light text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Descripción de la tarea */}
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-xl font-medium text-text-light mb-1"
                        >
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            placeholder="Ingrese la descripción"
                            {...register("description")}
                            className="text-text-light w-full border border-secondary-light rounded px-3 py-2 focus:outline-none focus:border-primary placeholder:text-gray-400"
                        />
                        {errors.description && (
                            <p className="text-alert-error-light text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Selección de usuario para asignar la tarea */}
                    <div className="mb-4">
                        <label
                            htmlFor="assignedTo"
                            className="block text-xl font-medium text-text-light mb-1"
                        >
                            Asignar a
                        </label>
                        <select
                            id="assignedTo"
                            {...register("assignedTo")}
                            className="text-text-light w-full border border-secondary-light rounded px-3 py-2 focus:outline-none focus:border-primary"
                        >
                            <option value="">Selecciona un usuario</option>
                            {users?.map((user: User) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                        {errors.assignedTo && (
                            <p className="text-alert-error-light text-sm mt-1">
                                {errors.assignedTo.message}
                            </p>
                        )}
                    </div>
                    {statusError && <p className="text-alert-error-dark text-lg my-2">{statusError}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-light text-white py-2 rounded-md font-semibold transition-colors duration-300 cursor-pointer"
                    >
                        {isSubmitting ? "Creando..." : "Crear Tarea"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default CreateTask;