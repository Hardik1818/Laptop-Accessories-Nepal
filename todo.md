# ✅ Project Todo List
## Project: Laptop Accessories Nepal

---

## 1. Setup & Config
- [x] **Initialize Git**
  - [x] Run `git init`
  - [x] Create `.gitignore` (node_modules, .env, etc.)
  - [x] Initial commit
- [x] **Setup Next.js Project**
  - [x] Run `npx create-next-app@latest` with TypeScript, Tailwind, ESLint
  - [x] Clean up default boilerplate code
- [x] **Install Core Dependencies**
  - [x] `lucide-react` (Icons)
  - [x] `framer-motion` (Animations - standard for vibe coding)
  - [x] `clsx`, `tailwind-merge` (Utility handling)
  - [x] `@supabase/supabase-js` (Database)
- [x] **Configure Design System**
  - [x] Setup `globals.css` with CSS variables for colors (from Design Doc)
  - [x] Update `tailwind.config.ts` to use those variables
  - [x] Configure Fonts (Inter/Outfit)
- [x] **Environment Setup**
  - [x] Create `.env.local`
  - [x] Add Supabase keys (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)

---

## 2. Database & Backend (Supabase)
- [x] **Database Schema**
  - [x] Create `products` table (id, name, price, description, images, category, stock, created_at)
  - [x] Create `orders` table (id, customer_name, phone, address, total, status, payment_method, proof_url, created_at)
  - [x] Create `order_items` table (link orders to products)
  - [x] Create `store_settings` table (policies, contact info)
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
- [x] **UI Base Components (Shadcn-like or Custom)**
  - [x] Button
  - [x] Input / Textarea
  - [x] Card
  - [x] Badge
  - [ ] Modal / Dialog (Will implement when needed)
- [x] **Layout Components**
  - [x] `Navbar` (Logo, Search, Cart, Links)
  - [x] `Footer` (Copyright, Links)
  - [x] `Container` (Max-width wrapper - using utility classes instead)
- [x] **Product Components**
  - [x] `ProductCard` (Grid item)
  - [ ] `ProductImageGallery` (For detail page)
  - [ ] `AddToCartButton` (Logic pending cart context)

---

## 4. Features: Customer View
- [x] **Home Page**
  - [x] Hero Section (Welcome + Vibe)
  - [x] Featured Products / Categories
- [ ] **Product Listing**
  - [ ] Category Filter
  - [ ] Search Functionality
  - [ ] Grid Layout
- [ ] **Product Detail Page**
  - [ ] Full info display
  - [ ] Related products
- [x] **Cart Functionality**
  - [x] State management (Context or Zustand)
  - [x] Add/Remove items
  - [x] Calculate total
  - [x] Slide-over or discrete Cart page
- [x] **Checkout Flow**
  - [x] User Details Form (Name, Phone, Address)
  - [x] Payment Method Selection (QR vs COD)
  - [x] **QR Logic:**
    - [x] Display Static QR Image
    - [x] File Input for Payment Proof
    - [ ] Upload to Supabase Storage (Mocked for now)
  - [x] **Order Submission:**
    - [ ] Create Order record (Mocked for now)
    - [x] Clear Cart
    - [x] Redirect to Success Page

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
- [x] **Product Management**
  - [x] Product List
  - [x] Add/Edit Product Form
  - [x] Image Upload (Supabase - UI ready, logic Mocked)

---

## 6. Features: Chatbot
- [x] **AI Chatbot (Vibe Bot)**
  - [x] Chat Widget UI (Floating)
  - [x] Basic "Rule-based" Logic (Delivery, Payment info)
  - [ ] Connect to Real LLM (DeepSeek/OpenAI - Optional for MVP)
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
