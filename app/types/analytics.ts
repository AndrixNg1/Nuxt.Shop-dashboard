export type AnalyticsPeriod = 'today' | '7d' | '30d' | 'year'

export interface AnalyticsSummary {
  revenue: string
  revenueGrowth: string
  orders: number
  ordersGrowth: string
  conversion: string
  conversionGrowth: string
  aov: string
  aovGrowth: string
}

export interface AnalyticsActivity {
  id: number
  title: string
  time: string
  icon: string
  tone: 'purple' | 'emerald' | 'red' | 'amber' | 'sky'
}
