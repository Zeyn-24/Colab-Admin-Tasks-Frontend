import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="bg-indigo-600 text-white sticky w-full p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Administrador de Tareas</h1>
                <div className="flex gap-x-4">
                    <Link to='/dashboard' className="bg-indigo-500 hover:bg-indigo-700 transition-colors duration-300 text-white font-semibold py-2 px-4 rounded">Panel de control</Link>
                    <Link to='/tasks' className="bg-indigo-500 hover:bg-indigo-700 transition-colors duration-300 text-white font-semibold py-2 px-4 rounded">Tareas</Link>
                    <Link to='/create-task' className="bg-indigo-500 hover:bg-indigo-700 transition-colors duration-300 text-white font-semibold py-2 px-4 rounded">Crear Tarea</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar