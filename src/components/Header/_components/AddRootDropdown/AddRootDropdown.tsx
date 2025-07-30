import { Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { Button } from '../../../Button/Button'
import { useTree } from '../../../../contexts/tree-context'

export function AddRootDropdown() {
  const { addNode, canAddAtRoot } = useTree()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Root Node
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="mt-2 w-40 rounded-md bg-white shadow-lg border border-gray-200 p-1"
      >
        <DropdownMenuItem
          onClick={() => addNode('account')}
          disabled={!canAddAtRoot('account')}
          className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
        >
          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2" />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => addNode('loan')}
          disabled={!canAddAtRoot('loan')}
          className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
          Loan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
