import type React from 'react'
import { createContext, useContext, useState, useCallback } from 'react'
import type { Node, Edge } from '@xyflow/react'
import { nanoid } from 'nanoid'

export type NodeType = 'account' | 'loan' | 'collateral'

export interface TreeNode {
  id: string
  type: NodeType
  label: string
  parentId?: string
  createdAt: Date
}

interface TreeContextType {
  nodes: Node[]
  edges: Edge[]
  selectedNode: TreeNode | null
  setSelectedNode: (node: TreeNode | null) => void
  addNode: (type: NodeType, parentId?: string) => void
  deleteNode: (nodeId: string) => void
  exportTree: () => string
  getValidChildTypes: (nodeType: NodeType) => NodeType[]
  canAddAtRoot: (nodeType: NodeType) => boolean
  showTreeView: boolean
  setShowTreeView: (show: boolean) => void
  getTreeStructure: () => TreeNode[]
}

const TreeContext = createContext<TreeContextType | undefined>(undefined)

const NODE_TYPE_RULES: Record<NodeType, NodeType[]> = {
  account: ['loan', 'collateral'],
  loan: ['collateral'],
  collateral: [],
}

const ROOT_ALLOWED_TYPES: NodeType[] = ['account', 'loan']

export function TreeProvider({ children }: { children: React.ReactNode }) {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([])
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [showTreeView, setShowTreeView] = useState(false)

  const getValidChildTypes = useCallback((nodeType: NodeType): NodeType[] => {
    return NODE_TYPE_RULES[nodeType] || []
  }, [])

  const canAddAtRoot = useCallback((nodeType: NodeType): boolean => {
    return ROOT_ALLOWED_TYPES.includes(nodeType)
  }, [])

  const buildReactFlowNodes = useCallback((treeNodes: TreeNode[]): Node[] => {
    return treeNodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: {
        ...node,
        onSelect: () => setSelectedNode(node),
      },
      position: { x: 0, y: 0 }, // Will be overridden by auto-layout
    }))
  }, [])

  const buildReactFlowEdges = useCallback((treeNodes: TreeNode[]): Edge[] => {
    return treeNodes
      .filter((node) => node.parentId)
      .map((node) => ({
        id: `${node.parentId}-${node.id}`,
        source: node.parentId!,
        target: node.id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#64748b', strokeWidth: 2 },
      }))
  }, [])

  const addNode = useCallback((type: NodeType, parentId?: string) => {
    const newNode: TreeNode = {
      id: nanoid(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nanoid(4)}`,
      parentId,
      createdAt: new Date(),
    }

    setTreeNodes((prev) => [...prev, newNode])
  }, [])

  const deleteNode = useCallback(
    (nodeId: string) => {
      setTreeNodes((prev) => {
        // Find all descendants recursively
        const findDescendants = (id: string): string[] => {
          const children = prev.filter((node) => node.parentId === id)
          const descendants = children.map((child) => child.id)
          children.forEach((child) => {
            descendants.push(...findDescendants(child.id))
          })
          return descendants
        }

        const toDelete = [nodeId, ...findDescendants(nodeId)]
        return prev.filter((node) => !toDelete.includes(node.id))
      })

      if (selectedNode?.id === nodeId) {
        setSelectedNode(null)
      }
    },
    [selectedNode]
  )

  const exportTree = useCallback(() => {
    const treeStructure = {
      nodes: treeNodes,
      exportedAt: new Date().toISOString(),
      totalNodes: treeNodes.length,
    }
    return JSON.stringify(treeStructure, null, 2)
  }, [treeNodes])

  const getTreeStructure = useCallback((): TreeNode[] => {
    return treeNodes
  }, [treeNodes])

  const nodes = buildReactFlowNodes(treeNodes)
  const edges = buildReactFlowEdges(treeNodes)

  return (
    <TreeContext.Provider
      value={{
        nodes,
        edges,
        selectedNode,
        setSelectedNode,
        addNode,
        deleteNode,
        exportTree,
        getValidChildTypes,
        canAddAtRoot,
        showTreeView,
        setShowTreeView,
        getTreeStructure,
      }}
    >
      {children}
    </TreeContext.Provider>
  )
}

export function useTree() {
  const context = useContext(TreeContext)
  if (context === undefined) {
    throw new Error('useTree must be used within a TreeProvider')
  }
  return context
}
