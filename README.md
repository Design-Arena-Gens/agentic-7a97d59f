# Telegram Bot Dashboard

A Next.js application that exposes a Telegram Bot webhook endpoint and provides a simple dashboard to send messages, manage the webhook, and verify that your bot is running. The project is optimized for deployment on Vercel.

## Features

- `/api/telegram/webhook` endpoint that can handle Telegram updates and respond automatically
- Dashboard UI to send direct messages via the bot
- One-click webhook registration and deletion with Telegram
- Secret token verification for webhook security
- Tailwind CSS styling with a dark-themed control panel

## Getting Started

### 1. Install dependencies

```bash
cd telegram-bot
npm install
```

### 2. Configure environment variables

Duplicate `.env.local.example` into `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Bot token from BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | Optional secret token for validating Telegram webhook calls |
| `NEXT_PUBLIC_SITE_URL` | Base URL for your deployment (used when registering the webhook) |

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` and use the dashboard to register the webhook and send messages.

### 4. Deploy to Vercel

The project is ready for Vercel. After deployment, register the webhook again so Telegram points at your production URL.

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-7a97d59f
```

## API Overview

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/telegram/webhook` | Receives Telegram updates and echoes user messages |
| `GET` | `/api/telegram/webhook` | Health check for the webhook route |
| `POST` | `/api/telegram/webhook/register` | Calls Telegram `setWebhook` using configured URL |
| `POST` | `/api/telegram/webhook/delete` | Calls Telegram `deleteWebhook` |
| `POST` | `/api/telegram/send` | Sends a message to a specific chat ID |

## Testing the Bot

1. Use the dashboard to set the webhook.
2. Open Telegram and send a message to your bot.
3. The bot replies by echoing your text and supports `/start` and `/help` commands.

The dashboard keeps you informed about webhook status and message delivery.

---

Enjoy building on top of this foundation to create richer Telegram bot experiences!
