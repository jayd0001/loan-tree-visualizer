import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { FlowComponent } from './_components/FlowComponent/FlowComponent'

export function TreeVisualizer() {
  return (
    <ReactFlowProvider>
      <FlowComponent />
    </ReactFlowProvider>
  )
}
