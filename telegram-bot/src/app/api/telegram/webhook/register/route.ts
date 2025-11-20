import { NextRequest, NextResponse } from "next/server";

import { setWebhook } from "@/lib/telegram";

function resolveBaseUrl(request: NextRequest) {
  const provided = request.nextUrl.searchParams.get("url");
  if (provided) return provided;

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `${request.nextUrl.origin}`;
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
    const baseUrl = resolveBaseUrl(request);
    const webhookUrl = `${baseUrl}/api/telegram/webhook`;

    await setWebhook({ url: webhookUrl, secretToken: secret });

    return NextResponse.json({ ok: true, url: webhookUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to set Telegram webhook";
    console.error("telegram webhook register error", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
