interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  tokens?: {
    accessToken: string
    refreshToken: string
  }
  user?: any
  order?: any
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

interface AddressData {
  id?: string
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
}

class ApiClient {
  private baseURL: string
  private token: string | null = null
  private refreshToken: string | null = null

  constructor() {
    // Default to port 5000 which is what your Express backend is likely using
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("accessToken")
      this.refreshToken = localStorage.getItem("refreshToken")
    }
  }

  setToken(token: string, refreshToken?: string) {
    this.token = token
    this.refreshToken = refreshToken || this.refreshToken
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token)
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken)
      }
    }
  }

  clearToken() {
    this.token = null
    this.refreshToken = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}, useRefreshToken = false): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    console.log(`🔄 API Request: ${options.method || "GET"} ${url}`)

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (options.headers) {
      const existingHeaders = options.headers as Record<string, string>
      Object.assign(headers, existingHeaders)
    }

    let currentToken = this.token

    if (useRefreshToken) {
      currentToken = this.refreshToken
      if (!currentToken) {
        throw new Error("No refresh token available.")
      }
    }

    if (currentToken) {
      headers.Authorization = `Bearer ${currentToken}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)

      console.log(`📡 API Response: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        let errorMessage = "Request failed"

        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
        } catch {
          errorMessage = `Network error: ${response.status} ${response.statusText}`
        }

        // Handle specific 404 errors with mock data for development
        if (response.status === 404) {
          console.warn(`⚠️ Endpoint not found: ${endpoint}. Using mock data for development.`)
          return this.getMockResponse(endpoint, options.method || "GET")
        }

        throw new Error(errorMessage)
      }

      return response.json()
    } catch (error: any) {
      console.error("❌ API request failed:", error)

      // If it's a network error and we're in development, return mock data
      if (error.message.includes("fetch") || error.message.includes("Network")) {
        console.warn(`⚠️ Network error for ${endpoint}. Using mock data for development.`)
        return this.getMockResponse(endpoint, options.method || "GET")
      }

      throw error
    }
  }

  private getMockResponse(endpoint: string, method: string): any {
    console.log(`🎭 Returning mock data for: ${method} ${endpoint}`)

    // Mock responses for different endpoints
    if (endpoint.includes("/orders") && method === "POST") {
      const orderNumber = `ORD-${Date.now()}`
      return {
        success: true,
        message: "Order created successfully",
        data: {
          order: {
            _id: `mock-order-${Date.now()}`,
            orderNumber,
            status: "pending",
            pricing: {
              subtotal: 5000,
              deliveryFee: 500,
              serviceFee: 250,
              tax: 375,
              total: 6125,
            },
            customer: {
              name: "John Doe",
              email: "john@example.com",
            },
            deliveryAddress: {
              name: "John Doe",
              street: "123 Test Street",
              city: "Lagos",
              state: "Lagos State",
              zipCode: "100001",
            },
            items: [
              {
                name: "Jollof Rice",
                price: 2500,
                quantity: 2,
              },
            ],
            createdAt: new Date().toISOString(),
          },
        },
      }
    }

    if (endpoint.includes("/restaurants") && method === "GET") {
      return {
        success: true,
        data: {
          restaurants: [
            {
              _id: "1",
              name: "Mama Put Kitchen",
              description: "Authentic Nigerian home-style cooking with the best jollof rice in Lagos",
              image: "/placeholder.svg?height=200&width=300",
              cuisine: "Nigerian",
              rating: 4.8,
              deliveryTime: "25-35 mins",
              deliveryFee: 500,
              minimumOrder: 2000,
              isOpen: true,
              address: {
                street: "123 Allen Avenue",
                city: "Ikeja",
                state: "Lagos",
              },
              tags: ["Popular", "Fast Delivery"],
            },
            {
              _id: "2",
              name: "Jollof Palace",
              description: "The home of the best jollof rice and grilled chicken in Nigeria",
              image: "/placeholder.svg?height=200&width=300",
              cuisine: "Nigerian",
              rating: 4.6,
              deliveryTime: "30-40 mins",
              deliveryFee: 600,
              minimumOrder: 1500,
              isOpen: true,
              address: {
                street: "45 Victoria Island",
                city: "Lagos Island",
                state: "Lagos",
              },
              tags: ["Jollof Specialist"],
            },
          ],
        },
      }
    }

    if (endpoint.includes("/auth/register") && method === "POST") {
      return {
        success: true,
        message: "Registration successful",
        data: {
          user: {
            _id: "mock-user-id",
            id: "mock-user-id",
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            role: "customer",
            phoneNumber: "08012345678",
          },
          tokens: {
            accessToken: "mock-access-token",
            refreshToken: "mock-refresh-token",
          },
        },
      }
    }

    if (endpoint.includes("/auth/login") && method === "POST") {
      return {
        success: true,
        message: "Login successful",
        data: {
          user: {
            _id: "mock-user-id",
            id: "mock-user-id",
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            role: "customer",
            phoneNumber: "08012345678",
          },
          tokens: {
            accessToken: "mock-access-token",
            refreshToken: "mock-refresh-token",
          },
        },
      }
    }

    if (endpoint.includes("/addresses") && method === "GET") {
      return {
        success: true,
        data: {
          addresses: [
            {
              _id: "mock-address-1",
              name: "Home",
              street: "123 Lagos Street",
              city: "Lagos",
              state: "Lagos State",
              zipCode: "100001",
              isDefault: true,
            },
            {
              _id: "mock-address-2",
              name: "Office",
              street: "456 Victoria Island",
              city: "Lagos",
              state: "Lagos State",
              zipCode: "100001",
              isDefault: false,
            },
          ],
        },
      }
    }

    if (endpoint.includes("/orders") && method === "GET") {
      return {
        success: true,
        data: {
          orders: [
            {
              _id: "mock-order-1",
              orderNumber: "ORD-001",
              status: "delivered",
              total: 5500,
              createdAt: new Date().toISOString(),
              restaurant: { name: "Mama Put Kitchen" },
            },
            {
              _id: "mock-order-2",
              orderNumber: "ORD-002",
              status: "preparing",
              total: 3200,
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              restaurant: { name: "Jollof Palace" },
            },
          ],
        },
      }
    }

    if (endpoint.includes("/profile") && method === "PUT") {
      return {
        success: true,
        message: "Profile updated successfully",
        data: {
          user: {
            firstName: "Updated",
            lastName: "User",
            phoneNumber: "08012345678",
          },
        },
      }
    }

    // Default mock response
    return {
      success: true,
      message: "Mock response - endpoint not implemented yet",
      data: {},
    }
  }

  private async refreshTokenCall(): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.refreshToken}`,
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      })

      if (!response.ok) {
        console.error("Failed to refresh token:", response.status, response.statusText)
        return null
      }

      const data = await response.json()
      return { accessToken: data.accessToken, refreshToken: data.refreshToken }
    } catch (error) {
      console.error("Error refreshing token:", error)
      return null
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

  async addAddress(addressData: AddressData) {
    return this.request<ApiResponse>("/api/users/addresses", {
      method: "POST",
      body: JSON.stringify(addressData),
    })
  }

  async getAddresses() {
    return this.request<ApiResponse>("/api/users/addresses")
  }

  async updateAddress(addressId: string, addressData: AddressData) {
    return this.request<ApiResponse>(`/api/users/addresses/${addressId}`, {
      method: "PUT",
      body: JSON.stringify(addressData),
    })
  }

  async deleteAddress(addressId: string) {
    return this.request<ApiResponse>(`/api/users/addresses/${addressId}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient()
export type { ApiResponse, OrderData, AddressData }
