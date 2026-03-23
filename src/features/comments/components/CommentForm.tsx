import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import type { z } from 'zod'
import Input from '@/components/atoms/Input/Input'
import Textarea from '@/components/atoms/Textarea/Textarea'
import FormField from '@/components/molecules/FormField/FormField'
import { createCommentSchema } from '@/features/comments/schemas/comment.schemas'
import Button from '@/shared/components/ui/Button'
import './comments.scss'

type CommentFormValues = z.infer<typeof createCommentSchema>

interface CommentFormProps {
  isSubmitting: boolean
  onSubmit: (values: CommentFormValues) => Promise<void>
}

function CommentForm({ isSubmitting, onSubmit }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      authorName: '',
      content: '',
    },
  })

  const contentValue = useWatch({
    control,
    name: 'content',
    defaultValue: '',
  })

  return (
    <form
      className="comments-form surface-panel"
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values)
        reset()
      })}
    >
      <h3>Comentar</h3>
      <FormField id="comment-author" label="Nombre o alias" error={errors.authorName?.message}>
        <Input id="comment-author" maxLength={40} {...register('authorName')} />
      </FormField>
      <FormField
        id="comment-content"
        label="Comentario"
        footer={<p className="molecule-field__hint">{contentValue.length} / 280 caracteres</p>}
        error={errors.content?.message}
      >
        <Textarea id="comment-content" rows={4} maxLength={280} {...register('content')} />
      </FormField>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Publicar comentario'}
      </Button>
    </form>
  )
}

export default CommentForm
