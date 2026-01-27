# 🏗️ System Architecture Document
## Project: Laptop Accessories Nepal

---

## 1. Overview

This document describes the **system architecture** of the *Laptop Accessories Nepal* ecommerce platform.  
The system is designed as a **single web application** that includes the public store, admin panel, backend APIs, and chatbot logic.

The architecture prioritizes:
- Simplicity
- Manual control
- Security
- Suitability for a local Nepali business

---

## 2. High-Level Architecture

The system consists of the following major components:

- **Frontend (Next.js)**  
  - Public ecommerce pages  
  - Admin panel (`/admin`)  
  - Chatbot UI  

- **Backend (Next.js API routes / server actions)**  
  - Order handling  
  - Admin actions  
  - Chatbot orchestration  

- **Database & Storage (Supabase)**  
  - PostgreSQL database  
  - File storage for images and payment proofs  

- **AI Service (LLM)**  
  - Used only for chatbot responses  

---

## 3. Component Breakdown

### 3.1 Frontend
- Home page
- Product listing & detail pages
- Cart & checkout
- Static QR display
- Payment proof upload
- Chatbot widget
- Admin dashboard (protected)

### 3.2 Backend
- Order creation APIs
- Payment proof attachment
- Admin verification actions
- Stock update logic
- Chatbot API (`/api/chat`)

### 3.3 Database (Supabase)
Main tables:
- `products`
- `orders`
- `store_settings`

Optional:
- `admin_audit_logs`
- `chat_logs`

### 3.4 Storage
- Product images
- QR image
- Payment screenshots

---

## 4. Data Flow

### 4.1 Product Browsing
1. User opens website
2. Frontend fetches products from Supabase
3. Products are displayed with price and stock

---

### 4.2 QR Payment Order Flow
1. User places order with QR payment
2. Order stored with `PAYMENT_PENDING`
3. User uploads payment screenshot
4. Screenshot stored in Supabase Storage
5. Order updated to `PROOF_UPLOADED`
6. Admin verifies payment manually
7. Order marked as `PAID`
8. Stock is reduced

---

### 4.3 Cash on Delivery Flow
1. User selects COD
2. Order stored with `COD_PENDING`
3. Admin confirms order
4. Stock is reduced
5. Delivery completed
6. Order marked `DELIVERED`

---

### 4.4 Chatbot Flow
1. User sends message
2. Backend searches product database
3. Store policies are fetched
4. Relevant data sent to AI model
5. AI generates response
6. Response and product cards shown to user

---

## 5. Security Architecture

### Public Access
- Read-only access to products and store info
- Order creation through APIs only

### Admin Access
- Admin login required
- Only admin can:
  - Verify payments
  - Update stock
  - Manage products
  - Update order status

### Enforcement
- Supabase Row Level Security (RLS)
- Backend role checks
- No direct client-side writes

---

## 6. Key Design Rules

- No customer accounts
- No payment gateway integration
- Static QR only
- Manual payment verification
- No auto-cancel of unpaid orders
- Stock updates only after admin confirmation
- Chatbot is read-only

---

## 7. Deployment Architecture

- Hosting: Vercel
- Database & Storage: Supabase
- Chatbot AI: External LLM API
- Environment variables used for secrets

---

## 8. Summary

This architecture ensures:
- Full control for the shop owner
- Simple and reliable workflows
- Low operational complexity
- Easy future enhancements

This document serves as the **technical blueprint** for implementation.

---
