import { forwardRef, type TextareaHTMLAttributes } from 'react'
import './Textarea.scss'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  props,
  ref,
) {
  return <textarea ref={ref} className="atom-textarea" {...props} />
})

export default Textarea
