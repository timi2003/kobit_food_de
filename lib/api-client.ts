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
    // Make sure this matches your backend server URL
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
    // Ensure endpoint starts with /api
    const apiEndpoint = endpoint.startsWith("/api") ? endpoint : `/api${endpoint}`
    const url = `${this.baseURL}${apiEndpoint}`

    console.log(`🔄 API Request: ${options.method || "GET"} ${url}`)

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

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

      console.log(`✅ API Response: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        let errorMessage = "Request failed"

        try {
          const errorData = await response.json()
          console.error("❌ API Error Response:", errorData)
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
        } catch {
          errorMessage = `Network error: ${response.status} ${response.statusText}`
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("📦 API Response Data:", data)
      return data
    } catch (error) {
      console.error("❌ API request failed:", error)
      throw error
    }
  }

  // Test connection
  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/api/health`)
      const data = await response.json()
      console.log("🏥 Health Check:", data)
      return data
    } catch (error) {
      console.error("❌ Health check failed:", error)
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
    return this.request<ApiResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async login(credentials: { email: string; password: string }) {
    return this.request<ApiResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async logout() {
    return this.request<ApiResponse>("/auth/logout", { method: "POST" })
  }

  async getProfile() {
    return this.request<ApiResponse>("/auth/profile")
  }

  // Restaurants
  async getRestaurants(params?: Record<string, string | number | boolean>) {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : ""
    return this.request<ApiResponse>(`/restaurants${query}`)
  }

  async getRestaurant(slug: string) {
    return this.request<ApiResponse>(`/restaurants/${slug}`)
  }

  // Orders
  async createOrder(orderData: OrderData) {
    return this.request<ApiResponse>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async getOrders(params?: Record<string, string | number>) {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : ""
    return this.request<ApiResponse>(`/orders${query}`)
  }

  async getOrder(id: string) {
    return this.request<ApiResponse>(`/orders/${id}`)
  }

  async updateOrderStatus(orderId: string, status: string, note?: string) {
    return this.request<ApiResponse>(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, note }),
    })
  }

  async updateOrderPayment(data: {
    orderId: string
    paymentReference: string
    status: string
  }) {
    return this.request<ApiResponse>(`/orders/${data.orderId}/payment`, {
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
    return this.request<ApiResponse>("/payments/bank-transfer", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  async confirmPayment(confirmationData: {
    orderId: string
    adminId?: string
    adminName?: string
  }) {
    return this.request<ApiResponse>("/payments/confirm", {
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
    return this.request<ApiResponse>("/users/profile", {
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
    return this.request<ApiResponse>("/users/addresses", {
      method: "POST",
      body: JSON.stringify(addressData),
    })
  }
}

export const apiClient = new ApiClient()
export type { ApiResponse, OrderData }
