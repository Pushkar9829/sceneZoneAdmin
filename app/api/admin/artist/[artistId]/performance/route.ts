import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000/api'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const url = `${BACKEND_URL}/admin/artist/${artistId}/performance`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || 'Upload failed' },
        { status: response.status }
      )
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Performance upload proxy error:', error)
    return NextResponse.json(
      { message: 'Failed to upload video' },
      { status: 500 }
    )
  }
}
