import { ChevronRight, ChevronDown } from 'lucide-react'

import { useState } from 'react'
import { Badge } from '../../../Badge/Badge'
import { useTree } from '../../../../contexts/tree-context'
import { NODE_CONFIGS } from '../../../Nodes/config/node-configs'
import { TreeNodeItemProps } from './../../types/index'

export function TreeNodeItem({ node, level, isLast, parentLines, allNodes }: TreeNodeItemProps) {
  const { selectedNode, setSelectedNode } = useTree()
  const [isExpanded, setIsExpanded] = useState(true)

  const nodeConfig = NODE_CONFIGS[node.type]
  const IconComponent = nodeConfig.icon

  // Get children for this node
  const children = allNodes.filter((n) => n.parentId === node.id)
  const hasChildren = children.length > 0

  const isSelected = selectedNode?.id === node.id

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${isSelected ? 'bg-blue-50 border border-blue-200' : ''}`}
        onClick={() => setSelectedNode(node)}
      >
        {/* Tree lines */}
        <div className="flex items-center">
          {parentLines.map((hasLine, index) => (
            <div key={index} className="w-6 flex justify-center">
              {hasLine && <div className="w-px h-6 bg-slate-300" />}
            </div>
          ))}
          {level > 0 && (
            <div className="w-6 h-6 flex items-center justify-center relative">
              <div className="absolute left-0 top-0 w-3 h-3 border-l border-b border-slate-300" />
              {!isLast && <div className="absolute left-0 top-3 w-px h-3 bg-slate-300" />}
            </div>
          )}
        </div>

        {/* Expand/collapse button */}
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-slate-600"
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        )}

        {!hasChildren && <div className="w-4" />}

        {/* Node content */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="p-1.5 bg-white rounded border">
            <IconComponent className={`w-3 h-3 ${nodeConfig.colors.secondaryIcon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-900 truncate">{node.label}</span>
              <Badge variant="secondary" className="text-xs">
                {node.type}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {children.map((child, index) => {
            const childIsLast = index === children.length - 1
            const newParentLines = [...parentLines, !isLast]

            return (
              <TreeNodeItem
                key={child.id}
                node={child}
                level={level + 1}
                isLast={childIsLast}
                parentLines={newParentLines}
                allNodes={allNodes}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
