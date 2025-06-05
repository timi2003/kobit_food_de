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
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
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
    const url = `${this.baseURL}/api${endpoint}`

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
  let errorMessage = "Request failed";

  try {
    const errorData = await response.json();
    errorMessage = errorData.error || errorMessage;
  } catch {
    errorMessage = "Network error";
  }

  throw new Error(errorMessage);
}

return response.json();

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

  // Admin
  async confirmPayment(confirmationData: {
    orderId: string
    paymentReference?: string
    status?: string
  }) {
    return this.request<ApiResponse>("/admin/payments/confirm", {
      method: "POST",
      body: JSON.stringify(confirmationData),
    })
  }

  // Update order payment
  async updateOrderPayment(data: {
    orderId: string
    paymentReference: string
    status: string
  }) {
    return this.request<ApiResponse>(`/orders/${data.orderId}/payment`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
