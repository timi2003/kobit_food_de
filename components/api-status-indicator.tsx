"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

export function ApiStatusIndicator() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkApiStatus = async () => {
    setIsChecking(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/health`)
      setIsOnline(response.ok)
    } catch (error) {
      setIsOnline(false)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    checkApiStatus()
  }, [])

  if (isOnline === null) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-lg border">
        {isOnline ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <Badge variant="outline" className="text-green-600 border-green-600">
              API Online
            </Badge>
          </>
        ) : (
          <>
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              Using Mock Data
            </Badge>
          </>
        )}
        <Button variant="ghost" size="sm" onClick={checkApiStatus} disabled={isChecking} className="h-6 w-6 p-0">
          <RefreshCw className={`h-3 w-3 ${isChecking ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
  )
}
