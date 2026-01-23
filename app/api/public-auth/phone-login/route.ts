import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, countryCode, mobile, password } = body

    console.log('Login attempt:', { name, countryCode, mobile })

    // Validate
    if (!name || !mobile || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const phoneNumber = `${countryCode || '+91'}${mobile}`

    // Check if user exists by mobile number
    const existingUser = await prisma.publicUser.findFirst({
      where: { 
        mobile: mobile,
        countryCode: countryCode || '+91'
      }
    })

    if (existingUser) {
      console.log('Existing user found:', existingUser.id)
      // User exists - login
      return NextResponse.json(
        { message: 'Login successful', user: existingUser },
        { status: 200 }
      )
    } else {
      console.log('Creating new user')
      // New user - create account
      const newUser = await prisma.publicUser.create({
        data: {
          name,
          email: `${mobile}@phone.user`, // Unique email based on mobile
          countryCode: countryCode || '+91',
          mobile,
          provider: 'phone',
          emailVerified: false,
          phoneVerified: false,
        }
      })

      console.log('New user created:', newUser.id)

      return NextResponse.json(
        { message: 'Account created and logged in', user: newUser },
        { status: 201 }
      )
    }
  } catch (error: any) {
    console.error('Phone login error:', error)
    return NextResponse.json(
      { error: 'Login failed: ' + (error.message || 'Unknown error') },
      { status: 500 }
    )
  }
}
