import * as React from 'react'
import { cn } from '../../lib/utils'
import { CardHeader } from './_components/CardHeader/CardHeader'
import { CardFooter } from './_components/CardFooter/CardFooter'
import { CardTitle } from './_components/CardTitle/CardTitle'
import { CardDescription } from './_components/CardDescription/CardDescription'
import { CardContent } from './_components/CardContent/CardContent'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
