import { List, Workflow } from 'lucide-react'
import { useTree } from '../../../../contexts/tree-context'

export function ViewToggleButton() {
  const { showTreeView, setShowTreeView } = useTree()

  return (
    <button
      onClick={() => setShowTreeView(!showTreeView)}
      className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
        showTreeView
          ? 'bg-black text-white hover:bg-gray-800'
          : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
      }`}
    >
      {showTreeView ? (
        <>
          <Workflow className="w-4 h-4 mr-2" />
          Flow View
        </>
      ) : (
        <>
          <List className="w-4 h-4 mr-2" />
          Tree View
        </>
      )}
    </button>
  )
}
