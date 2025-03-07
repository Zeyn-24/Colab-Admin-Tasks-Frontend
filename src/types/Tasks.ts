import z from 'zod'

// Definición del esquema de validación con Zod
export const createTaskSchema = z.object({
    title: z.string().min(1, { message: "El título es requerido" }),
    description: z.string().min(1, { message: "La descripción es requerida" }),
    assignedTo: z.string().nonempty({ message: "Debes seleccionar un usuario" }),
});

// Inferencia del tipo del formulario a partir del esquema
export type TCreateTask = z.infer<typeof createTaskSchema>;

export interface TTask extends TCreateTask {
    id: string,
    status: 'pending' | 'in_progress' | 'completed'
}