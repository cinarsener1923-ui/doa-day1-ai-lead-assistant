# AI Müşteri & Randevu Asistanı — Day 1

## Proje

Hizmet işletmeleri için tasarlanan bir **AI müşteri ve randevu asistanı** ürününün tanıtım sayfası.

Ürün fikri: gelen müşteri taleplerini yanıtlayan, müşterinin ne istediğini anlayan, lead bilgisini toplayan, talebi niteleyen ve uygun müşterileri randevuya yönlendiren küçük bir AI/otomasyon çözümü.

**Day 1 kapsamı yalnızca herkese açık tanıtım sayfasıdır.** Ürünün kendisi bu aşamada geliştirilmemiştir.

## Amaç (tek cümle)

Randevu ve talep üzerine çalışan bir hizmet işletmesinin sahibini, 60 saniyeden kısa sürede, gelen mesaj kaosunun çözülebilir bir problem olduğuna ikna etmek ve erken erişim için iletişim bilgisi bırakmasını sağlamak — ürünün hâlihazırda çalıştığını iddia etmeden.

## Hedef kitle

WhatsApp, web formu, Instagram veya telefon üzerinden müşteri talebi ve randevu alan küçük ve orta ölçekli hizmet işletmeleri.

Ürün **tek bir sektöre kilitlenmez**. Sonradan uyarlanabileceği alanlar: güzellik merkezleri, emlak, oteller, klinikler, teknik servis, danışmanlık ve benzeri randevu/lead odaklı işletmeler.

## Dosya yapısı

Proje **tam olarak iki dosyadan** oluşur:

```
CLAUDE.md     — bu dosya
index.html    — tüm sayfa (HTML + inline CSS + inline JS)
```

Başka dosya, bağımlılık veya klasör eklenmez.

## Teknik kısıtlar

- Tek `index.html` dosyası; CSS ve JavaScript aynı dosyada inline.
- Framework yok: React, Next.js, Vue yok.
- Harici UI kütüphanesi yok (Tailwind, Bootstrap vb.).
- Build adımı, bundler, `npm install` yok.
- Harici istek yok: webfont, ikon fontu, uzak görsel, CDN, analytics yok.
- Backend yok, veritabanı yok, ücretli API yok, AI API yok, n8n yok.
- İçerik Türkçe. `<html lang="tr">`, UTF-8 (BOM'suz).
- Mobilde tam responsive.
- `file://` üzerinden ve herhangi bir statik hosting üzerinden değişiklik yapmadan çalışır.

## İçerik kuralları

- Sahte referans, sahte müşteri, sahte istatistik, uydurma başarı oranı **yok**.
- Abartılı veya içi boş pazarlama iddiası yok.
- Yüzde, ünlem, emoji, "devrim", "mükemmel", "en iyi" gibi ifadeler kullanılmaz.
- **Geliştirilmemiş bir işlevin var olduğu iddia edilmez.** Sayfada neyin hazır olduğu, neyin olmadığı açıkça belirtilir.
- Marka bağımsız: sabit bir marka adı kullanılmaz, jenerik ürün tanımı geçer.
- Sektör konusunda genel, mekanizma konusunda somut olunur.

## Form davranışı (Day 1)

Form **yalnızca demo** amaçlıdır.

- Client-side doğrulama: ad soyad (zorunlu), telefon (zorunlu, TR formatı), kısa mesaj (isteğe bağlı).
- Gönderim sonrası açık bir demo başarı durumu gösterilir.
- Verinin gönderildiği **iddia edilmez**; hiçbir yere gönderilmediği açıkça yazılır.
- `fetch`, `localStorage`, `sessionStorage`, çerez, üçüncü taraf script yok. `<form>` etiketinde `action` yok.
- İleri faz için tek bir `submitLead(payload)` stub fonksiyonu bırakılır; gerçek gönderim eklenirken sadece o fonksiyon değişir.

## Sayfa yapısı

1. Header (ürün adı + forma giden tek bağlantı)
2. Hero (H1, alt başlık, tek birincil CTA, dürüstlük notu)
3. Sorun
4. Ne yapar? (3 yetenek)
5. Nasıl çalışır? (4 adım)
6. Sektörler
7. Şu anda hangi aşamadayız? (hazır olan / olmayan)
8. İletişim formu (`#iletisim`)
9. Footer

## Görsel yön

Açık nötr zemin (`#FAFAF9`), koyu metin (`#141413`), tek vurgu rengi teal (`#0F6F6C`). Sistem fontu. Gölge yerine ince 1px çizgi. Gradient, glow, scroll animasyonu yok. `prefers-color-scheme: dark` desteği birkaç CSS değişkeniyle sağlanır.

## Day 1'de YAPILMAYACAKLAR

AI/LLM çağrısı · WhatsApp/Instagram entegrasyonu · n8n · backend · veritabanı · CRM · randevu motoru · kimlik doğrulama · e-posta gönderimi · ödeme · framework · UI kütüphanesi · build adımı · analytics · çerez banner'ı · çoklu sayfa · İngilizce versiyon · blog/fiyatlandırma/SSS · manuel tema değiştirici · scroll animasyonu · CI/CD · test altyapısı · referans, müşteri logosu, istatistik, ROI iddiası, vaka çalışması, ekip sayfası.

## Sonraki faz notu

Form gerçekten veri göndermeye başladığı anda **KVKK aydınlatma metni zorunlu hale gelir**. Ayrıca gerçek bir gönderim ucu eklenmeden sayfa gerçek potansiyel müşterilere duyurulmamalıdır.

## Faz 2 — Twilio Inbound Voice (MVP)

Statik tanıtım sayfasının (`index.html`) yanına, Day-1 kapsamının dışında, ayrı bir backend fazı olarak eklendi. `index.html` değiştirilmedi.

- **Eklenen dosyalar:** `package.json` (tek bağımlılık: `twilio`), `api/twilio/voice.js` (Vercel serverless function).
- **Akış:** Twilio sanal numarasına gelen çağrı → `POST /api/twilio/voice` → imza doğrulama (`X-Twilio-Signature`) → ilk çağrıda karşılama + `<Gather input="speech" language="tr-TR">` → `SpeechResult` ile gelen ikinci istekte sabit Türkçe `<Say>` cevabı + `<Hangup/>`.
- **Gerçek AI/LLM çağrısı yok.** Cevap metni sabit; ileride AI mantığı eklenecekse `api/twilio/voice.js` içindeki cevap üretim kısmı değiştirilecek.
- **Gerekli Environment Variables (Vercel):** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`.
- **Kapsam dışı:** SMS, WhatsApp otomasyonu, outbound call, CRM, dashboard, veritabanı, Media Streams/WebSocket.
