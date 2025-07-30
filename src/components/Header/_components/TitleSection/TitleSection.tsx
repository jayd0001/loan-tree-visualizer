import { TreePine } from 'lucide-react'

export function TitleSection() {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
        <TreePine className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-900">Loan Tree Visualizer</h1>
        <p className="text-sm text-slate-600">Manage hierarchical loan relationships</p>
      </div>
    </div>
  )
}
