# 🎨 Design Document
## Project: Laptop Accessories Nepal

---

## 1. Design Inspiration & Vibe
**Theme:** "Modern, Trustworthy, & Tech-Forward"
**Visual Style:** Clean, minimalist, high-contrast, with subtle motion.
**Inspiration References:** 
- Apple Store (Cleanliness, Typography)
- Nothing (Monochrome tech aesthetic)
- Vercel (Developer-centric, dark mode excellence)

### Core Aesthetic Principles:
- **Glassmorphism:** Subtle usage in cards and sticky headers.
- **Micro-interactions:** Smooth hover effects on product cards and buttons.
- **Whitespace:** Generous spacing to allow content to breathe.
- **Typography:** Sans-serif, variable weights for hierarchy.

---

## 2. Color Palette

### Primary Colors
- **Accent Blue:** `#3B82F6` (Trust, Tech, Call to Actions) // Tailwind `blue-500`
- **Dark Background:** `#0F172A` (Rich Navy/Black for Dark Mode) // Tailwind `slate-900`
- **Light Background:** `#F8FAFC` (Clean White/Gray for Light Mode) // Tailwind `slate-50`

### Secondary Colors
- **Success:** `#10B981` (Stock Available, Order Confirmed) // Tailwind `emerald-500`
- **Error/Destructive:** `#EF4444` (Out of Stock, Delete) // Tailwind `red-500`
- **Text Primary:** `#1E293B` (Dark Slate) / `#F1F5F9` (Light Slate in Dark Mode)
- **Text Secondary:** `#64748B` (Muted)

---

## 3. Typography
**Font Family:** `Inter` or `Outfit` (Google Fonts)

### Hierarchy
- **H1 (Page Titles):** Bold, Tight tracking.
- **H2 (Section Headers):** Semi-bold, clear separation.
- **Body:** Regular weight, high readability.
- **Button Text:** Medium/Bold, strictly uppercase or capitalized.

---

## 4. UI Components

### 4.1 Buttons
- **Primary:** Solid Accent Color, rounded-lg, subtle shadow, slight scale on hover.
- **Secondary:** Outline with Accent Color, transparent background.
- **Ghost:** Text only, underline on hover.

### 4.2 Product Cards
- **Container:** White/Dark Slate background, subtle border (`slate-200`/`slate-800`), rounded-xl.
- **Image:** High quality, object-contain or cover, with zoom on hover.
- **Details:** Price in bold, Title truncated to 2 lines, "Add to Cart" quick button.
- **Status Badge:** Small pill badge for "In Stock" / "Out of Stock".

### 4.3 Navigation Bar
- **Style:** Sticky, glassmorphism (backdrop-blur).
- **Elements:**
  - Logo (Left)
  - Search Bar (Center - expanded on focus)
  - Cart Icon with Badge (Right)
  - Admin Link (Hidden or subtle)

### 4.4 Checkout Flow
- **Step-by-step:** Clear visual indicators (Cart -> Details -> Payment).
- **Forms:** Floating labels or clean top labels, validation tick marks.
- **QR Display:** Prominent central card for Static QR, with clear "Upload Proof" dropzone below.

### 4.5 Chatbot Widget
- **Position:** Bottom Right fixed.
- **UI:** Floating circle icon (toggle). Expanded view looks like a modern chat app (iMessage/Messenger style bubbles).
- **Animation:** Slide up entrance.

---

## 5. Responsive Strategy
- **Mobile First:** All grids start at 1 column and expand to 2, 3, 4 on larger screens.
- **Touch Targets:** Minimum 44px for all interactable elements on mobile.
- **Navigation:** Hamburger menu for mobile, inline links for desktop.

---

## 6. Animations (Framer Motion / CSS)
- **Page Transitions:** Subtle fade-in / slide-up.
- **Hover Effects:**
  - Buttons: Lift and brighten.
  - Cards: Slight outline glow or shadow increase.
- **Loading States:** Skeleton loaders matching the component shape.

---

## 7. Assets
- **Icons:** Lucide React (Clean, consistent stroke width).
- **Images:** WebP format for performance, lazy loaded.

---

## 8. Accessibility
- **Contrast:** AA Standard compliance for text.
- **Focus:** Visible focus rings for keyboard navigation.
- **Labels:** Aria-labels for icon-only buttons.
