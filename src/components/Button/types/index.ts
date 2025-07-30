import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from '../config'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
