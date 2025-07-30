import { cn } from '../../lib/utils'
import { badgeVariants } from './config'
import { BadgeProps } from './types/index'

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
