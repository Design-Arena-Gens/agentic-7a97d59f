import { NextResponse } from "next/server";

import { deleteWebhook } from "@/lib/telegram";

export async function POST() {
  try {
    await deleteWebhook();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete Telegram webhook";
    console.error("telegram webhook delete error", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
