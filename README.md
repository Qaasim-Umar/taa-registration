# NATCON 2026 - Event Registration Website

7th Annual National Conference - Registration Portal
**Theme:** Knowledge with Purpose: Raising Responsible Muslim Leaders

## Overview

This is a frontend-only prototype for the NATCON 2026 event registration system. It allows users to register themselves or multiple people for the conference with a polished, professional user experience.

## Features

✅ **Landing Page** - Event information and registration CTA
✅ **Multi-Attendee Registration** - Register 1-50 people at once
✅ **Dynamic Forms** - Attendee-specific registration forms
✅ **Form Validation** - Client-side validation with clear error messages
✅ **Review Step** - Verify all information before submission
✅ **QR Code Generation** - Individual QR codes for each attendee
✅ **Print/Download** - Save registration tickets
✅ **Responsive Design** - Mobile-first, works on all devices
✅ **Nigerian States** - Complete list of all 36 states + FCT

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **QR Codes:** qrcode library
- **No Backend** - Pure frontend prototype

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## User Flow

### Step 1: Landing Page
- Event information and details
- Registration fee (₦8,000 per attendee)
- "Register Now" call-to-action

### Step 2: Attendee Count
- Select number of people to register (1-50)
- View calculated total amount
- Quick select buttons for common numbers

### Step 3: Registration Forms
- Individual form for each attendee
- Required fields:
  - Full Name
  - Email Address
  - Phone Number
  - State (dropdown)
  - Address
  - Gender (dropdown)
  - Institution
- Real-time validation
- Sticky price summary

### Step 4: Review
- Verify all attendee information
- View registration summary
- Edit or confirm registration

### Step 5: Confirmation
- Success message
- Individual QR code for each attendee
- Registration ID for each person
- Print all tickets
- Download individual QR codes

## Project Structure

```
app/
├── components/
│   ├── ProgressBar.tsx          # Registration progress indicator
│   ├── AttendeeCountSelector.tsx # Step 2: Choose number of attendees
│   ├── AttendeeForm.tsx          # Individual attendee form
│   ├── ReviewRegistration.tsx    # Step 4: Review all data
│   └── ConfirmationTicket.tsx    # Step 5: QR codes and tickets
├── register/
│   └── page.tsx                  # Main registration flow
├── page.tsx                      # Landing page
├── layout.tsx                    # Root layout
└── globals.css                   # Global styles

lib/
├── constants.ts                  # Event info, price, states, etc.
├── types.ts                      # TypeScript interfaces
└── utils.ts                      # Validation, formatting, QR generation
```

## Configuration

### Update Price

Edit `lib/constants.ts`:
```typescript
export const PRICE_PER_ATTENDEE = 8000;
```

### Update Event Information

Edit `lib/constants.ts`:
```typescript
export const EVENT_DETAILS = {
  name: "7th Annual National Conference",
  theme: "Knowledge with Purpose...",
  // ... other details
};
```

## Design

**Color Scheme:**
- Navy: `#0A1647` (Primary)
- Gold: `#C8A567` (Accent)
- Red: `#DC143C` (CTA)

**Typography:**
- Clean, modern sans-serif
- Bold headers for emphasis
- Clear hierarchy

## What's NOT Included (Future Work)

⏳ Backend/Database
⏳ Supabase integration
⏳ Authentication
⏳ Admin dashboard
⏳ Payment gateway integration
⏳ Real payment processing
⏳ QR code verification system
⏳ Email notifications
⏳ WhatsApp integration
⏳ Staff check-in interface

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contact

For enquiries & sponsorship:
- 09152677650
- 08132444849
- 08136436178

WhatsApp (payment evidence):
- 09152677650

**Account Details:**
- Account Number: 1014319395
- Bank: Lotus Bank
- Account Name: The Achiever Ambassador (NATCON ACC)

---

© 2026 The Achiever Ambassadors Islamic Foundation
