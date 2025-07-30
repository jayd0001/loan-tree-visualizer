import './index.css'
import { TreeProvider } from './contexts/tree-context'
import { TreeVisualizer } from './components/TreeVisualizer/TreeVisualizer'
import { Header } from './components/Header/Header'

function App() {
  return (
    <TreeProvider>
      <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <TreeVisualizer />
      </div>
    </TreeProvider>
  )
}

export default App
