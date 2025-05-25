"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

// Types
interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  lastOrderDate?: string
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface Order {
  id: string
  customerId: string
  customer: Customer
  items: OrderItem[]
  total: number
  status: "pending_payment" | "payment_confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  paymentMethod: "bank_transfer"
  paymentStatus: "pending" | "confirmed" | "rejected"
  transferReference?: string
  transferDate?: string
  transferAmount?: number
  customerNotes?: string
  createdAt: string
  updatedAt: string
}

interface PaymentConfirmation {
  id: string
  orderId: string
  customerId: string
  amount: number
  transferReference: string
  transferDate: string
  transferAmount: number
  customerNotes?: string
  status: "pending" | "confirmed" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  preparationTime: number
  ingredients: string[]
  // Add sales data for consistent rendering
  sold: number
  revenue: number
  growth: number
}

interface AppState {
  orders: Order[]
  customers: Customer[]
  paymentConfirmations: PaymentConfirmation[]
  menuItems: MenuItem[]
  stats: {
    totalRevenue: number
    totalOrders: number
    newCustomers: number
    avgOrderValue: number
  }
}

type AppAction =
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER"; payload: { id: string; updates: Partial<Order> } }
  | { type: "ADD_PAYMENT_CONFIRMATION"; payload: PaymentConfirmation }
  | { type: "UPDATE_PAYMENT_CONFIRMATION"; payload: { id: string; updates: Partial<PaymentConfirmation> } }
  | { type: "ADD_CUSTOMER"; payload: Customer }
  | { type: "UPDATE_CUSTOMER"; payload: { id: string; updates: Partial<Customer> } }
  | { type: "UPDATE_STATS" }

