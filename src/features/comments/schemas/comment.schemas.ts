import { z } from 'zod'

export const createCommentSchema = z.object({
  authorName: z.string().max(40, 'El nombre no puede superar 40 caracteres.').optional(),
  content: z.string().min(4, 'Escribe al menos 4 caracteres.').max(280, 'El comentario no puede superar 280 caracteres.'),
})
