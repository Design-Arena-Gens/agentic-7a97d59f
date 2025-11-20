import { NextRequest, NextResponse } from "next/server";

import { sendMessage } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const chatId = body?.chatId;
    const text = body?.text;
    const parseMode = body?.parseMode;
    const disablePreview = body?.disablePreview;

    if (!chatId || !text) {
      return NextResponse.json(
        { error: "chatId and text are required" },
        { status: 400 },
      );
    }

    await sendMessage({ chatId, text, parseMode, disablePreview });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send Telegram message";
    console.error("/api/telegram/send", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
