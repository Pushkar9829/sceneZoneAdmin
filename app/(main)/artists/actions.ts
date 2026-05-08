'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { fetchApi } from "@/lib/api"

// VERIFY ARTIST
export async function verifyArtistAction(artistAuthId: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  if (!token) return { error: "Unauthorized" }

  try {
    await fetchApi(`/artist/verify-artist/${artistAuthId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })

    revalidatePath("/artists")
    return { success: true, message: "Artist verified successfully" }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message || "Failed to verify artist" }
  }
}

// DELETE ARTIST
export async function deleteArtistAction(artistAuthId: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  if (!token) return { error: "Unauthorized" }

  try {
    await fetchApi(`/admin/delete-artist/${artistAuthId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })

    revalidatePath("/artists")
    return { success: true, message: "Artist deleted successfully" }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message || "Failed to delete artist" }
  }
}

// UPDATE ARTIST (admin: charges, type, email, address, etc.)
export async function updateArtistAction(
  artistId: string,
  data: {
    fullName?: string
    email?: string
    dob?: string
    address?: string
    contactNumber?: string
    artistType?: string
    artistSubType?: string
    instrument?: string
    budget?: number
    isCrowdGuarantee?: boolean
  }
) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  if (!token) return { error: "Unauthorized" }

  try {
    await fetchApi(`/admin/update-artist/${artistId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })

    revalidatePath("/artists")
    return { success: true, message: "Artist updated successfully" }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message || "Failed to update artist" }
  }
}