import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const countryCode = formData.get('countryCode') as string
    const mobile = formData.get('mobile') as string
    const newPassword = formData.get('newPassword') as string
    const avatarFile = formData.get('avatar') as File | null

    // Find user
    const user = await prisma.publicUser.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      name,
      email,
      countryCode,
      mobile,
    }

    // Handle avatar upload
    if (avatarFile) {
      // TODO: Upload to cloud storage (S3, Cloudinary, etc.)
      // For now, we'll skip avatar saving
      // updateData.avatar = avatarUrl
    }

    // Update user
    await prisma.publicUser.update({
      where: { id: user.id },
      data: updateData
    })

    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
