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

## Next Steps for Real Leads

Replace the local form handler in `script.js` with:
- Formspree / Basin / Tally webhook, or
- Your backend endpoint (FastAPI, Node, etc.)

Then connect:
- CRM (HubSpot, Pipedrive, Airtable)
- Calendar booking (Calendly)
- Email sequence (Brevo, MailerLite, Instantly)