const initialState: AppState = {
  orders: [
    {
      id: "ORD-001",
      customerId: "CUST-001",
      customer: {
        id: "CUST-001",
        name: "Sophia Anderson",
        email: "sophia.anderson@email.com",
        phone: "08012345678",
        avatar: "/placeholder.svg?height=32&width=32",
        totalOrders: 5,
        totalSpent: 125000,
        joinDate: "2024-01-15",
        lastOrderDate: "2024-01-25",
      },
      items: [
        { id: "ITEM-001", name: "Jollof Rice", price: 15000, quantity: 2, category: "Main Course" },
        { id: "ITEM-002", name: "Grilled Chicken", price: 12500, quantity: 1, category: "Protein" },
      ],
      total: 42500,
      status: "payment_confirmed",
      paymentMethod: "bank_transfer",
      paymentStatus: "confirmed",
      transferReference: "FBN240125001234",
      transferDate: "2024-01-25T14:30:00",
      transferAmount: 42500,
      customerNotes: "Transfer made via mobile banking",
      createdAt: "2024-01-25T14:00:00",
      updatedAt: "2024-01-25T14:45:00",
    },
    {
      id: "ORD-002",
      customerId: "CUST-002",
      customer: {
        id: "CUST-002",
        name: "James Wilson",
        email: "james.wilson@email.com",
        phone: "08087654321",
        avatar: "/placeholder.svg?height=32&width=32",
        totalOrders: 3,
        totalSpent: 87000,
        joinDate: "2024-01-20",
        lastOrderDate: "2024-01-25",
      },
      items: [
        { id: "ITEM-003", name: "Fried Rice", price: 18000, quantity: 1, category: "Main Course" },
        { id: "ITEM-004", name: "Fish Pepper Soup", price: 10990, quantity: 1, category: "Soup" },
      ],
      total: 28990,
      status: "pending_payment",
      paymentMethod: "bank_transfer",
      paymentStatus: "pending",
      createdAt: "2024-01-25T13:00:00",
      updatedAt: "2024-01-25T13:00:00",
    },
  ],
  customers: [
    {
      id: "CUST-001",
      name: "Sophia Anderson",
      email: "sophia.anderson@email.com",
      phone: "08012345678",
      avatar: "/placeholder.svg?height=32&width=32",
      totalOrders: 5,
      totalSpent: 125000,
      joinDate: "2024-01-15",
      lastOrderDate: "2024-01-25",
    },
    {
      id: "CUST-002",
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "08087654321",
      avatar: "/placeholder.svg?height=32&width=32",
      totalOrders: 3,
      totalSpent: 87000,
      joinDate: "2024-01-20",
      lastOrderDate: "2024-01-25",
    },
  ],
  paymentConfirmations: [
    {
      id: "PAY-001",
      orderId: "ORD-002",
      customerId: "CUST-002",
      amount: 28990,
      transferReference: "GTB240125002345",
      transferDate: "2024-01-25T13:15:00",
      transferAmount: 28990,
      customerNotes: "Quick transfer via USSD",
      status: "pending",
      submittedAt: "2024-01-25T13:30:00",
    },
  ],
  menuItems: [
    {
      id: "ITEM-001",
      name: "Jollof Rice",
      description: "Delicious Nigerian jollof rice with vegetables",
      price: 15000,
      category: "Main Course",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
      preparationTime: 25,
      ingredients: ["Rice", "Tomatoes", "Onions", "Spices"],
      sold: 342,
      revenue: 5130000,
      growth: 12.5,
    },
    {
      id: "ITEM-002",
      name: "Grilled Chicken",
      description: "Perfectly grilled chicken with special sauce",
      price: 12500,
      category: "Protein",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
      preparationTime: 20,
      ingredients: ["Chicken", "Spices", "Sauce"],
      sold: 276,
      revenue: 3450000,
      growth: 8.3,
    },
    {
      id: "ITEM-003",
      name: "Fried Rice",
      description: "Tasty fried rice with mixed vegetables",
      price: 18000,
      category: "Main Course",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
      preparationTime: 30,
      ingredients: ["Rice", "Vegetables", "Soy Sauce", "Spices"],
      sold: 189,
      revenue: 3402000,
      growth: 5.7,
    },
    {
      id: "ITEM-004",
      name: "Fish Pepper Soup",
      description: "Spicy fish pepper soup with local spices",
      price: 10990,
      category: "Soup",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
      preparationTime: 15,
      ingredients: ["Fish", "Pepper", "Local Spices"],
      sold: 156,
      revenue: 1714440,
      growth: 15.2,
    },
  ],
  stats: {
    totalRevenue: 212000,
    totalOrders: 8,
    newCustomers: 2,
    avgOrderValue: 26500,
  },
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      }

    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? { ...order, ...action.payload.updates } : order,
        ),
      }

    case "ADD_PAYMENT_CONFIRMATION":
      return {
        ...state,
        paymentConfirmations: [action.payload, ...state.paymentConfirmations],
      }

    case "UPDATE_PAYMENT_CONFIRMATION":
      const updatedConfirmations = state.paymentConfirmations.map((confirmation) =>
        confirmation.id === action.payload.id ? { ...confirmation, ...action.payload.updates } : confirmation,
      )

      // If payment is confirmed, update the corresponding order
      if (action.payload.updates.status === "confirmed") {
        const confirmation = state.paymentConfirmations.find((c) => c.id === action.payload.id)
        if (confirmation) {
          const updatedOrders = state.orders.map((order) =>
            order.id === confirmation.orderId
              ? { ...order, paymentStatus: "confirmed", status: "preparing" as const }
              : order,
          )
          return {
            ...state,
            paymentConfirmations: updatedConfirmations,
            orders: updatedOrders,
          }
        }
      }

      return {
        ...state,
        paymentConfirmations: updatedConfirmations,
      }

    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [action.payload, ...state.customers],
      }

    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? { ...customer, ...action.payload.updates } : customer,
        ),
      }

    case "UPDATE_STATS":
      const totalRevenue = state.orders
        .filter((order) => order.paymentStatus === "confirmed")
        .reduce((sum, order) => sum + order.total, 0)

      const totalOrders = state.orders.length
      const newCustomers = state.customers.filter(
        (customer) => new Date(customer.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ).length
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

      return {
        ...state,
        stats: {
          totalRevenue,
          totalOrders,
          newCustomers,
          avgOrderValue,
        },
      }

    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Update stats whenever orders or customers change
  useEffect(() => {
    dispatch({ type: "UPDATE_STATS" })
  }, [state.orders, state.customers])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppStore() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppStore must be used within an AppProvider")
  }
  return context
}

// Helper functions
export function generateOrderId(): string {
  return `ORD-${Date.now().toString().slice(-6)}`
}

export function generateCustomerId(): string {
  return `CUST-${Date.now().toString().slice(-6)}`
}

export function generatePaymentId(): string {
  return `PAY-${Date.now().toString().slice(-6)}`
}
