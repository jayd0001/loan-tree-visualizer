import { BaseNode } from '../BaseNode/BaseNode'
import { AccountNodeProps, accountConfig } from '../../config/node-configs'

export function AccountNode({ data }: AccountNodeProps) {
  return <BaseNode data={data} config={accountConfig} />
}
