import { apiClient } from "./api-client"

export async function testApiConnection() {
  try {
    console.log("🧪 Testing API connection...")

    // Test health endpoint
    const healthCheck = await apiClient.testConnection()
    console.log("✅ Health check passed:", healthCheck)

    // Test restaurants endpoint
    try {
      const restaurants = await apiClient.getRestaurants({ limit: 1 })
      console.log("✅ Restaurants endpoint working:", restaurants)
    } catch (error) {
      console.log("⚠️ Restaurants endpoint error (might be expected if no data):", error)
    }

    return true
  } catch (error) {
    console.error("❌ API connection test failed:", error)
    return false
  }
}

// Call this function in your app to test the connection
if (typeof window !== "undefined") {
  // Only run in browser
  testApiConnection()
}
