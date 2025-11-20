import { NextRequest, NextResponse } from "next/server";

import { sendMessage } from "@/lib/telegram";

function assertSecret(request: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) {
    return;
  }

  const incoming = request.headers.get("x-telegram-bot-api-secret-token");
  if (incoming !== secret) {
    const error = new Error("Invalid secret token");
    (error as Error & { statusCode?: number }).statusCode = 401;
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    assertSecret(request);

    const update = await request.json();

    const message = update?.message ?? update?.edited_message;

    if (message && message.text) {
      const chatId = message.chat?.id;
      const from = message.from?.first_name ?? "teman";
      const text: string = message.text.trim();

      if (chatId) {
        const response = text.startsWith("/")
          ? handleCommand(text)
          : `Halo ${from}! Kamu mengirim: ${text}`;

        await sendMessage({ chatId, text: response });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    const message = err instanceof Error ? err.message : "Uncaught webhook error";
    console.error("telegram webhook error", message);
    const status = err.statusCode ?? 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(request: NextRequest) {
  try {
    assertSecret(request);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    const message = err instanceof Error ? err.message : "Unauthorized";
    const status = err.statusCode ?? 401;
    return NextResponse.json({ error: message }, { status });
  }
}

function handleCommand(command: string) {
  const normalized = command.split(" ")[0]?.toLowerCase();
  switch (normalized) {
    case "/start":
      return "Selamat datang! Kirim pesan apa pun dan aku akan mengulanginya.";
    case "/help":
      return "Gunakan /start untuk menyapa, atau kirim teks biasa untuk di-echo.";
    default:
      return `Perintah ${normalized} belum didukung.`;
  }
}
