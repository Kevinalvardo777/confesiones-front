import { z } from 'zod'

export const createReportSchema = z.object({
  reason: z.string().min(3, 'Selecciona o escribe una razon clara.').max(50, 'La razon es demasiado larga.'),
  details: z.string().min(10, 'Agrega un poco mas de contexto.').max(280, 'El detalle no puede superar 280 caracteres.'),
})
