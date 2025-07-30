import { Building2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../Card/Card'
import { Badge } from '../Badge/Badge'
import { useTree } from '../../contexts/tree-context'
import { TreeNodeItem } from './_components/TreeNodeItem/TreeNodeItem'

export function TreeStructureViewer() {
  const { getTreeStructure } = useTree()
  const allNodes = getTreeStructure()
  const rootNodes = allNodes.filter((node) => !node.parentId)

  if (rootNodes.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 rounded">
              <Building2 className="w-4 h-4 text-slate-600" />
            </div>
            Tree Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-slate-50 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No nodes yet</h3>
            <p className="text-sm text-slate-600 mb-4">
              Add your first Account or Loan node to get started
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 rounded">
            <Building2 className="w-4 h-4 text-slate-600" />
          </div>
          Tree Structure
          <Badge variant="outline" className="ml-auto">
            {allNodes.length} nodes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
          {rootNodes.map((rootNode, index) => {
            const isLast = index === rootNodes.length - 1

            return (
              <TreeNodeItem
                key={rootNode.id}
                node={rootNode}
                level={0}
                isLast={isLast}
                parentLines={[]}
                allNodes={allNodes}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
