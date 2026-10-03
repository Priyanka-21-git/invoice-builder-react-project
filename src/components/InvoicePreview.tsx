import { useRef } from "react"
import html2pdf from "html2pdf.js"

import type { Invoice } from "../types/invoices"
import companyLogo from "../assets/logo.jpg"

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks"

import { addInvoice } from "../store/invoiceSlice"

interface InvoicePreviewProps {
  invoice: Invoice
  onEdit: () => void
}

function InvoicePreview({
  invoice,
  onEdit,
}: InvoicePreviewProps) {

  // Get dispatch function from Redux
  const dispatch = useAppDispatch()

  // Get all saved invoices from Redux
  const invoices = useAppSelector(
    (state) => state.invoice.invoices
  )

  // Reference to the invoice container
  const invoiceRef = useRef<HTMLDivElement>(null)

  // Calculate subtotal
  const subtotal = invoice.items.reduce(
    (total, item) =>
      total + item.quantity * item.price,
    0
  )

  // Calculate tax
  const taxAmount =
    (subtotal * invoice.taxRate) / 100

  // Calculate discount
  const discountAmount =
    (subtotal * invoice.discountRate) / 100

  // Calculate grand total
  const grandTotal =
    subtotal + taxAmount - discountAmount

  // Print the invoice
  const handlePrint = () => {
    window.print()
  }
// Download the invoice as a PDF
const handleDownloadPDF = async () => {
  if (!invoiceRef.current) {
    return
  }

  const invoiceElement = invoiceRef.current

  // Save the original styles
  const originalBackgroundColor =
    invoiceElement.style.backgroundColor

  const originalColor =
    invoiceElement.style.color

  // Save styles of child elements
  const elements =
    invoiceElement.querySelectorAll<HTMLElement>("*")

  const originalStyles = Array.from(elements).map(
    (element) => ({
      element,
      color: element.style.color,
      backgroundColor:
        element.style.backgroundColor,
      borderColor: element.style.borderColor,
      boxShadow: element.style.boxShadow,
    })
  )

  try {
    // Use colors supported by html2canvas
    invoiceElement.style.backgroundColor =
      "#ffffff"

    invoiceElement.style.color =
      "#111827"

    elements.forEach((element) => {
      element.style.color = "#111827"
      element.style.backgroundColor = "#ffffff"
      element.style.borderColor = "#d1d5db"
      element.style.boxShadow = "none"
    })

    const options = {
      margin: 10,
      filename: `Invoice-${invoice.invoiceNumber}.pdf`,

      image: {
        type: "jpeg" as const,
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },

      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
    }

    await html2pdf()
      .set(options)
      .from(invoiceElement)
      .save()

  } finally {
    // Restore original styles
    invoiceElement.style.backgroundColor =
      originalBackgroundColor

    invoiceElement.style.color =
      originalColor

    originalStyles.forEach((item) => {
      item.element.style.color = item.color
      item.element.style.backgroundColor =
        item.backgroundColor
      item.element.style.borderColor =
        item.borderColor
      item.element.style.boxShadow =
        item.boxShadow
    })
  }
}
 // Save invoice after checking for duplicate invoice number
  const handleSaveInvoice = () => {

    const invoiceAlreadyExists = invoices.some(
      (existingInvoice) =>
        existingInvoice.invoiceNumber ===
        invoice.invoiceNumber
    )

    if (invoiceAlreadyExists) {
      alert("⚠️ Invoice number already exists!")
      return
    }

    dispatch(addInvoice(invoice))

    alert(
      "✅ Invoice saved successfully! You can check it in the Invoice List."
    )
  }

  return (
    <div
      ref={invoiceRef}
      className="rounded-lg p-6"
      style={{
        backgroundColor: "#ffffff",
        color: "#111827",
      }}
    >

      {/* Company Logo and Invoice Title */}
      <div className="mb-6 flex items-start justify-between border-b pb-6">

        <div>
          <img
            src={companyLogo}
            alt="Company Logo"
            className="mb-3 h-12 w-auto"
          />

          <h2 className="text-3xl font-bold text-gray-800">
            INVOICE
          </h2>
        </div>

        {/* Invoice Information */}
        <div className="text-right text-sm text-gray-600">

          <p>
            <strong>Invoice #:</strong>{" "}
            {invoice.invoiceNumber}
          </p>

          <p className="mt-1">
            <strong>Date:</strong>{" "}
            {invoice.invoiceDate}
          </p>

        </div>

      </div>

      {/* Business and Customer Details */}
      <div className="mb-6 grid grid-cols-2 gap-6 border-b pb-6">

        {/* Business Details */}
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            From
          </h3>

          <p className="font-medium">
            {invoice.businessName}
          </p>
        </div>

        {/* Customer Details */}
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Bill To
          </h3>

          <p className="font-medium">
            {invoice.customerName}
          </p>
        </div>

      </div>

      {/* Invoice Items */}
      <div className="mb-6">

        <h3 className="mb-3 text-lg font-semibold">
          Items
        </h3>

        <div className="grid grid-cols-4 gap-4 border-b pb-2 font-semibold">

          <div>Description</div>

          <div className="text-center">
            Quantity
          </div>

          <div className="text-right">
            Price
          </div>

          <div className="text-right">
            Amount
          </div>

        </div>

        {invoice.items.map((item, index) => (

          <div
            key={index}
            className="grid grid-cols-4 gap-4 border-b py-3 text-sm"
          >

            <div>
              {item.description}
            </div>

            <div className="text-center">
              {item.quantity}
            </div>

            <div className="text-right">
              ₹{item.price}
            </div>

            <div className="text-right font-medium">
              ₹{item.quantity * item.price}
            </div>

          </div>

        ))}

      </div>

      {/* Invoice Summary */}
      <div className="mt-6 flex justify-end">

        <div className="w-full max-w-sm border-t pt-4">

          <div className="flex justify-between py-1">
            <span>Subtotal</span>
            <span>
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between py-1">
            <span>
              Tax ({invoice.taxRate}%)
            </span>

            <span>
              ₹{taxAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between py-1">
            <span>
              Discount ({invoice.discountRate}%)
            </span>

            <span>
              ₹{discountAmount.toFixed(2)}
            </span>
          </div>

          <div className="mt-2 flex justify-between border-t pt-3 text-xl font-bold">

            <span>
              Grand Total
            </span>

            <span>
              ₹{grandTotal.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

      {/* Action Buttons */}
      <div className="invoice-actions mt-6"  data-html2canvas-ignore="true">

        {/* Print Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="mr-3 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 print:hidden"
        >
          Print as PDF
        </button>

        {/* Download PDF Button */}
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="mr-3 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 print:hidden"
        >
          📄 Download PDF
        </button>

        {/* Edit Button */}
        <button
          type="button"
          onClick={onEdit}
          className="mr-3 rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 print:hidden"
        >
          Edit Invoice
        </button>

        {/* Save Button */}
        <button
          type="button"
          onClick={handleSaveInvoice}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 print:hidden"
        >
          💾 Save Invoice
        </button>

      </div>

    </div>
  )
}

export default InvoicePreview

