// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL; // For Next.js, use NEXT_PUBLIC_

export async function fetchRestaurants() {
  const res = await fetch(`${API_URL}/api/restaurants`);
  if (!res.ok) throw new Error("Failed to fetch restaurants");
  return res.json();
}

