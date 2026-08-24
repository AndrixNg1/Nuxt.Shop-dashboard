export type DashboardTone = 'violet' | 'blue' | 'orange' | 'green'
export type OrderStatus = 'success' | 'warning' | 'danger'

export interface DashboardStat {
  label: string
  value: string
  change: string
  detail: string
  icon: string
  tone: DashboardTone
}

export interface DashboardActivity {
  text: string
  time: string
  icon: string
  tone: DashboardTone
}

export interface DashboardOrder {
  id: string
  customer: string
  product: string
  amount: string
  status: string
  statusClass: OrderStatus
  initials: string
}
