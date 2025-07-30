import { Download } from 'lucide-react'
import { Button } from '../../../Button/Button'
import { useExportTree } from '../../_hooks'

export function ExportButton() {
  const handleExport = useExportTree()
  return (
    <Button variant="outline" onClick={handleExport}>
      <Download className="w-4 h-4 mr-2" />
      Export JSON
    </Button>
  )
}
