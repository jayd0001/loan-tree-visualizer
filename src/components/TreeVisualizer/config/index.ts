import { Position, type Node, type Edge } from '@xyflow/react'
import dagre from 'dagre'
import '@xyflow/react/dist/style.css'
import { AccountNode } from '../../Nodes/_components/AccountNode/AccountNode'
import { LoanNode } from '../../Nodes/_components/LoanNode/LoanNode'
import { CollateralNode } from '../../Nodes/_components/CollateralNode/CollateralNode'

export const nodeTypes = {
  account: AccountNode,
  loan: LoanNode,
  collateral: CollateralNode,
}

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = 'TB'
): { nodes: Node[]; edges: Edge[] } => {
  const nodeWidth = 200
  const nodeHeight = 80

  dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 100 })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes: Node[] = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
  })

  return { nodes: layoutedNodes, edges }
}
