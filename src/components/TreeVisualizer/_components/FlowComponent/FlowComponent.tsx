import { useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  BackgroundVariant,
  Position,
  type Node,
  type Edge,
} from '@xyflow/react'
import { useTree } from '../../../../contexts/tree-context'
import { SidePanel } from '../../../SidePanel/SidePanel'
import { TreeStructureViewer } from '../../../TreeStructureViewer/TreeStructureViewer'
import { getLayoutedElements, nodeTypes } from '../../config'

export function FlowComponent() {
  const { nodes: treeNodes, edges: treeEdges, selectedNode, showTreeView } = useTree()
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  useEffect(() => {
    if (treeNodes.length > 0 || treeEdges.length > 0) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        treeNodes,
        treeEdges
      )
      setNodes(layoutedNodes)
      setEdges(layoutedEdges)
    } else {
      setNodes([])
      setEdges([])
    }
  }, [treeNodes, treeEdges, setNodes, setEdges])

  return (
    <div className="flex-1 flex">
      <div className="flex-1 relative">
        {showTreeView ? (
          <TreeStructureViewer />
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.1}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          >
            <Controls className="bg-white/80 backdrop-blur-sm border border-slate-200" />
            <MiniMap
              className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'account':
                    return '#10b981'
                  case 'loan':
                    return '#3b82f6'
                  case 'collateral':
                    return '#f59e0b'
                  default:
                    return '#64748b'
                }
              }}
            />
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
          </ReactFlow>
        )}
      </div>

      {selectedNode && <SidePanel />}
    </div>
  )
}
