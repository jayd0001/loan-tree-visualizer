import { Shield, Star } from 'lucide-react'
import type { NodeType } from '../../../../contexts/tree-context'
import { BaseNode } from '../BaseNode/BaseNode'
import { CollateralNodeProps, collateralConfig } from '../../config/node-configs'

export function CollateralNode({ data }: CollateralNodeProps) {
  return <BaseNode data={data} config={collateralConfig} />
}
