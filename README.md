# TheNextChoose Admin Panel MVP

A complete influencer marketing management platform with role-based access control.

## Features

### Authentication & Authorization
- **Secure Login**: Email/password authentication with NextAuth v5
- **Role-Based Access**: Two roles (Super Admin, Admin) with granular permissions
- **Session Management**: JWT-based sessions with automatic token refresh

### Core Modules

#### Dashboard
- Business metrics overview (influencers, brands, campaigns, revenue)
- Role-specific views (Super Admin sees financial data, Admin sees work metrics)
- Quick action cards for common tasks

#### Influencer Management
- Add, edit, and view influencers
- Track metrics (followers, engagement, avg views)
- Pricing management (reel, story, post prices)
- Approval workflow (Super Admin only)
- Status management (active/inactive)

#### Brand Management
- Add and manage client brands
- Contact information tracking
- Budget range tracking
- Online presence (Instagram, website)

#### Campaign Management
- Create campaigns with multiple influencers
- Assign influencers with custom pricing
- Track campaign status (Draft → Active → Completed)
- Super Admin approval workflow for pricing
- Platform support (Instagram, YouTube, TikTok)
- Content type tracking (Reel, Story, Post)

#### Payments & Commission
- Brand payment tracking (incoming)
- Influencer payout management (outgoing)
- Commission calculation
- Payment status tracking (Pending, Paid, Hold)
- Profit visibility (Super Admin only)

#### Settings (Super Admin Only)
- Platform name configuration
- Commission percentage
- Currency settings
- Admin user management

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Notifications**: Sonner

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

1. Navigate to the admin folder:
```bash
cd "f:\TheNextChoose 1.1\admin"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Set up the database:
```bash
npm run db:push
npm run db:seed
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

### Default Login Credentials

**Super Admin**
- Email: admin@thenextchoose.com
- Password: admin123

**Regular Admin**
- Email: manager@thenextchoose.com
- Password: admin123

## Role Permissions

### Super Admin Can:
- ✅ Everything Admin can do, plus:
- ✅ Approve influencers
- ✅ Approve campaign pricing
- ✅ View platform profit and financial metrics
- ✅ Change commission percentage
- ✅ Manage admin users (add/edit)
- ✅ Access settings

### Admin Can:
- ✅ Add/edit influencers (pending approval)
- ✅ Add/edit brands
- ✅ Create and manage campaigns
- ✅ Assign influencers to campaigns
- ✅ Track payments
- ❌ Cannot approve influencers
- ❌ Cannot approve campaign pricing
- ❌ Cannot view profit data
- ❌ Cannot change commission
- ❌ Cannot manage admin users

## Database Schema

### Models
- **AdminUser**: Admin panel users with roles
- **Influencer**: Creator network with metrics and pricing
- **Brand**: Client companies
- **Campaign**: Marketing campaigns with influencer assignments
- **CampaignInfluencer**: Junction table for campaign-influencer relationships
- **Payment**: Financial transactions (brand payments and influencer payouts)
- **PlatformSettings**: Global platform configuration

## MVP Limitations

✅ **Included in MVP:**
- Complete CRUD for all entities
- Role-based access control
- Manual workflow management
- Payment tracking

❌ **Intentionally Excluded:**
- No influencer-facing portal
- No brand-facing portal  
- No payment gateway integration
- No automated analytics
- No email/WhatsApp automation
- No password reset flow (manual admin reset)

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma Client
npm run db:push      # Sync schema to database
npm run db:seed      # Seed initial data
```

## Project Structure

```
admin/
├── app/
│   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── dashboard/    # Main dashboard
│   │   ├── influencers/  # Influencer management
│   │   ├── brands/       # Brand management
│   │   ├── campaigns/    # Campaign management
│   │   ├── payments/     # Payment tracking
│   │   ├── settings/     # Platform settings
│   │   └── admin-users/  # Admin user management
│   ├── api/              # API routes
│   ├── login/            # Login page
│   └── layout.tsx        # Root layout
├── components/
│   ├── layout/           # Sidebar, Header
│   ├── ui/               # shadcn/ui components
│   └── RoleGuard.tsx     # Permission-based rendering
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   ├── permissions.ts    # Role permission system
│   └── utils.ts          # Utility functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
└── middleware.ts         # Route protection
```

## Next Steps

1. Test all CRUD operations
2. Verify role-based permissions work correctly
3. Test complete campaign workflow
4. Add sample data for demo
5. Deploy to production

## Support

For issues or questions, contact your development team.
