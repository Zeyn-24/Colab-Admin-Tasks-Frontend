import axios from "axios";
const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

const api = axios.create({
    baseURL: `${VITE_BACKEND_API_URL}/api`, // Cambia según tu backend
    headers: { "Content-Type": "application/json" }
});

api.defaults.withCredentials = true

// Interceptor para adjuntar el token solo si el usuario está autenticado


// Interceptor para manejar errores globales
api.interceptors.response.use(
    (response) => response, // Retorna la respuesta normal
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized, logging out...");
        }
        return Promise.reject(error);
    }
);

export default api;