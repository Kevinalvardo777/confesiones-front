import { z } from 'zod'

export const createConfessionSchema = z.object({
  alias: z.string().max(40, 'El alias no puede superar 40 caracteres.').optional(),
  content: z
    .string()
    .min(12, 'La confesion debe tener al menos 12 caracteres.')
    .max(600, 'La confesion no puede superar 600 caracteres.'),
})
