# LeadPulse AI Landing Page

High-converting MVP landing page for selling an AI lead recovery service to local businesses.

## Files

- `index.html` - landing page structure and sales copy
- `styles.css` - visual design and responsive layout
- `script.js` - simple lead form behavior (local demo storage)

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

### 2) Connect Site Form

1. Open `config.js`.
2. Set:
   - `window.LEADPULSE_ENDPOINT = "YOUR_WEB_APP_URL";`
3. Save and redeploy the site.

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

## Recommended Next Integrations

- CRM (HubSpot, Pipedrive, Airtable)
- Calendar booking (Calendly)
- Email sequence (Brevo, MailerLite, Instantly)
