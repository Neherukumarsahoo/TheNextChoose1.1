import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    try {
        // Create Super Admin
        const hashedPassword = await bcrypt.hash('nks8260840527', 10)

        const superAdmin = await prisma.adminUser.upsert({
            where: { email: 'neherukumar1@gmail.com' },
            update: {
                password: hashedPassword, // Ensure password is updated if user exists
                role: 'SUPER_ADMIN'     // Ensure role is correct (string)
            },
            create: {
                email: 'neherukumar1@gmail.com',
                password: hashedPassword,
                name: 'Neheru Kumar',
                role: 'SUPER_ADMIN',
                active: true,
            },
        })

        console.log('✅ Super Admin created:', superAdmin.email)

        // Create regular Admin
        const regularAdmin = await prisma.adminUser.upsert({
            where: { email: 'manager@thenextchoose.com' },
            update: {},
            create: {
                email: 'manager@thenextchoose.com',
                password: hashedPassword,
                name: 'Campaign Manager',
                role: 'ADMIN',
                active: true,
            },
        })

        console.log('✅ Regular Admin created:', regularAdmin.email)

        // Create Platform Settings
        const settings = await prisma.platformSettings.upsert({
            where: { id: 'settings' },
            update: {},
            create: {
                id: 'settings',
                platformName: 'TheNextChoose',
                commission: 20,
                currency: 'USD',
            },
        })

        console.log('✅ Platform Settings created')

        console.log('\n🎉 Seed completed!\n')
        console.log('Login credentials:')
        console.log('Super Admin: admin@thenextchoose.com / admin123')
        console.log('Admin: manager@thenextchoose.com / admin123')
    } catch (error) {
        console.error('Error seeding:', error)
        throw error
    }
}

main()
    .catch((e) => {
        console.error('Fatal error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
