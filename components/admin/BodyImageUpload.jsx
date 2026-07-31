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
 * BodyImageUpload — uploads an image to the "media" bucket and hands back a
 * ready-to-paste Markdown snippet, so images can be dropped into the article
 * body without leaving the admin.
 */
export default function BodyImageUpload() {
  const [snippet, setSnippet] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
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
    setCopied(false);
    setBusy(true);
    try {
      const sb = createClient();
      const path = `body/${Date.now()}-${safeName(file.name)}`;
      const { error } = await sb.storage
        .from("media")
        .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
      if (error) throw error;
      const { data } = sb.storage.from("media").getPublicUrl(path);
      setSnippet(`![](${data.publicUrl})`);
    } catch (e) {
      setErr(e?.message || "Yuklashda xatolik.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the field is selectable as a fallback */
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px dashed var(--color-hairline)",
        background: "var(--color-hairline-soft)",
        marginBottom: 12,
      }}
    >
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          cursor: busy ? "default" : "pointer",
          padding: "8px 14px",
          borderRadius: 9,
          border: "1px solid var(--color-hairline)",
          background: "var(--color-elevated)",
          color: "var(--color-ink)",
          fontSize: 13,
          fontWeight: 600,
          opacity: busy ? 0.6 : 1,
        }}
      >
        {busy ? "Yuklanmoqda…" : "🖼 Matn uchun rasm yuklash"}
        <input type="file" accept="image/*" onChange={onFile} disabled={busy} style={{ display: "none" }} />
      </label>

      {snippet ? (
        <>
          <input
            readOnly
            value={snippet}
            onFocus={(e) => e.target.select()}
            style={{ flex: 1, minWidth: 180, fontFamily: "var(--font-mono)", fontSize: 12 }}
          />
          <button type="button" className="btn btn-fill" onClick={copy} style={{ padding: "8px 14px" }}>
            {copied ? "Nusxalandi ✓" : "Nusxa olish"}
          </button>
          <span style={{ fontSize: 12, color: "var(--color-mute)", width: "100%" }}>
            Yuqoridagi <b>Markdown</b> havolani matn (body) maydoniga kerakli joyga joylashtiring.
          </span>
        </>
      ) : (
        <span style={{ fontSize: 12.5, color: "var(--color-mute)" }}>
          Maqola matni ichiga rasm qo&apos;shish uchun: yuklang → tayyor havolani matn maydoniga qo&apos;ying.
        </span>
      )}

      {err ? <div className="danger" style={{ fontSize: 12.5, width: "100%" }}>{err}</div> : null}
    </div>
  );
}
