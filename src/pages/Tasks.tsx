import { useTasks } from "../hooks/useTasks";
import { TTask } from "../types/Tasks";

function Tasks() {
    const { tasks, isLoading, error } = useTasks()

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="container mx-auto p-4">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl text-primary font-semibold mb-4">Mis Tareas</h2>
                    <div>
                        {error ? (
                            <p className="text-md text-alert-error-dark text-center">{(error as { message?: string})?.message}</p>
                        ) : isLoading ? (
                            <p className="text-lg text-secondary-light text-center">Cargando Tareas...</p>
                        ) : (
                            <ul className="divide-y divide-gray-200 flex flex-col gap-y-2">
                                {tasks?.map((task: TTask) => (
                                    <li key={task.id} className="flex justify-between items-center p-4 border border-secondary rounded-lg">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-light">{task.title}</h3>
                                            <p className="text-gray-600 tex.lg">{task.description}</p>
                                        </div>
                                        <div>
                                            <p className={`text-lg ${task.status === 'pending' ? 'text-alert-error-dark' : task.status === 'in_progress' ? 'text-amber-700' : 'text-alert-success'}`}>
                                                {task.status}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 text-white py-1 px-3 rounded">
                                                Editar
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white py-1 px-3 rounded">
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                                {tasks?.length === 0 && (
                                    <li className="py-4 text-center text-gray-500">
                                        No tienes tareas creadas.
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Tasks