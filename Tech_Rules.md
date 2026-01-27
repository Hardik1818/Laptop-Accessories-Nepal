# ⚙️ Tech Rules (Tech Stack Definition)
## Project: Laptop Accessories Nepal

---

## 1. Purpose of This Document

This document defines the **locked technology stack and development rules** for the project.  
It acts as a single source of truth for **how the system is built**, ensuring consistency, scalability, and maintainability.

Once finalized, these rules **must not change mid-project**.

---

## 2. Programming Languages

### Frontend
- **TypeScript**
  - Used for all frontend and backend code
  - Provides type safety and fewer runtime errors

### Backend
- **TypeScript**
  - Used in API routes and server logic

> ❗ No JavaScript-only files for core logic (TypeScript only).

---

## 3. Frameworks & Libraries

### Frontend Framework
- **Next.js (App Router)**
  - Handles routing, rendering, and backend APIs
  - Single unified codebase

### UI & Styling
- **Tailwind CSS**
  - Utility-first styling
  - No heavy UI frameworks (Bootstrap, Material UI ❌)

### State & Data Handling
- Native React state
- Server Components & Server Actions where applicable

---

## 4. Backend Architecture

- **Next.js API Routes**
- No separate backend server (no Express/Nest)
- Backend logic runs server-side only
- Business rules enforced in backend, not frontend

---

## 5. Database

### Primary Database
- **Supabase (PostgreSQL)**

Used for:
- Products
- Orders
- Store settings
- Admin data

### Rules
- SQL-based schema
- No NoSQL databases
- No client-side direct writes to sensitive tables

---

## 6. File Storage

- **Supabase Storage**

Used for:
- Product images
- QR image
- Payment proof screenshots

Rules:
- Public read for product images
- Restricted access for payment proof uploads
- No third-party image hosting (Cloudinary ❌)

---

## 7. Authentication & Authorization

### Admin Authentication
- **Supabase Auth**
- Only admin users exist
- No customer accounts

### Authorization
- Role-based access (admin only)
- Enforced via:
  - Backend checks
  - Supabase Row Level Security (RLS)

---

## 8. Chatbot Technology

### Bot Architecture
- **Retrieval-based + LLM**
- Database-first approach (no hallucination)

### Rules
- Bot reads only:
  - Products table
  - Store policies
- Bot cannot:
  - Write to database
  - Confirm payments
  - Modify orders

### AI Provider
- External LLM API (OpenAI / Gemini)
- No fine-tuning required

---

## 9. Payments

### Supported Methods
- Static QR Payment
- Cash on Delivery (COD)

### Rules
- No payment gateway integration
- No automatic payment confirmation
- Manual admin verification only
- No auto-cancellation logic

---

## 10. Hosting & Deployment

### Frontend + Backend
- **Vercel**
  - Serverless deployment
  - CI/CD via GitHub

### Database & Storage
- **Supabase Cloud**

---

## 11. Environment Configuration

All secrets must be stored in environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LLM_API_KEY`

❗ No secrets in frontend code.

---

## 12. Coding Standards & Constraints

### General Rules
- Clean, readable code
- Small, reusable components
- Meaningful variable names

### Restrictions
- No over-engineering
- No unused libraries
- No premature optimization

### Error Handling
- Graceful user-facing messages
- Detailed logs server-side only

---

## 13. Performance & Scalability Constraints

- Designed for <10 orders/day initially
- Must support smooth scaling to moderate traffic
- Manual workflows preferred over automation

---

## 14. Out of Scope Technologies

Explicitly not allowed:
- Payment gateways (Khalti, eSewa APIs)
- Mobile apps (Android/iOS)
- Microservices architecture
- WebSockets / real-time systems
- Blockchain / crypto payments

---

## 15. Summary

This Tech Rules document ensures:
- Clear technical direction
- Reduced confusion during development
- AI-generated code matches the chosen stack
- Long-term maintainability

This document must be followed throughout development.

---
