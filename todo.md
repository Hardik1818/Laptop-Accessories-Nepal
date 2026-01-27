# ✅ Project Todo List
## Project: Laptop Accessories Nepal

---

## 1. Setup & Config
- [ ] **Initialize Git**
  - [ ] Run `git init`
  - [ ] Create `.gitignore` (node_modules, .env, etc.)
  - [ ] Initial commit
- [ ] **Setup Next.js Project**
  - [ ] Run `npx create-next-app@latest` with TypeScript, Tailwind, ESLint
  - [ ] Clean up default boilerplate code
- [ ] **Install Core Dependencies**
  - [ ] `lucide-react` (Icons)
  - [ ] `framer-motion` (Animations - standard for vibe coding)
  - [ ] `clsx`, `tailwind-merge` (Utility handling)
  - [ ] `@supabase/supabase-js` (Database)
- [ ] **Configure Design System**
  - [ ] Setup `globals.css` with CSS variables for colors (from Design Doc)
  - [ ] Update `tailwind.config.ts` to use those variables
  - [ ] Configure Fonts (Inter/Outfit)
- [ ] **Environment Setup**
  - [ ] Create `.env.local`
  - [ ] Add Supabase keys (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)

---

## 2. Database & Backend (Supabase)
- [ ] **Database Schema**
  - [ ] Create `products` table (id, name, price, description, images, category, stock, created_at)
  - [ ] Create `orders` table (id, customer_name, phone, address, total, status, payment_method, proof_url, created_at)
  - [ ] Create `order_items` table (link orders to products)
  - [ ] Create `store_settings` table (policies, contact info)
- [ ] **Storage Buckets**
  - [ ] Create `products` bucket (Public)
  - [ ] Create `payment_proofs` bucket (Private/Authenticated)
- [ ] **Row Level Security (RLS)**
  - [ ] Enable RLS on all tables
  - [ ] Policy: Public can read products
  - [ ] Policy: Public can insert orders (but not update)
  - [ ] Policy: Admin can do everything

---

## 3. Core Components (Frontend)
- [ ] **UI Base Components (Shadcn-like or Custom)**
  - [ ] Button
  - [ ] Input / Textarea
  - [ ] Card
  - [ ] Badge
  - [ ] Modal / Dialog
- [ ] **Layout Components**
  - [ ] `Navbar` (Logo, Search, Cart, Links)
  - [ ] `Footer` (Copyright, Links)
  - [ ] `Container` (Max-width wrapper)
- [ ] **Product Components**
  - [ ] `ProductCard` (Grid item)
  - [ ] `ProductImageGallery`
  - [ ] `AddToCartButton`

---

## 4. Features: Customer View
- [ ] **Home Page**
  - [ ] Hero Section (Welcome + Vibe)
  - [ ] Featured Products / Categories
- [ ] **Product Listing**
  - [ ] Category Filter
  - [ ] Search Functionality
  - [ ] Grid Layout
- [ ] **Product Detail Page**
  - [ ] Full info display
  - [ ] Related products
- [ ] **Cart Functionality**
  - [ ] State management (Context or Zustand)
  - [ ] Add/Remove items
  - [ ] Calculate total
  - [ ] Slide-over or discrete Cart page
- [ ] **Checkout Flow**
  - [ ] User Details Form (Name, Phone, Address)
  - [ ] Payment Method Selection (QR vs COD)
  - [ ] **QR Logic:**
    - [ ] Display Static QR Image
    - [ ] File Input for Payment Proof
    - [ ] Upload to Supabase Storage
  - [ ] **Order Submission:**
    - [ ] Create Order record
    - [ ] Clear Cart
    - [ ] Redirect to Success Page

---

## 5. Features: Admin Panel
- [ ] **Admin Authentication**
  - [ ] Login Page (Supabase Auth - Email/Password)
  - [ ] Protected Route Wrapper
- [ ] **Dashboard**
  - [ ] Overview Stats (Total Orders, Pending Payments)
- [ ] **Order Management**
  - [ ] List all orders (Filter by status)
  - [ ] Order Detail View
  - [ ] **Action:** Verify Payment (View screenshot -> Mark Paid)
  - [ ] **Action:** Update Status (Shipped, Delivered)
- [ ] **Product Management**
  - [ ] Product List
  - [ ] Add/Edit Product Form
  - [ ] Image Upload (Supabase)

---

## 6. Features: Chatbot
- [ ] **Chat Widget UI**
  - [ ] Floating button
  - [ ] Chat window component
- [ ] **Backend API**
  - [ ] `/api/chat` route
  - [ ] Logic: Retrieve context (products/policies)
  - [ ] Logic: Call LLM (OpenAI/Gemini)
  - [ ] Return streamed response

---

## 7. Polish & Vibe
- [ ] **Animations**
  - [ ] Page transitions
  - [ ] Micro-interactions on buttons/cards
- [ ] **SEO**
  - [ ] Metadata (Title, Description)
  - [ ] Open Graph tags
- [ ] **Testing**
  - [ ] Manual walk-through of Checkout
  - [ ] Mobile responsiveness check

---

## 8. Deployment
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add Environment Variables in Vercel
- [ ] Verify Production Build
