import { Building2, Users, CreditCard, DollarSign, Shield, Star } from 'lucide-react'
import type { NodeType } from '../../../contexts/tree-context'
import type { LucideIcon } from 'lucide-react'

//types
export interface BaseNodeProps {
  data: {
    id: string
    label: string
    type: NodeType
    onSelect: () => void
  }
  config: {
    icon: LucideIcon
    secondaryIcon: LucideIcon
    colors: {
      gradient: string
      border: string
      iconBg: string
      secondaryIcon: string
      badge: string
    }
  }
}
export interface NodeConfig {
  icon: LucideIcon
  secondaryIcon: LucideIcon
  colors: {
    gradient: string
    border: string
    iconBg: string
    secondaryIcon: string
    badge: string
  }
}

export interface AccountNodeProps {
  data: {
    id: string
    label: string
    type: NodeType
    onSelect: () => void
  }
}

export interface CollateralNodeProps {
  data: {
    id: string
    label: string
    type: NodeType
    onSelect: () => void
  }
}

export interface LoanNodeProps {
  data: {
    id: string
    label: string
    type: NodeType
    onSelect: () => void
  }
}

// Configs
export const accountConfig = {
  icon: Building2,
  secondaryIcon: Users,
  colors: {
    gradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-500',
    secondaryIcon: 'text-emerald-600',
    badge: 'text-emerald-700',
  },
}

export const collateralConfig = {
  icon: Shield,
  secondaryIcon: Star,
  colors: {
    gradient: 'bg-gradient-to-br from-amber-50 to-amber-100',
    border: 'border-amber-200',
    iconBg: 'bg-amber-500',
    secondaryIcon: 'text-amber-600',
    badge: 'text-amber-700',
  },
}

export const loanConfig = {
  icon: CreditCard,
  secondaryIcon: DollarSign,
  colors: {
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    iconBg: 'bg-blue-500',
    secondaryIcon: 'text-blue-600',
    badge: 'text-blue-700',
  },
}

export const NODE_CONFIGS: Record<NodeType, NodeConfig> = {
  account: {
    icon: Building2,
    secondaryIcon: Users,
    colors: {
      gradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-500',
      secondaryIcon: 'text-emerald-600',
      badge: 'text-emerald-700',
    },
  },
  loan: {
    icon: CreditCard,
    secondaryIcon: DollarSign,
    colors: {
      gradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      iconBg: 'bg-blue-500',
      secondaryIcon: 'text-blue-600',
      badge: 'text-blue-700',
    },
  },
  collateral: {
    icon: Shield,
    secondaryIcon: Star,
    colors: {
      gradient: 'bg-gradient-to-br from-amber-50 to-amber-100',
      border: 'border-amber-200',
      iconBg: 'bg-amber-500',
      secondaryIcon: 'text-amber-600',
      badge: 'text-amber-700',
    },
  },
}
