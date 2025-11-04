# UnifiedBox: A Multi-Channel Customer Outreach

A production-grade, full-stack unified communication platform leveraging Next.js, Prisma, and Twilio for SMS and WhatsApp messaging.

---

## 🎯 Overview

**UnifiedBox** consolidates inbound and outbound messages from SMS and WhatsApp (via Twilio) into a unified, collaborative, Kanban-style interface. Built for customer-facing sales and support teams, it streamlines team-based workflows, reduces context-switching, and provides advanced real-time collaboration.

**Core Features:**
- **Robust Authentication:** Secure Google/Credentials authentication with RBAC.
- **Team Collaboration:** Kanban inbox, threaded conversations, collaborative notes with @mentions and real-time cursors (Yjs + WebSockets).
- **Omnichannel Messaging:** Seamless send/reply across channels with a rich composer.
- **Analytics Dashboard:** Actionable metrics—response times, delivery rates.
- **Reliable Infrastructure:** Real-time messaging, observability, and scalable integrations.

**Live Demo:** [Access the App](https://your-deployed-app.vercel.app)  
**Tech Stack:** Next.js 14+ (App Router, TypeScript), Prisma + Postgres, Better Auth, Twilio SDK, Yjs + WebSockets, Tailwind CSS, React Query, Zod.

---

## 🚀 Quick Start

### Prerequisites

- Next.js 14+
- PostgreSQL (local, Docker, or Supabase)
- Twilio account ([Free Trial](https://twilio.com/try-twilio))

### Setup Instructions

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/unified-inbox.git
   cd unified-inbox
   npm install
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env` and complete these:
   ```env
   DATABASE_URL="postgresql://postgres:password@host:5432/db"
   NEXTAUTH_SECRET="your-secret-key"  # openssl rand -hex 32
   TWILIO_ACCOUNT_SID=ACxxx
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=+1234567890
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   ```

3. **Database Initialization**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) and log in to begin.

5. **Production Deployment**
   - Deploy with Vercel, linking the GitHub repo for auto-deployment.
   - Set all environment variables on Vercel.
   - Configure Twilio webhook with your public (ngrok or Vercel) URL.

### Testing the Platform

- **Inbound:** SMS/WhatsApp messages to your Twilio number will appear in the inbox.
- **Outbound:** Pick a contact, compose, and send (trial numbers require verification).
- **Real-time Collaboration:** Edit notes across tabs, observe @mentions and live cursors.

---

## 📊 Integration Comparison Table

Based on Twilio's Programmable Messaging (USA/Canada); performance varies by region. Last updated: 2025.

| Channel    | Latency (Platform)         | Cost (Outbound, US)            | Reliability (Delivery Rate/Uptime) | Notes                                                                                             |
|------------|---------------------------|-------------------------------|-------------------------------------|---------------------------------------------------------------------------------------------------|
| **SMS**    | <1s (1 MPS default; up to 10 MPS intl) | $0.0075/msg                    | 98-99% / 99.95%                    | Queuing up to 4-10 hrs at high volume; auto-rerouting for carriers. Toll-free: higher throughput. |
| **WhatsApp** | <1s (80–400 MPS)           | $0.005/msg + Meta template fee ($0.001-$0.03) | 99% / 99.95%                       | 24-hr service window; free inbound; outbound requires pre-approved templates.                     |

**Key Metrics:**
- **Latency:** Measures platform processing, not carrier delivery. Monitor via Twilio Insights.
- **Cost:** Volume discounts may apply. [Twilio Pricing](https://www.twilio.com/pricing)
- **Reliability:** Based on Twilio routing and Feedback API; can be affected by compliance and carrier-level filtering.

---

## 🔑 Architectural Decisions

UnifiedBox is optimized for scalability, maintainability, and extensibility. Key technical and architectural highlights:

| Decision                       | Rationale                                                                         | Trade-offs/Worth Noting                                           |
|--------------------------------|-----------------------------------------------------------------------------------|-------------------------------------------------------------------|
| **Next.js 14+**                | SSR for performance, App Router for streamlined APIs. TypeScript for type safety. | Steeper learning curve; best for team scalability.                |
| **Prisma + Postgres**          | Unified, normalized data layer; easy migrations and future extensibility.         | Slight query overhead—drop to raw SQL as needed.                  |
| **Better Auth + RBAC**         | Secure, role-based access both via credentials and Google OAuth.                  | No MFA by default; Prisma adapter used for sync.                  |
| **Twilio SDK**                 | Unifies SMS and WhatsApp, secure webhooks, sandbox for local testing.             | Sandbox/trial limitations; specific number approval for prod.     |
| **Yjs + WebSockets**           | Optimized for collaborative, conflict-free notes and real-time interactions.      | Slightly larger JS bundle; fallback to polling possible.          |
| **React Query + Zod**          | Optimistic UI, data caching, strong runtime validation.                           | Overhead for initially small teams, but future-proofs scaling.    |
| **Tailwind CSS**               | Utility-first, responsive UI for productivity dashboards.                         | Uses PurgeCSS for lean builds; custom components for reusability. |
| **Event-Driven Webhooks**      | Factory pattern for easy integration of new channels, strong security.            | Needs signature validation; can absorb high volume via queuing.   |
| **Analytics Dashboard**        | Informs team performance and funnels with exportable reports.                     | Initially mock data; easily connects to live production metrics.  |

- **Security:** Environment variable management, webhook signature validation, enforcing role-based access.
- **Observability:** Logging, DB-backed error boundaries.
- **Extensibility:** Add additional channels (e.g., email, social) with minimal overhead.

---

## 🏗 Directory Structure

```
unified-inbox/
├── src/
│   ├── app/              # App Router: Pages & API Routes
│   │   ├── (auth)/       # Auth flows
│   │   ├── dashboard/    # Inbox, Contacts, Analytics
│   │   └── api/          # Webhooks, Auth endpoints
│   ├── components/       # UI Components (Inbox, Composer, Notes, etc.)
│   ├── lib/              # Utilities (Prisma, Auth, Twilio, Yjs)
│   └── types/            # Zod Schemas, TypeScript Types
├── prisma/               # DB Schema & Migrations
├── public/               # Static Assets
├── tailwind.config.ts    # Tailwind Configuration
├── README.md             # Project Documentation
└── package.json
```

---

## 📈 Analytics Dashboard

- **Metrics:** Channel message volume, team response time, delivery rates/funnel analysis.
- **Visualizations:** Line and bar graphs (Chart.js).
- **Export:** Downloadable CSV via React Query.

---

## 🤝 Contributing

1. **Fork and Clone** the repository.
2. `npm install` and `npm run dev` for local setup.
3. Create new feature branches: `feat/your-feature`.
4. Submit PRs with associated tests and documentation.

---

## 🎥 Product Walkthrough

- Send messages cross-channel (e.g., SMS → WhatsApp).
- Schedule follow-ups and automate reminders.
- Collaborate in real time on notes, use @mentions and live cursors.
- Analyze channel volume, response/delivery stats (funnel view).

[Watch the 3-Minute Demo](https://www.loom.com/share/your-video-id)

---

## 🙏 Acknowledgments

- [Twilio](https://twilio.com) – Robust messaging infrastructure.
- [Better Auth](https://better-auth.com) – Modern, secure authentication.
- Purpose-built for the Attack Capital (YC 22) Assignment.

---
