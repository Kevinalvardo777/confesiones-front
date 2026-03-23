import { forwardRef, type InputHTMLAttributes } from 'react'
import './Input.scss'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  return <input ref={ref} className="atom-input" {...props} />
})

export default Input
