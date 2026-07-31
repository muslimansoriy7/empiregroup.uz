"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

function safeName(name) {
  const dot = name.lastIndexOf(".");
  const ext = dot > -1 ? name.slice(dot + 1).toLowerCase() : "img";
  const base = (dot > -1 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "image";
  return `${base}.${ext}`;
}

/**
 * CoverUpload — picks an image, uploads it straight to the Supabase Storage
 * "media" bucket (as the logged-in admin, via the anon client + session), then
 * writes the resulting public URL into the hidden `cover_url` field the post
 * form submits. The URL stays editable, so an external link still works.
 */
export default function CoverUpload({ defaultUrl = "" }) {
  const [url, setUrl] = useState(defaultUrl);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setErr("Rasm 8MB dan katta bo'lmasin.");
      return;
    }
    setErr("");
    setBusy(true);
    try {
      const sb = createClient();
      const path = `covers/${Date.now()}-${safeName(file.name)}`;
      const { error } = await sb.storage
        .from("media")
        .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
      if (error) throw error;
      const { data } = sb.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (e) {
      setErr(e?.message || "Yuklashda xatolik. Qayta urinib ko'ring.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="field">
      <label>Muqova rasm</label>
      {/* what the form submits */}
      <input type="hidden" name="cover_url" value={url} />

      {url ? (
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            style={{ width: 120, height: 78, objectFit: "cover", borderRadius: 10, border: "1px solid var(--color-hairline)" }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              style={{ width: "100%" }}
            />
            <button type="button" className="link" style={{ marginTop: 6, background: "none", border: 0, padding: 0 }} onClick={() => setUrl("")}>
              O&apos;chirish
            </button>
          </div>
        </div>
      ) : null}

      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          cursor: busy ? "default" : "pointer",
          padding: "10px 16px",
          borderRadius: 10,
          border: "1px solid var(--color-hairline)",
          background: "var(--color-elevated)",
          color: "var(--color-ink)",
          fontSize: 13.5,
          fontWeight: 600,
          width: "fit-content",
          opacity: busy ? 0.6 : 1,
        }}
      >
        {busy ? "Yuklanmoqda…" : url ? "Boshqa rasm tanlash" : "⬆ Rasm tanlash / yuklash"}
        <input type="file" accept="image/*" onChange={onFile} disabled={busy} style={{ display: "none" }} />
      </label>

      {err ? (
        <div className="danger" style={{ marginTop: 8, fontSize: 13 }}>
          {err}
        </div>
      ) : null}
    </div>
  );
}
