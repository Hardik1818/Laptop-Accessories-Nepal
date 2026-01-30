# 🏗️ Backend Implementation Plan

We are now moving from the Frontend Design phase to the **Full Stack Integration** phase.

## 1. Database Setup (Supabase)
- [ ] **Run Schema Migration**: Apply the provided SQL schema to your Supabase project.
- [ ] **Seed Data**: Create a script to populate the database with our "Mock Data" so the site isn't empty.

## 2. Connect Frontend to Backend
- [ ] **Home Page**: Fetch "Trending" and "New Arrival" products from `products` table.
- [ ] **Shop Page**: Implement real filtering (Category, Search, Price) using Supabase queries.
- [ ] **Product Page**: specific product data fetching using `id`.

## 3. Cart & Checkout Logic 
- [ ] **Checkout**: Connect the Checkout Form to the `orders` table.
- [ ] **Storage**: Implement real file upload for "Payment Proof" (QR Code screenshots).

## 4. Admin Dashboard (Future)
- [ ] **Product Entry**: Form to add new products to the DB.
- [ ] **Order Management**: View and update order status.

---

### 🟢 Immediate Action
Please execute the SQL inside `supabase_schema.sql` in your Supabase SQL Editor.
Once done, I will provide a script to upload our existing mock products so you don't have to manual entry them.
