const esc = (s) =>
  (s ?? '—').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function sendTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    '🚨 <b>YANGI BUYURTMA</b>',
    '',
    `👤 <b>Mijoz:</b> ${esc(lead.name)}`,
    `📞 <b>Telefon:</b> ${esc(lead.phone)}`,
    lead.email ? `📧 <b>Email:</b> ${esc(lead.email)}` : null,
    `🛠 <b>Xizmat:</b> ${esc(lead.service)}`,
    lead.budget ? `💰 <b>Byudjet:</b> ${esc(lead.budget)}` : null,
    lead.geo_city ? `📍 <b>Hudud:</b> ${esc(lead.geo_city)}` : null,
    lead.message ? `💬 <b>Xabar:</b> ${esc(lead.message)}` : null,
    `🌐 <b>Sahifa:</b> ${esc(lead.source_page)}`,
    lead.utm_source ? `📊 <b>UTM:</b> ${esc(lead.utm_source)} / ${esc(lead.utm_medium)} / ${esc(lead.utm_campaign)}` : null,
  ].filter(Boolean).join('\n');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Telegram API ${res.status}`);
}
