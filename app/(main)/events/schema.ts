import { z } from "zod"

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// Matches the "combinedData" structure from backend
export const bookingDetailSchema = z.object({
  _id: z.string(),
  payment_status: z.string(),
  subtotal: z.number().optional(),
  totalAmount: z.number().optional(),
  artist: z.object({
    fullName: z.string(),
    mobileNumber: z.string(),
    email: z.string().optional(),
    profileImageUrl: z.string().nullable(),
  }),
})

export const eventSchema = z.object({
  _id: z.string(),
  eventName: z.string(),
  venue: z.string(),
  budget: z.number(),
  status: z.string(),
  isCancelled: z.boolean(),
  isCompleted: z.boolean(),
  eventDateTime: z.array(z.string()),
  hostId: z.object({
    _id: z.string(),
    fullName: z.string().optional(),
    mobileNumber: z.string().optional(),
    email: z.string().optional(),
  }).optional().nullable(),
})

export type EventProfile = z.infer<typeof eventSchema>
export type BookingDetail = z.infer<typeof bookingDetailSchema>