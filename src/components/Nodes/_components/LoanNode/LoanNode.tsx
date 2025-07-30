import { BaseNode } from '../BaseNode/BaseNode'
import { LoanNodeProps, loanConfig } from '../../config/node-configs'

export function LoanNode({ data }: LoanNodeProps) {
  return <BaseNode data={data} config={loanConfig} />
}
