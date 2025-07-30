import { useTree } from '../../../contexts/tree-context'

export function useExportTree(filenamePrefix = 'loan-tree') {
  const { exportTree } = useTree()

  const handleExport = () => {
    const jsonData = exportTree()
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filenamePrefix}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return handleExport
}
