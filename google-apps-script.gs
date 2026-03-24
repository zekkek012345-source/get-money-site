const SHEET_NAME = "Leads";

const HEADERS = [
  "created_at",
  "name",
  "phone",
  "email",
  "niche",
  "lead_volume",
  "lead_score",
  "source",
  "submitted_at_client",
  "status",
  "language",
  "page_url",
  "referrer",
];

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: "lead-capture" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);
    const now = new Date();

    const row = {
      created_at: now,
      name: payload.name || "",
      phone: payload.phone || "",
      email: payload.email || "",
      niche: payload.niche || "",
      lead_volume: payload.leadVolume || "",
      lead_score: Number(payload.leadScore || 0),
      source: payload.source || "",
      submitted_at_client: payload.submittedAt || "",
      status: "new",
      language: payload.language || "",
      page_url: payload.pageUrl || "",
      referrer: payload.referrer || "",
    };

    sheet.appendRow(HEADERS.map((h) => row[h]));

    notifyNewLead_(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function notifyNewLead_(row) {
  const email = PropertiesService.getScriptProperties().getProperty("ALERT_EMAIL");
  if (!email) return;

  const subject = Utilities.formatString(
    "[LeadPulse] New lead | score %s | %s",
    row.lead_score,
    row.niche || "n/a"
  );

  const lines = [
    "Name: " + row.name,
    "Email: " + row.email,
    "Phone: " + row.phone,
    "Niche: " + row.niche,
    "Lead volume: " + row.lead_volume,
    "Score: " + row.lead_score,
    "Language: " + row.language,
    "Page: " + row.page_url,
    "Referrer: " + row.referrer,
  ];

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: lines.join("\n"),
  });
}

function ensureHeaders_(sheet) {
  const needed = HEADERS.length;
  const currentCols = Math.max(sheet.getLastColumn(), 1);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }

  if (currentCols < needed) {
    sheet.getRange(1, currentCols + 1, 1, needed).setValues([
      HEADERS.slice(currentCols),
    ]);
  } else {
    const existing = sheet.getRange(1, 1, 1, needed).getValues()[0];
    for (let i = 0; i < needed; i++) {
      if (existing[i] !== HEADERS[i]) {
        sheet.getRange(1, i + 1).setValue(HEADERS[i]);
      }
    }
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}
