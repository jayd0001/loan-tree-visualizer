import { Handle, Position } from '@xyflow/react'
import { Card } from '../../../Card/Card'
import { BaseNodeProps } from '../../config/node-configs'

export function BaseNode({ data, config }: BaseNodeProps) {
  const { icon: Icon, secondaryIcon: SecondaryIcon, colors } = config

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Card
        className={`w-48 p-4 ${colors.gradient} ${colors.border} hover:shadow-lg transition-all cursor-pointer group`}
        onClick={data.onSelect}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 ${colors.iconBg} rounded-lg group-hover:scale-110 transition-transform`}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <SecondaryIcon className={`w-3 h-3 ${colors.secondaryIcon}`} />
              <span className={`text-xs font-medium ${colors.badge} uppercase tracking-wide`}>
                {data.type}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-900 truncate">{data.label}</p>
          </div>
        </div>
      </Card>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </>
  )
}
