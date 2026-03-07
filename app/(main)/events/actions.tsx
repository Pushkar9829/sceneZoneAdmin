'use server'

import { fetchApi } from "@/lib/api"
import { cookies } from "next/headers"
import {EventProfile, BookingDetail, ApiResponse} from "./schema"

// Define a standard return type for your actions to keep TS happy
type ActionResponse<T> = Promise<{
  success: boolean
  data?: T
  error?: string
}>

export async function getEventsAction(): ActionResponse<EventProfile[]> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  try {
    // Ensure the generic passed to fetchApi matches the expected backend response structure
    const response = await fetchApi<ApiResponse<EventProfile[]>>('/admin/get-all-events', {
      headers: { "Authorization": `Bearer ${token}` },
      cache: 'no-store'
    })
    return { success: true, data: response.data }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Get Events Action Error:", error)
    return { success: false, error: error.message || "Failed to fetch events" }
  }
}

export async function getEventBookingsAction(eventId: string): ActionResponse<BookingDetail[]> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  try {
    const response = await fetchApi<ApiResponse<BookingDetail[]>>(`/admin/get-event-bookings/${eventId}`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: 'no-store'
    })

    console.log("Bookings fetched for event:", eventId, response.data)

    return { success: true, data: response.data }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Get Bookings Action Error:", error)
    return { success: false, error: error.message || "Failed to fetch bookings" }
  }
}