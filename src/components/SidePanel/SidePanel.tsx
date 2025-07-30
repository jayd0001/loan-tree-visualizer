import { X, Plus, Trash2, Calendar, Hash } from 'lucide-react'
import { useTree } from '../../contexts/tree-context'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../Card/Card'
import { NODE_CONFIGS } from '../Nodes/config/node-configs'
import { Separator } from '@radix-ui/react-dropdown-menu'

export function SidePanel() {
  const { selectedNode, setSelectedNode, addNode, deleteNode, getValidChildTypes } = useTree()

  if (!selectedNode) return null

  const validChildTypes = getValidChildTypes(selectedNode.type)
  const nodeConfig = NODE_CONFIGS[selectedNode.type]
  const IconComponent = nodeConfig.icon

  return (
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Node Details</h2>
          <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${nodeConfig.colors.iconBg} rounded-lg`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">{selectedNode.label}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Hash className="w-4 h-4" />
              <span className="font-mono">{selectedNode.id}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>{selectedNode.createdAt.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        {/* Add Child Nodes */}

        {validChildTypes.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Child Node
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {validChildTypes.map((childType) => {
                const childConfig = NODE_CONFIGS[childType]
                const ChildIcon = childConfig.icon
                return (
                  <Button
                    key={childType}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => addNode(childType, selectedNode.id)}
                  >
                    <div
                      className={`w-4 h-4 ${childConfig.colors.iconBg} rounded mr-2 flex items-center justify-center`}
                    >
                      <ChildIcon className="w-2.5 h-2.5 text-white" />
                    </div>
                    Add {childType.charAt(0).toUpperCase() + childType.slice(1)}
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        )}

        <Separator />
        {/* Delete nodes */}
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-red-700 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-3">
              Deleting this node will also remove all its descendants. This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                deleteNode(selectedNode.id)
                setSelectedNode(null)
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Node
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
