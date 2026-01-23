import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        countryCode: data.countryCode || '+91',
        mobile: data.mobile,
        service: data.service,
        budget: data.budget,
        message: data.message,
        status: 'new',
        isRead: false,
      }
    })

    // TODO: Send notification to admin panel via WebSocket/SSE

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Submission failed' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, isRead } = await req.json()

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(typeof isRead === 'boolean' && { isRead }),
      }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    )
  }
}
