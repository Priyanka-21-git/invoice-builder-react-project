import { useAppSelector } from "../store/hooks"

function InvoiceList() {
  const invoices = useAppSelector(
    (state) => state.invoice.invoices
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">

      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-lg">

        {/* Page Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-900">
            Invoice List
          </h2>

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-blue-700">
            {invoices.length} Invoice{invoices.length !== 1 ? "s" : ""}
          </span>
        </div>

        {invoices.length === 0 ? (

          /* Empty State */
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <p className="text-lg font-medium text-gray-600">
              No invoices saved yet.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Saved invoices will appear here.
            </p>
          </div>

        ) : (

          /* Invoice Cards */
          <div className="space-y-4">

            {invoices.map((invoice, index) => {

              const subtotal = invoice.items.reduce(
                (total, item) =>
                  total + item.quantity * item.price,
                0
              )

              const taxAmount =
                (subtotal * invoice.taxRate) / 100

              const discountAmount =
                (subtotal * invoice.discountRate) / 100

              const grandTotal =
                subtotal + taxAmount - discountAmount

              return (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm transition hover:shadow-md"
                >

                  {/* Invoice Header */}
                  <div className="mb-4 flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Invoice Number
                      </p>

                      <h3 className="text-xl font-bold text-blue-800">
                        {invoice.invoiceNumber}
                      </h3>
                    </div>

                    <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Saved
                    </span>

                  </div>

                  {/* Invoice Details */}
                  <div className="grid gap-4 sm:grid-cols-3">

                    <div>
                      <p className="text-sm text-gray-500">
                        Customer
                      </p>

                      <p className="font-medium text-gray-800">
                        {invoice.customerName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Business
                      </p>

                      <p className="font-medium text-gray-800">
                        {invoice.businessName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Invoice Date
                      </p>

                      <p className="font-medium text-gray-800">
                        {invoice.invoiceDate}
                      </p>
                    </div>

                  </div>

                  {/* Amount */}
                  <div className="mt-5 flex items-center justify-between border-t pt-4">

                    <span className="font-medium text-gray-600">
                      Grand Total
                    </span>

                    <span className="text-xl font-bold text-blue-700">
                      ₹{grandTotal.toFixed(2)}
                    </span>

                  </div>

                </div>
              )
            })}

          </div>
        )}

      </div>

    </div>
  )
}

export default InvoiceList