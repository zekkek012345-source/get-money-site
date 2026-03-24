const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = getOrCreateSheet_();
    const now = new Date();

    sheet.appendRow([
      now,
      payload.name || "",
      payload.phone || "",
      payload.email || "",
      payload.niche || "",
      payload.leadVolume || "",
      Number(payload.leadScore || 0),
      payload.source || "",
      payload.submittedAt || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "created_at",
      "name",
      "phone",
      "email",
      "niche",
      "lead_volume",
      "lead_score",
      "source",
      "submitted_at_client",
    ]);
  }
  return sheet;
}
