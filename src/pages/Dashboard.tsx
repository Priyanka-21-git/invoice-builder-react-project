import { useAppSelector } from "../store/hooks"

function Dashboard() {
 // Get saved invoices from Redux
const invoices = useAppSelector(
  (state) => state.invoice.invoices
)


// Total number of saved invoices
const totalInvoices = invoices.length



  // Calculate total amount of all invoices
  const totalAmount = invoices.reduce(
    (total, invoice) => {
      const subtotal = invoice.items.reduce(
        (itemTotal, item) =>
          itemTotal + item.quantity * item.price,
        0
      )

      const taxAmount =
        (subtotal * invoice.taxRate) / 100

      const discountAmount =
        (subtotal * invoice.discountRate) / 100

      const grandTotal =
        subtotal + taxAmount - discountAmount

      return total + grandTotal
    },
    0
  )

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(59, 130, 246, 0.55), rgba(37, 99, 235, 0.65)), url('/invoice-bg.jpg')",
      }}
    >
      <div className="min-h-screen px-8 py-12">

        {/* Heading */}
        <div className="mx-auto max-w-6xl text-center text-white">
          <h1 className="text-4xl font-bold">
            Invoice Builder
          </h1>

          <p className="mt-3 text-lg text-white-400 font-bold">
            Create and manage your invoices easily
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 ">

          {/* Total Invoices */}
          <div className="rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur">
            <p className="text-sm font-medium text-gray-500">
              Total Invoices Build
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-900">
              {totalInvoices}
            </h2>
          </div>

          {/* Total Amount */}
          <div className="rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur">
            <p className="text-sm font-medium text-gray-500">
              Total Amount Of invoice Generated
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-900">
              ₹{totalAmount.toFixed(2)}
            </h2>
          </div>

          

        </div>

      </div>
    </div>
  )
}

export default Dashboard