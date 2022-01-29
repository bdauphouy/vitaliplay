import { useEffect, useRef } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const data = []
for (let i = 0; i < 20; i++) {
  data.push({
    id: i,
    date: '23/09/21',
    score: Math.round(Math.random() * 40 + 70),
  })
}

const CheckupChart = () => {
  const tooltip = useRef()

  useEffect(() => {
    console.log(tooltip)
  }, [tooltip])

  return (
    <ResponsiveContainer width="100%" height={550}>
      <AreaChart data={data} margin={{ right: 0, left: -60, top: 30 }}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="30%" stopColor="#1778F2" stopOpacity={1} />
            <stop offset="90%" stopColor="#1778F2" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="score"
          stroke="#1778F2"
          strokeWidth="2"
          fill="url(#color)"
        />
        <XAxis dataKey="date" tick={false} />
        <YAxis dataKey="score" tick={false} />

        <Tooltip
          allowEscapeViewBox={{ x: true, y: true }}
          wrapperStyle={{ top: -148, left: -91 }}
          content={<CustomTooltip />}
          cursor={false}
        />

        <CartesianGrid />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const a = '-translate-x-[96px] -translate-y-[148px]'

export const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="tooltip-triangle flex transform flex-col items-center rounded bg-blue-900 px-14 pt-2 pb-3 text-center">
        <h4 className="font-body text-sm text-light-100">{label}</h4>
        <span className="font-head text-4xl font-semibold text-light-100">
          {payload[0].value}
        </span>
      </div>
    )
  }
  return null
}

export default CheckupChart
