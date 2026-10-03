// Reusable React component for collecting invoice details.
// Keeping the UI in a separate component makes App.tsx easier to manage.

import type { Invoice } from "../types/invoices"

interface InvoiceFormProps {
  invoice: Invoice
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>
  onPreview: () => void
}

// useState stores the current business name.
// setBusinessName updates the value when the user types.
function InvoiceForm({
  invoice,
  setInvoice,
  onPreview,
}: InvoiceFormProps) {

  // Calculate subtotal, tax amount, and discount amount
  const subtotal = invoice.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )

  const taxAmount =
    (subtotal * invoice.taxRate) / 100

  const discountAmount =
    (subtotal * invoice.discountRate) / 100

  const grandTotal =
    subtotal + taxAmount - discountAmount

  return (
    <div className="rounded-lg bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Invoice Details
      </h2>

      {/* Business Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Business Name
        </label>

        <input
          type="text"
          value={invoice.businessName}
          onChange={(event) => {
            setInvoice({
              ...invoice,
              businessName: event.target.value,
            })
          }}
          placeholder="Enter business name" 
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {/* Customer Name */}
      <div className="mt-4 mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Customer Name
        </label>

        <input
          type="text"
          value={invoice.customerName}
          onChange={(event) =>
            setInvoice({
              ...invoice,
              customerName: event.target.value,
            })
          }
          placeholder="Enter customer name" required
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {/* Invoice Number */}
      <div className="mt-4 mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Invoice Number
        </label>

        <input
          type="text"
          value={invoice.invoiceNumber}
          onChange={(event) =>
            setInvoice({
              ...invoice,
              invoiceNumber: event.target.value,
            })
          }
          placeholder="Enter invoice number" required
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {/* Invoice Date */}
      <div className="mt-4 mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Invoice Date
        </label>

        <input
          type="date"
          value={invoice.invoiceDate}
          onChange={(event) =>
            setInvoice({
              ...invoice,
              invoiceDate: event.target.value,
            })
          }
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {/* Invoice Items */}
      <div className="mt-6">

        <h3 className="mb-3 text-lg font-semibold">
          Invoice Items
        </h3>

        {/* Go through every item in the items array */}
        {invoice.items.map((item, index) => (

          <div
            key={index}
            className="mb-3 rounded-md border bg-gray-50 p-4"
          >

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Enter Description
              </label>

              <input
                type="text"
                value={item.description}
                onChange={(event) => {

                  const updatedItems = [...invoice.items]

                  updatedItems[index].description =
                    event.target.value

                  setInvoice({
                    ...invoice,
                    items: updatedItems,
                  })
                }}
                placeholder="Item description"
                className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Enter Quantity
              </label>

              <input
                type="number"
                value={item.quantity}
                onChange={(event) => {

                  const updatedItems = [...invoice.items]

                  updatedItems[index].quantity =
                    Number(event.target.value)

                  setInvoice({
                    ...invoice,
                    items: updatedItems,
                  })
                }}
                min="1"
                placeholder="Item quantity"
                className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Enter Price
              </label>

              <input
                type="number"
                value={item.price}
                onChange={(event) => {

                  const updatedItems = [...invoice.items]

                  updatedItems[index].price =
                    Number(event.target.value)

                  setInvoice({
                    ...invoice,
                    items: updatedItems,
                  })
                }}
                placeholder="Item price"
                min="0"
                className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2"
              />

              <p className="mt-2 font-medium">
                Amount: ₹{item.quantity * item.price}
              </p>
            </div>

            {/* Remove Item */}
            <button
              type="button"
              onClick={() => {

                const updatedItems = invoice.items.filter(
                  (_, itemIndex) => itemIndex !== index
                )

                setInvoice({
                  ...invoice,
                  items: updatedItems,
                })
              }}
              className="mt-2 rounded-md bg-red-400 px-3 py-2 text-white"
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      {/* Add Item Button */}
      <button
        type="button"
        onClick={() =>
          setInvoice({
            ...invoice,
            items: [
              ...invoice.items,
              {
                description: "",
                quantity: 1,
                price: 0,
              },
            ],
          })
        }
        className="mr-4 mt-4 inline-block rounded-md bg-green-400 px-4 py-2 text-black"
      >
        🛒 Add Item
      </button>

      {/* Tax Rate */}
      <div className="mt-4">

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Tax Rate (%)
        </label>

        <input
          type="number"
          value={invoice.taxRate}
          onChange={(event) =>
            setInvoice({
              ...invoice,
              taxRate: Number(event.target.value),
            })
          }
          min="0"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />

      </div>

      {/* Tax Amount */}
      <div className="mt-2 text-right">
        <p className="font-medium">
          Tax: ₹{taxAmount}
        </p>
      </div>

      {/* Discount Rate */}
      <div className="mt-4">

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Discount Rate (%)
        </label>

        <input
          type="number"
          value={invoice.discountRate}
          onChange={(event) =>
            setInvoice({
              ...invoice,
              discountRate: Number(event.target.value),
            })
          }
          min="0"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />

      </div>

      {/* Discount Amount */}
      <div className="mt-2 text-right">
        <p className="font-medium">
          Discount: ₹{discountAmount}
        </p>
      </div>

      {/* Subtotal */}
      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">
          Subtotal: ₹{subtotal}
        </p>
      </div>

      {/* Grand Total */}
      <div className="mt-4 text-right">
        <p className="text-xl font-bold text-blue-600">
          Grand Total: ₹{grandTotal}
        </p>
      </div>

      {/* Preview Invoice Button */}
      <button
  onClick={onPreview}
  className="ml-2 mt-4 inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 font-semibold text-white shadow-md transition hover:from-indigo-600 hover:to-purple-700"
>
  👁️ Preview Invoice
</button>
    </div>
  )
}

export default InvoiceForm