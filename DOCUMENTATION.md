# 📘 Laptop Accessories Nepal - Project Documentation

## 🚀 Project Overview
**Laptop Accessories Nepal** is a modern, high-performance e-commerce platform built with **Next.js 15 (App Router)** and styled with **Tailwind CSS**. It features a premium "Warm Orange" aesthetic designed to provide an engaging shopping experience for tech enthusiasts in Nepal.

The platform includes a customer-facing storefront with advanced filtering, search, and a seamless checkout process, alongside a comprehensive Admin Dashboard for managing products, orders, and store settings.

---

## 🛠️ Technology Stack

### **Core Framework:**
- **Next.js 15:** Latest React framework with App Router, Server Components, and optimized image handling.
- **React 19:** Utilizing the latest React features for efficient UI rendering.
- **TypeScript:** Ensuring type safety and better developer experience across the codebase.

### **Styling & UI:**
- **Tailwind CSS v4:** Utility-first CSS framework for rapid and responsive design.
- **Tailwind Merge (`tw-merge`)**: For conflict-free class merging.
- **Class Variance Authority (`cva`)**: For building reusable UI component variants.
- **Radix UI:** Headless UI primitives for accessible components (Dialogs, Selects, ScrollAreas).
- **Lucide React:** Consistent and beautiful icon set.
- **Framer Motion:** Smooth animations and page transitions.
- **Sonner:** Elegant toast notifications.

### **Backend & Services:**
- **Supabase:** Backend-as-a-Service providing PostgreSQL database, Auth, and Storage.
- **Nodemailer:** For sending transactional emails (order confirmations).
- **Recharts:** For data visualization in the Admin Dashboard.

---

## 📂 Project Structure

```
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── adminlogin/     # Protected Admin Dashboard routes
│   │   ├── api/            # API Routes (Chat, Email, Orders)
│   │   ├── cart/           # Shopping Cart & Checkout Page
│   │   ├── shop/           # Product Listing Page
│   │   ├── product/[id]/   # Dynamic Product Details Page
│   │   ├── services/       # Services/Repair Page
│   │   └── globals.css     # Global Styles & Tailwind Configuration
│   ├── components/         # React Components
│   │   ├── ui/             # Reusable UI primitives (Button, Input, Card)
│   │   ├── layout/         # Layout components (Navbar, Footer, Sidebar)
│   │   ├── home/           # Homepage-specific sections (Hero, Features)
│   │   ├── product/        # Product Cards & Displays
│   │   └── filters/        # Shop filtering sidebar components
│   ├── context/            # React Context providers (Cart, Settings)
│   ├── lib/                # Utility functions & Configurations
│   │   ├── supabase.ts     # Supabase client configuration
│   │   ├── email.ts        # Nodemailer configuration and templates
│   │   └── util.ts         # Helper functions
│   └── types/              # TypeScript type definitions
├── middleware.ts           # Route protection (Admin Auth)
└── package.json            # Project dependencies and scripts
```

---

## 🔐 Environment Variables

To run this project, you will need to add the following variables to your `.env.local` file:

### **Supabase Configuration**
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon/Public Key.
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin operations (Server-side only).

### **Email Configuration (Nodemailer)**
- `GMAIL_USER`: The Gmail address used to send emails.
- `GMAIL_APP_PASSWORD`: A Gmail App Password (not the account password).
- `ADMIN_EMAIL`: The email address where admin notifications (new orders) are sent.

### **Security**
- `ADMIN_PASSWORD`: The password required to access the admin dashboard. Defaults to `admin123`.
- `NEXT_PUBLIC_BASE_URL`: The base URL of the application (e.g., `http://localhost:3000` or `https://yourdomain.com`).

---

## 🛡️ Authentication & Authorization

### **Admin Protection**
The project uses a custom **Middleware** implementation in `middleware.ts` to protect admin routes (`/adminlogin/:path*`).
- **Mechanism**: Cookie-based authentication.
- **Session**: A cookie named `admin_session` is set upon successful login at `/adminlogin`.
- **Validation**: The middleware checks if the `admin_session` cookie value matches the `ADMIN_PASSWORD` defined in environment variables.

### **Login Flow**
1. User visits `/adminlogin`.
2. Enters the password.
3. If correct, a cookie is saved, and the user is redirected to `/adminlogin/dashboard`.
4. All subsequent requests to `/adminlogin/...` are validated by the middleware.

---

## 📧 Transactional Email System

The system uses **Nodemailer** with Gmail SMTP for all automated communications. Logic is centralized in `src/lib/email.ts`.

### **Supported Emails:**
1. **Order Confirmation**: Sent to the customer immediately after a successful checkout.
2. **New Order Alert**: Sent to the admin to notify them of a new purchase.
3. **Contact Form Auto-Reply**: Acknowledgement sent to customers who use the contact form.
4. **Contact Form Notification**: Detailed message sent to the admin.
5. **Repair Booking Confirmation**: Sent to customers who book a service/repair.
6. **Order Status Updates**: Notifications for Payment Verification and Shipping.

---

## ✨ Key Features & Business Logic

### **1. 🛍️ Customer Storefront**
- **Dynamic Category Navigation**: Mega-menu in the navbar fetches categories dynamically from Supabase.
- **Persistent Cart**: Managed via `CartContext`, allowing users to add/remove items and track quantities across sessions.
- **Checkout Logic**: 
  - Collects customer info and delivery address.
  - Generates a unique Order ID.
  - Deducts stock from the database (server-side).
  - Triggers confirmation emails.

### **2. 🎨 Theming System**
The project uses a **Semantic Theming** approach:
- **Design Tokens**: Defined in `src/app/globals.css` using CSS variables (`--primary`, `--background`, `--card`, etc.).
- **Tailwind Extension**: These variables are mapped to Tailwind classes in the config.
- **Consistency**: All UI components in `src/components/ui` strictly use these semantic variables, making it easy to swap themes globally.

---

## 🗄️ Database Schema (Supabase)

### **Primary Tables**
- **products**: Stores all inventory details, price, images, and features.
- **categories**: Defines product categories with icons and slugs.
- **orders**: Main order records with status tracking.
- **order_items**: Line items for each order.
- **settings**: Global store settings like name, logo, and social links.

---

## 🚢 Deployment (Vercel)

The app is fully compatible with Vercel's automated builds:
1. Connect your GitHub repo.
2. Set the **Environment Variables** listed above in the Vercel dashboard.
3. Deploy. The middleware and server components will automatically utilize Vercel's edge/serverless infrastructure.

---

**Developed for Laptop Accessories Nepal**  
*Quality Tech, Delivered.*
