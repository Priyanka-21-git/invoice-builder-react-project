import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import CreateInvoice from "./pages/CreateInvoice"
import InvoiceList from "./components/InvoiceList"


function App() {
  return (
    <BrowserRouter>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white px-8 py-4 shadow-md print:hidden">
  <div className="mx-auto flex max-w-6xl items-center justify-between">

    {/* Application Name */}
    <Link
      to="/"
      className="text-2xl font-bold text-blue-900"
    >
      🧾 Invoice Builder
    </Link>

    {/* Navigation Links */}
    <div className="flex items-center gap-3">

      <Link
        to="/"
        className="rounded-lg px-4 py-2 font-medium text-blue-900 hover:bg-blue-50"
      >
        Dashboard
      </Link>

      <Link
        to="/invoices"
        className="rounded-lg px-4 py-2 font-medium text-blue-900 hover:bg-blue-50"
      >
        Invoice List
      </Link>

      <Link
        to="/create"
        className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white shadow hover:bg-blue-700"
      >
        + Create Invoice
      </Link>

    </div>

  </div>
</nav>

      {/* Pages */}
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/invoices"
          element={<InvoiceList />}
        />

        <Route
          path="/create"
          element={<CreateInvoice />}
        />
          

      </Routes>

    </BrowserRouter>
  )
}

export default App