import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Invoice } from "../types/invoices"

interface InvoiceState {
  invoices: Invoice[]
  drafts: Invoice[]
}

// Get saved invoices from localStorage
const savedInvoices = localStorage.getItem("invoices")

// Get saved drafts from localStorage
const savedDrafts = localStorage.getItem("drafts")

const initialState: InvoiceState = {
  invoices: savedInvoices
    ? JSON.parse(savedInvoices)
    : [],

  drafts: savedDrafts
    ? JSON.parse(savedDrafts)
    : [],
}

const invoiceSlice = createSlice({
  name: "invoice",

  initialState,

  reducers: {

    // Add a final invoice
    addInvoice: (
      state,
      action: PayloadAction<Invoice>
    ) => {

      state.invoices.push(action.payload)

      // Save final invoices to localStorage
      localStorage.setItem(
        "invoices",
        JSON.stringify(state.invoices)
      )
    },

    // Save an invoice as a draft
    saveDraft: (
      state,
      action: PayloadAction<Invoice>
    ) => {

      state.drafts.push(action.payload)

      // Save drafts to localStorage
      localStorage.setItem(
        "drafts",
        JSON.stringify(state.drafts)
      )
    },
  },
})

export const {
  addInvoice,
  saveDraft,
} = invoiceSlice.actions

export default invoiceSlice.reducer