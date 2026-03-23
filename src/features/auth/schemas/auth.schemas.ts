import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Ingresa un correo valido.'),
  password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres.'),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Tu nombre debe tener al menos 2 caracteres.').max(60, 'Nombre demasiado largo.'),
    email: z.string().email('Ingresa un correo valido.'),
    password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres.'),
    confirmPassword: z.string().min(8, 'Confirma tu contrasena.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Las contrasenas no coinciden.',
    path: ['confirmPassword'],
  })
