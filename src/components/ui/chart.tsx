"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

interface LinearProgressProps {
  label: string
  value: number
  max?: number
  color?: string
  showValue?: boolean
  className?: string
}

export function LinearProgress({
  label,
  value,
  max = 100,
  color = "hsl(var(--primary))",
  showValue = true,
  className,
}: LinearProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        {showValue && <span className="text-muted-foreground">{Math.round(percentage)}%</span>}
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        />
      </div>
    </div>
  )
}

interface PieChartProps {
  data: { name: string; value: number; color: string }[]
  size?: number
  showLegend?: boolean
  className?: string
}

export function SkillPieChart({ data, size = 200, showLegend = false, className }: PieChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-muted-foreground">{payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
          >
            {data.map((s, i) => <Cell key={`cell-${i}`} fill={s.color} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {showLegend && (
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface BarChartProps {
  data: { name: string; value: number; color: string }[]
  height?: number
  className?: string
}

export function SkillBarChart({ data, height = 300, className }: BarChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Proficiency" fill="#3b82f6" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface RadialProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  showValue?: boolean
  className?: string
}

export function RadialProgress({ 
  value, 
  size = 80, 
  strokeWidth = 8, 
  color = "hsl(var(--primary))", 
  showValue = true,
  className 
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showValue && (
        <div className="mt-2 text-center">
          <span className="text-2xl font-bold">{value}%</span>
        </div>
      )}
    </div>
  )
}