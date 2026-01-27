# 📄 Product Requirement Document (PRD)
## Project: Laptop Accessories Nepal

---

## 1. Problem Statement

Local laptop accessories shops in Kathmandu depend mostly on walk-in customers, phone calls, and social media messages. Customers frequently face issues such as:

- Not knowing if a product is available
- Repeatedly asking for price and compatibility
- No trusted, structured online store
- Confusion around payment options like QR or Cash on Delivery

From the shop owner’s side:
- Orders are unstructured
- Payment confirmation is manual and error-prone
- Product inquiries consume time
- No centralized system for orders and stock

There is a need for a simple, trustworthy ecommerce system that reflects how a local Nepali shop actually operates.

---

## 2. Product Vision

Laptop Accessories Nepal is a lightweight ecommerce website for a physical laptop accessories shop located in Nacche Galli, Kathmandu.

The goal is to:
- Allow customers to browse and order products online
- Support Nepali-friendly payments (static QR and COD)
- Give full manual control to the shop owner
- Reduce repetitive customer queries using a smart chatbot

The system prioritizes simplicity, trust, and manual control over heavy automation.

---

## 3. Target Users

### 3.1 Customers
- Laptop users in Kathmandu
- Students, office workers, gamers
- Users who prefer:
  - Cash on Delivery
  - QR payment via mobile banking
- Users seeking quick info on price, availability, and compatibility

### 3.2 Admin (Shop Owner)
- Single shop owner
- Manages products, stock, orders, and payments
- Uses the system daily from desktop or mobile

---

## 4. Core Features

### 4.1 Product Catalog
- Category-based product listing
- Product detail pages showing:
  - Price in NPR
  - Stock availability
  - Warranty
  - Compatibility
- Real product images

---

### 4.2 Cart & Checkout
- Add to Cart
- Buy Now
- Guest checkout (no user accounts)
- Customer provides:
  - Name
  - Phone number
  - Delivery address

---

### 4.3 Payment Methods

#### A) QR Payment (Static QR)
- Static QR image shown at checkout
- User scans and pays
- User uploads payment screenshot
- Admin manually verifies payment
- No automatic confirmation
- No auto-cancellation of unpaid orders

#### B) Cash on Delivery (COD)
- Available inside Kathmandu Valley
- Self-delivery by shop
- Payment collected at delivery

---

### 4.4 Admin Panel
- Admin panel exists inside the same website (`/admin`)
- Single admin access
- Admin can:
  - Add/edit products
  - Update stock
  - View all orders
  - Verify QR payment proofs
  - Update order status (confirmed, shipped, delivered, cancelled)
- Admin panel is the single source of truth

---

### 4.5 Order Management
- Unique Order ID for every order
- Order statuses:
  - New
  - Payment Pending
  - Proof Uploaded
  - Paid
  - Confirmed
  - Shipped
  - Delivered
  - Cancelled
- Stock is reduced only after admin confirmation

---

### 4.6 Website Chatbot
- Embedded chatbot on website
- Answers:
  - Product availability
  - Price
  - Warranty
  - Compatibility
  - COD, QR, and delivery info
- Bot reads only from database and store policies
- Supports English and Nepali
- Bot cannot:
  - Confirm payments
  - Modify orders
  - Access admin panel

---

## 5. Non-Features (Out of Scope)

The following are intentionally excluded:

- User accounts or login for customers
- Payment gateway integrations (Khalti, eSewa APIs)
- Automatic payment confirmation
- Auto-cancellation of unpaid orders
- Online wallets or refunds
- Third-party delivery integrations
- Multi-vendor marketplace
- AI-based payment or stock decisions

---

## 6. Success Metrics

### Business
- Reduced phone and message-based inquiries
- Orders placed without manual coordination

### Technical
- Accurate stock visibility
- No false payment confirmations
- Stable admin control

### User Experience
- Product info found within 30 seconds
- Clear checkout flow
- Correct chatbot responses

---

## 7. Constraints & Assumptions

- Less than 10 orders per day initially
- Manual payment verification by admin
- Users may not be tech-savvy
- Trust and clarity are prioritized over automation

---

## 8. Future Considerations (Not in Scope)

- Payment gateway integration
- Order tracking using Order ID
- Advanced chatbot search
- SMS notifications

---

## 9. Summary

Laptop Accessories Nepal is a production-ready ecommerce system designed for a real local Nepali shop.

The system focuses on:
- Manual control
- Clear workflows
- Low complexity
- High trust

This document serves as the single source of truth for development.

---
