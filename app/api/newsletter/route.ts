import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return NextResponse.json(
          { message: 'Already subscribed' },
          { status: 200 }
        )
      } else {
        // Resubscribe
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { subscribed: true }
        })
        return NextResponse.json(
          { message: 'Resubscribed successfully' },
          { status: 200 }
        )
      }
    }

    // New subscriber
    await prisma.newsletterSubscriber.create({
      data: { email, subscribed: true }
    })

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { subscribed: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(subscribers)
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
