# LeadPulse AI Landing Page

High-converting MVP landing page for selling an AI lead recovery service to local businesses.

## Files

- `index.html` - landing page structure and sales copy
- `styles.css` - visual design and responsive layout
- `script.js` - form, i18n, lead payload
- `config.js` - endpoint + optional `CALENDLY_URL`
- `google-apps-script.gs` - Sheet + optional email alerts
- `OPERATIONS.txt` - щоденний плейбук і шаблони листів

## Local Preview

Open `index.html` in a browser.

## Free Hosting (Cloudflare Pages)

1. Create a GitHub repo and upload this folder.
2. Go to Cloudflare Pages -> Create a project -> Connect Git.
3. Build settings:
   - Framework preset: None
   - Build command: (empty)
   - Build output directory: `/`
4. Deploy.

## Live Lead Capture (Free, Google Sheets)

### 1) Create Google Sheet + Apps Script

1. Create a new Google Sheet.
2. Open `Extensions -> Apps Script`.
3. Paste contents of `google-apps-script.gs`.
4. Deploy:
   - `Deploy -> New deployment`
   - Type: `Web app`
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Copy the Web App URL.

**Email на кожен лід:** за замовчуванням використовується `FALLBACK_ALERT_EMAIL` у `google-apps-script.gs` (змініть там, якщо потрібен інший). Опційно перекривається властивістю `ALERT_EMAIL` у Script properties.

**Таблиця:** після відкриття Google Sheet з’явиться меню **LeadPulse** → форматування + тригер дайджесту (див. `OPERATIONS.txt`).

### 2) Connect Site Form

1. Open `config.js`.
2. Set `window.LEADPULSE_ENDPOINT` (і за бажанням `window.CALENDLY_URL` для кнопок «15-min call»).
3. Після змін у `google-apps-script.gs` — вставити код у редактор і зробити **Deploy → New version**.

### Sheet columns

Після оновлення скрипта з’являться колонки: `status`, `language`, `page_url`, `referrer` (старі рядки збережуться).

### 3) Verify

- Submit test form from the website.
- Check `Leads` sheet for new row.

## Lead Scoring

Current score (auto):
- `0-100` leads/month -> `25`
- `100-300` -> `55`
- `300-700` -> `80`
- `700+` -> `95`

Use this to prioritize outreach to hottest leads first.

## Reach / growth (free)

- `growth.html` — готові пости (LinkedIn, X, Reddit), UTM, підпис email, чекліст.
- `robots.txt`, `sitemap.xml` — додайте sitemap у [Google Search Console](https://search.google.com/search-console) та [Bing Webmaster](https://www.bing.com/webmasters).
- На головній: блок **Grow reach** + кнопки «Copy site link», LinkedIn, X.

## Recommended Next Integrations

- CRM (HubSpot, Pipedrive, Airtable)
- Calendar booking (Calendly)
- Email sequence (Brevo, MailerLite, Instantly)
