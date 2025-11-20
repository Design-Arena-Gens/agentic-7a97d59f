"use client";

import { useState } from "react";

interface ApiResponse {
  ok?: boolean;
  url?: string;
  error?: string;
}

export default function Home() {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!chatId || !message) {
      setStatus("Isi chat ID dan pesan terlebih dahulu");
      return;
    }

    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, text: message }),
      });
      const data: ApiResponse = await response.json();
      if (response.ok && data.ok) {
        setStatus("Pesan berhasil dikirim");
        setMessage("");
      } else {
        throw new Error(data.error ?? "Gagal mengirim pesan");
      }
    } catch (error) {
      const err = error as Error;
      setStatus(err.message);
    } finally {
      setBusy(false);
    }
  };

  const registerWebhook = async () => {
    setBusy(true);
    setWebhookStatus(null);
    try {
      const response = await fetch("/api/telegram/webhook/register", { method: "POST" });
      const data: ApiResponse = await response.json();
      if (response.ok && data.ok) {
        setWebhookStatus(`Webhook diatur ke ${data.url}`);
      } else {
        throw new Error(data.error ?? "Gagal mengatur webhook");
      }
    } catch (error) {
      const err = error as Error;
      setWebhookStatus(err.message);
    } finally {
      setBusy(false);
    }
  };

  const deleteWebhook = async () => {
    setBusy(true);
    setWebhookStatus(null);
    try {
      const response = await fetch("/api/telegram/webhook/delete", { method: "POST" });
      const data: ApiResponse = await response.json();
      if (response.ok && data.ok) {
        setWebhookStatus("Webhook dihapus");
      } else {
        throw new Error(data.error ?? "Gagal menghapus webhook");
      }
    } catch (error) {
      const err = error as Error;
      setWebhookStatus(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Telegram Bot Control Panel</h1>
            <p className="text-sm text-slate-300">
              Kelola webhook dan kirim pesan langsung dari dashboard ini.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-slate-300">
            Vercel Ready
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <section className="grid gap-6 rounded-3xl bg-slate-900/50 p-8 shadow-xl ring-1 ring-white/10 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Kirim Pesan</h2>
            <p className="text-sm text-slate-300">
              Isi chat ID dan pesan untuk mengirimkan notifikasi melalui bot.
            </p>
            <label className="text-sm font-medium text-slate-200" htmlFor="chat-id">
              Chat ID
            </label>
            <input
              id="chat-id"
              value={chatId}
              onChange={(event) => setChatId(event.target.value)}
              placeholder="contoh: 123456789"
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
            <label className="text-sm font-medium text-slate-200" htmlFor="message">
              Pesan
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Halo dari Vercel!"
              className="min-h-[120px] rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={busy}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-800/50"
            >
              {busy ? "Memproses..." : "Kirim Pesan"}
            </button>
            {status && <p className="text-sm text-emerald-300">{status}</p>}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/5 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <h2 className="text-xl font-semibold">Webhook</h2>
            <p className="text-sm text-slate-300">
              Atur webhook Telegram agar bot menerima update secara realtime.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={registerWebhook}
                disabled={busy}
                className="flex-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Memproses..." : "Set Webhook"}
              </button>
              <button
                type="button"
                onClick={deleteWebhook}
                disabled={busy}
                className="flex-1 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Memproses..." : "Hapus Webhook"}
              </button>
            </div>
            {webhookStatus && <p className="text-sm text-emerald-300">{webhookStatus}</p>}

            <div className="mt-4 space-y-3 rounded-2xl border border-white/5 bg-slate-900/70 p-4 text-xs text-slate-300">
              <p className="font-semibold uppercase tracking-widest text-slate-400">Langkah Cepat</p>
              <ol className="space-y-2">
                <li>1. Isi file <code>.env.local</code> dengan token bot Telegram kamu.</li>
                <li>2. Jalankan <code>npm run dev</code> lalu buka dashboard ini.</li>
                <li>
                  3. Klik <code>Set Webhook</code> untuk mendaftarkan endpoint Vercel sebagai webhook Telegram.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/5 bg-slate-900/40 p-8 text-sm text-slate-300">
          <h2 className="text-xl font-semibold text-slate-100">Uji Coba Bot</h2>
          <p className="mt-4">
            Setelah webhook aktif, kirim pesan ke bot melalui Telegram. Bot akan membalas
            otomatis dengan mengulang teks kamu dan mendukung perintah dasar seperti <code>/start</code>
            dan <code>/help</code>.
          </p>
        </section>
      </main>
    </div>
  );
}
