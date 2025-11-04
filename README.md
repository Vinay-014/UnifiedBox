# Unified Inbox for Multi-Channel Customer Outreach

![Unified Inbox Demo](https://via.placeholder.com/1200x600/4285F4/FFFFFF?text=Unified+Inbox+Demo)  
A full-stack unified communication platform built with Next.js, Prisma, and Twilio for SMS & WhatsApp messaging.

## 🎯 Overview
This project is a production-ready prototype for a *unified inbox* that aggregates inbound/outbound messages from *SMS* and *WhatsApp* (via Twilio) into a single, team-collaborative interface. It enables seamless outreach with features like real-time collaboration, message scheduling, contact management, and analytics.

*Core Flow:*
- Authenticate users (Better Auth with Google/Credentials + RBAC).
- View Kanban-style inbox with threaded conversations by contact.
- Send/reply across channels with rich composer.
- Collaborate on notes with @mentions and real-time cursors (Yjs + WebSockets).
- Track metrics in a dashboard (response times, delivery rates).

Built for *sales/support teams* to reduce context-switching. Excludes optional integrations (email, Twitter/Facebook, HubSpot/Slack).

*Live Demo:* [Try it here](https://your-deployed-app.vercel.app) (deployed on Vercel).  
*Tech Stack:* Next.js 14+ (App Router, TS), Prisma + Postgres, Better Auth, Twilio SDK, Yjs + WebSockets, Tailwind CSS, React Query, Zod.

## 🚀 Quick Start
### Prerequisites
- Node.js 18+
- Postgres (local via Docker or Supabase)
- Twilio account (free trial: [twilio.com/try-twilio](https://twilio.com/try-twilio))

### Setup
1. *Clone & Install*
   ```bash
   git clone https://github.com/yourusername/unified-inbox.git
   cd unified-inbox
   npm install
   ```

2. *Environment Variables*  
   Copy .env.example to .env and fill in:
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

3. *Database*
   ```bash
   npx prisma generate
   npx prisma db push  # Or migrate for production
   ```

4. *Run Dev Server*
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) → Login → Start messaging!

5. *Production Deploy*
   - Vercel: Connect GitHub repo → Auto-deploys.
   - Set env vars in Vercel dashboard.
   - For Twilio webhook: Use ngrok/Vercel URL in Twilio Console.

### Testing
- *Inbound:* Send SMS/WhatsApp to your Twilio number → Appears in inbox.
- *Outbound:* Select contact → Compose → Send (verifies to your phone first).
- *Real-time:* Open 2 tabs → Edit notes → See live cursors/@mentions.

## 📊 Integration Comparison Table
Based on Twilio's Programmable Messaging for SMS & WhatsApp (US/Canada focus; varies by country). Data sourced from Twilio docs, pricing pages, and performance reports (as of 2025). Latency measures Twilio platform processing (API request to carrier handoff); end-to-end may add 1-5s carrier/handset delay. Costs are per-message (outbound; inbound similar). Reliability includes delivery rates (~98-99% for compliant messages) and uptime (Twilio SLA: 99.95%).

| Channel   | Latency (Platform) | Cost (Outbound, US) | Reliability (Delivery Rate / Uptime) | Notes |
|-----------|---------------------|---------------------|--------------------------------------|-------|
| *SMS*  | <1s (1 MPS default; up to 10 MPS intl) | $0.0075/msg | 98-99% / 99.95% | Queuing up to 4-10 hrs at high volume; auto-rerouting for carriers. Toll-free: higher throughput ($0.0075/msg). |
| *WhatsApp* | <1s (80 MPS default; up to 400 MPS) | $0.005/msg + Meta template fee ($0.001-$0.03 by category) | 99% / 99.95% | 24-hr customer service window; free inbound. Template-based for outbound; higher for marketing/utility. |

*Key Metrics Explanation:*
- *Latency:* Twilio platform time (excludes carrier). Use Messaging Insights for monitoring.
- *Cost:* Volume discounts available; see [Twilio Pricing](https://www.twilio.com/pricing).
- *Reliability:* Based on Twilio's global routing + feedback API. Drops due to compliance/carrier filtering.

## 🔑 Key Decisions
This prototype emphasizes *scalability, security, and extensibility* while meeting core requirements (SMS/WhatsApp only). Here's a summary of architectural choices:

| Decision | Rationale | Trade-offs |
|----------|-----------|------------|
| *Next.js 14+ (App Router + TS)* | Server-side rendering for fast initial loads; App Router for streamlined API routes/webhooks. TypeScript for type-safe integrations (e.g., Twilio payloads). | Learning curve for App Router; slightly larger bundle vs. Pages Router. |
| *Prisma + Postgres* | Normalized schema (unified Message/Contact tables) for cross-channel data. Easy migrations; Supabase for hosted DB. | Overhead for simple queries; fallback to raw SQL if needed for perf. |
| *Better Auth (w/ RBAC)* | Credentials + Google OAuth; roles (Viewer/Editor/Admin) for team collab. Headless for custom UI. | Prisma adapter ensures user data syncs with contacts/notes. No multi-factor yet (add via Twilio Verify). |
| *Twilio SDK (SMS/WhatsApp Sandbox)* | Unified API for send/receive; webhook validation for security. Sandbox for testing (no approval needed). | Trial limits (verified numbers only); production: approve WhatsApp templates. MMS support added for media. |
| *Yjs + WebSockets* | Conflict-free real-time notes/@mentions/cursors. Extensible for live typing in composer. | Library size (~50KB); fallback to polling if WebSocket fails. |
| *React Query + Zod* | Optimistic updates for sends; schema validation for payloads. Caching reduces API calls. | Overkill for small app; scales well for teams. |
| *Tailwind CSS* | Responsive, utility-first styling for Kanban inbox/contact modals. | PurgeCSS for bundle size; custom components for reusability. |
| *Event-Driven Webhooks* | /api/webhooks/twilio for inbound; factory pattern (integrations.ts) for channel abstraction. | Signature validation prevents spoofing; queuing via Twilio for high volume. |
| *Analytics Dashboard* | Chart.js for metrics (open rates, response times). Exportable CSV. | Mock data for prototype; integrate Prisma queries for live. |

*Security:* Env secrets, webhook validation, RBAC middleware.  
*Observability:* Logs to DB; error boundaries.  
*Extensibility:* Add channels via config (e.g., future email via Resend). Estimated effort: 12-18 hours (foundation + UI + integrations).

## 🏗 Project Structure

```
unified-inbox/
├── src/
│   ├── app/              # App Router pages/routes
│   │   ├── (auth)/       # Login/Signup
│   │   ├── dashboard/    # Inbox/Contacts/Analytics
│   │   └── api/          # Webhooks/Auth
│   ├── components/       # UI (Inbox/Composer/Notes)
│   ├── lib/              # Utils (Prisma/Auth/Twilio/Yjs)
│   └── types/            # Zod schemas
├── prisma/               # Schema/migrations
├── public/               # Static assets
├── tailwind.config.ts    # Styling
├── README.md             # This file
└── package.json
```

## 📈 Analytics Dashboard
- *Metrics:* Channel volume, response times, delivery rates (funnels).
- *Charts:* Line (trends), Bar (channel breakdown).
- *Export:* CSV reports via React Query.

## 🤝 Contributing
1. Fork & clone.
2. npm install → npm run dev.
3. Branch: feat/your-feature.
4. PR with tests/docs.

## 🎥 Video Walkthrough
[3-min Loom Video](https://www.loom.com/share/your-video-id):  
- Send cross-channel message (SMS → WhatsApp).  
- Schedule automation (3-day follow-up).  
- Collaborate on notes (@mention + cursors).  
- View analytics (delivery funnel).

## 🙏 Acknowledgments
- [Twilio](https://twilio.com) for messaging infra.
- [Better Auth](https://better-auth.com) for secure auth.
- Built for Attack Capital (YC 22) Assignment
