export type ProductStatus = 'active' | 'draft' | 'archived' | 'out_of_stock'
export type OrderStatus = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface Product {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: ProductStatus
  statusLabel: string
}

export interface Order {
  id: string
  customer: string
  initials: string
  product: string
  date: string
  amount: string
  status: OrderStatus
  statusLabel: string
}

export interface ResourceFilter {
  label: string
  value: string
}
