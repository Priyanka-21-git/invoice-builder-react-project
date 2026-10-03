import { useState } from "react"
import type { Invoice } from "../types/invoices"

import InvoiceForm from "../components/InvoiceForm"
import InvoicePreview from "../components/InvoicePreview"

function CreateInvoice() {
  const [invoice, setInvoice] = useState<Invoice>({
    businessName: "",
    customerName: "",
    invoiceNumber: "",
    invoiceDate: "",
    items: [
      {
        description: "",
        quantity:0,
        price: 0,
      },
    ],
    taxRate: 0,
    discountRate: 0,
  })

  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="min-h-screen bg-blue-900 p-8">

      <h1 className="mb-6 text-3xl font-bold text-white text-center print:hidden">
        Invoice Builder
      </h1>

      {!showPreview && (
        <InvoiceForm
          invoice={invoice}
          setInvoice={setInvoice}
          onPreview={() => setShowPreview(true)}
        />
      )}

      {showPreview && (
        <InvoicePreview
          invoice={invoice}
          onEdit={() => setShowPreview(false)}
        />
      )}

    </div>
  )
}

export default CreateInvoice