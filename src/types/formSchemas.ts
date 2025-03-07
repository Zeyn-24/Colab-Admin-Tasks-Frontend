import z from 'zod'

export const signUpSchema = z
    .object({
        username: z.string().nonempty('El nombre de usuario es requerido').min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
        email: z.string().nonempty('El email es requerido').email('El email no tiene un formato valido'),
        password: z.string().nonempty('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres').max(20, 'La contraseña debe tener hasta 20 caracteres'),
        confirmPassword: z.string().nonempty('Confirme la contraseña'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword']
    });

export type TSignUpSchema = z.infer<typeof signUpSchema>


export const logInSchema = z
    .object({
        email: z.string().nonempty('Ingrese el email').email('El formato del email no es valido'),
        password: z.string().nonempty('Ingrese la contraseña')
    });

export type TLogInSchema = z.infer<typeof logInSchema>