# Telegram Bot Dashboard

A Vercel-ready Next.js app that ships with Telegram Bot webhook endpoints and a dashboard for manual operations.

## Environment Variables

Copy `.env.local.example` into `.env.local` and set:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_WEBHOOK_SECRET` (optional but recommended)
- `NEXT_PUBLIC_SITE_URL` (your local or production base URL)

## Available Commands

```bash
npm run dev      # start local development
npm run build    # create production build
npm start        # run the production build locally
npm run lint     # lint the project
```

## Endpoints

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/telegram/webhook` | POST | Receives Telegram updates and responds automatically |
| `/api/telegram/webhook/register` | POST | Registers the current deployment URL as webhook |
| `/api/telegram/webhook/delete` | POST | Removes the webhook |
| `/api/telegram/send` | POST | Sends a custom message to a chat ID |

## Dashboard Usage

1. Run `npm run dev` and open `http://localhost:3000`.
2. Use the dashboard to set the webhook and send test messages.
3. Deploy to Vercel and register the webhook again for production use.

The bot currently echoes incoming messages and supports `/start` and `/help` commands—extend the logic in `src/app/api/telegram/webhook/route.ts` to add richer behaviour.
