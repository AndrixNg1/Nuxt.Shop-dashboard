export type CustomerStatus = 'active' | 'inactive' | 'blocked'

export interface Customer {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  location: string
  totalOrders: number
  totalSpent: string
  status: CustomerStatus
  statusLabel: string
}
