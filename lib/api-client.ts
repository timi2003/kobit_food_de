interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface OrderData {
  restaurantId: string
  items: Array<{
    menuItemId: number
    name: string
    price: number
    quantity: number
    customizations?: Record<string, any>
  }>
  deliveryAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    instructions?: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
  paymentMethod: string
  specialInstructions?: string
  pricing: {
    subtotal: number
    deliveryFee: number
    serviceFee: number
    tax: number
    total: number
  }
  customer: {
    id?: string
    email?: string
    name: string
  }
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    // Default to port 5000 which is what your Express backend is likely using
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("accessToken")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // The backend routes already include /api prefix, so we don't need to add it here
    const url = `${this.baseURL}${endpoint}`

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    // Add existing headers from options
    if (options.headers) {
      const existingHeaders = options.headers as Record<string, string>
      Object.assign(headers, existingHeaders)
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        let errorMessage = "Request failed"

        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
        } catch {
          errorMessage = `Network error: ${response.status} ${response.statusText}`
        }

        throw new Error(errorMessage)
      }

      return response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Authentication
  async register(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber?: string
  }) {
    return this.request<ApiResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async login(credentials: { email: string; password: string }) {
    return this.request<ApiResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async logout() {
    return this.request<ApiResponse>("/api/auth/logout", { method: "POST" })
  }

  async getProfile() {
    return this.request<ApiResponse>("/api/auth/profile")
  }

  // Restaurants
  async getRestaurants(params?: Record<string, string | number | boolean>) {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : ""
    return this.request<ApiResponse>(`/api/restaurants${query}`)
  }

  async getRestaurant(slug: string) {
    return this.request<ApiResponse>(`/api/restaurants/${slug}`)
  }

  // Orders
  async createOrder(orderData: OrderData) {
    return this.request<ApiResponse>("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async getOrders(params?: Record<string, string | number>) {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : ""
    return this.request<ApiResponse>(`/api/orders${query}`)
  }

  async getOrder(id: string) {
    return this.request<ApiResponse>(`/api/orders/${id}`)
  }

  async updateOrderStatus(orderId: string, status: string, note?: string) {
    return this.request<ApiResponse>(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, note }),
    })
  }

  // Update order payment
  async updateOrderPayment(data: {
    orderId: string
    paymentReference: string
    status: string
  }) {
    return this.request<ApiResponse>(`/api/orders/${data.orderId}/payment`, {
      method: "PATCH",
      body: JSON.stringify({
        paymentReference: data.paymentReference,
        status: data.status,
      }),
    })
  }

  // Payments
  async processBankTransfer(paymentData: {
    orderNumber: string
    amount: number
    customerEmail: string
    reference: string
    bankAccount: string
  }) {
    return this.request<ApiResponse>("/api/payments/bank-transfer", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  async confirmPayment(confirmationData: {
    orderId: string
    adminId?: string
    adminName?: string
  }) {
    return this.request<ApiResponse>("/api/payments/confirm", {
      method: "POST",
      body: JSON.stringify(confirmationData),
    })
  }

  // User management
  async updateProfile(userData: {
    firstName?: string
    lastName?: string
    phoneNumber?: string
  }) {
    return this.request<ApiResponse>("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async addAddress(addressData: {
    name: string
    street: string
    city: string
    state: string
    zipCode?: string
    coordinates?: {
      latitude: number
      longitude: number
    }
    isDefault?: boolean
  }) {
    return this.request<ApiResponse>("/api/users/addresses", {
      method: "POST",
      body: JSON.stringify(addressData),
    })
  }
}

export const apiClient = new ApiClient()
export type { ApiResponse, OrderData }
