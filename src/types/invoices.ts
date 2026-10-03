
export interface InvoiceItem {
  description: string
  quantity: number
  price: number
}
export interface Invoice {
  businessName: string
  customerName: string
  invoiceNumber: string
  invoiceDate: string
  items: InvoiceItem[]
  taxRate: number
  discountRate: number
}