import { type TreeNode } from '../../../contexts/tree-context'

export interface TreeNodeItemProps {
  node: TreeNode
  level: number
  isLast: boolean
  parentLines: boolean[]
  allNodes: TreeNode[]
}
