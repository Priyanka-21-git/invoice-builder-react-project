import { useAppSelector } from "../store/hooks"

function ReduxTest() {
  const invoices = useAppSelector(
    (state) => state.invoice.invoices
  )

  return (
    <div>
      Invoices in Redux: {invoices.length}
    </div>
  )
}

export default ReduxTest