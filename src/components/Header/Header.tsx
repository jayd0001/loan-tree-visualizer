import { AddRootDropdown } from './_components/AddRootDropdown/AddRootDropdown'
import { ExportButton } from './_components/TitleSection/ExportButton'
import { TitleSection } from './_components/TitleSection/TitleSection'
import { ViewToggleButton } from './_components/ViewToggleButton/ViewToggleButton'

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <TitleSection />
        <div className="flex items-center gap-3">
          <AddRootDropdown />
          <ViewToggleButton />
          <ExportButton />
        </div>
      </div>
    </header>
  )
}
