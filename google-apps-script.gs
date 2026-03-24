/**
 * LeadPulse — захоплення лідів + сповіщення + UI таблиці + щоденний дайджест.
 * Після змін: Deploy → керування → нова версія Web App.
 *
 * Сповіщення: якщо в Script properties немає ALERT_EMAIL — використовується
 * FALLBACK_ALERT_EMAIL (замініть на свій, якщо інший).
 */
const SHEET_NAME = "Leads";
const FALLBACK_ALERT_EMAIL = "zekkek012345@gmail.com";

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

const STATUS_OPTIONS = ["new", "contacted", "qualified", "won", "lost"];

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

function getAlertEmail_() {
  const props = PropertiesService.getScriptProperties();
  const fromProp = props.getProperty("ALERT_EMAIL");
  if (fromProp !== null && String(fromProp).trim() !== "") {
    return String(fromProp).trim();
  }
  return FALLBACK_ALERT_EMAIL;
}

function notifyNewLead_(row) {
  const email = getAlertEmail_();
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

/** Відкрийте Google Sheet → меню LeadPulse → цей пункт (один раз). */
function setupLeadsUi() {
  const sheet = getOrCreateSheet_();
  ensureHeaders_(sheet);

  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold").setBackground("#1a2a57").setFontColor("#e6ecff");
  sheet.setFrozenRows(1);

  const statusCol = HEADERS.indexOf("status") + 1;
  const lastRow = Math.max(sheet.getLastRow(), 2);
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, statusCol, lastRow, statusCol).setDataValidation(rule);

  const scoreCol = HEADERS.indexOf("lead_score") + 1;
  const scoreRange = sheet.getRange(2, scoreCol, lastRow, scoreCol);
  const rules = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(80)
    .setBackground("#2d4a2d")
    .setRanges([scoreRange])
    .build();
  const rules2 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(55, 79)
    .setBackground("#3d3d1a")
    .setRanges([scoreRange])
    .build();
  sheet.setConditionalFormatRules([rules, rules2]);

  SpreadsheetApp.getUi().alert("LeadPulse: заголовки, статус (випадаючий список), підсвітка score готово.");
}

/** Щоранку: скільки new + топ лідів. Запустіть меню «Створити тригер дайджесту». */
function dailyDigest() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return;

  ensureHeaders_(sheet);
  const values = sheet.getDataRange().getValues();
  const header = values[0];
  const col = (name) => header.indexOf(name);

  const iStatus = col("status");
  const iScore = col("lead_score");
  const iName = col("name");
  const iEmail = col("email");
  const iNiche = col("niche");

  let newCount = 0;
  const hot = [];
  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const st = String(row[iStatus] || "").toLowerCase();
    if (st === "new" || st === "") newCount++;
    const sc = Number(row[iScore]) || 0;
    if (sc >= 55 && (st === "new" || st === "")) {
      hot.push({ name: row[iName], email: row[iEmail], niche: row[iNiche], score: sc });
    }
  }
  hot.sort((a, b) => b.score - a.score);
  const top = hot.slice(0, 10);

  const lines = [
    "LeadPulse — ранковий дайджест",
    "Лідів зі статусом new: " + newCount,
    "",
    "Пріоритет (score 55+, new):",
  ];
  top.forEach((h, idx) => {
    lines.push(
      (idx + 1) + ". " + (h.name || "?") + " | " + (h.email || "") + " | " + (h.niche || "") + " | " + h.score
    );
  });
  if (!top.length) lines.push("(немає)");

  const email = getAlertEmail_();
  if (email) {
    MailApp.sendEmail(email, "[LeadPulse] Daily digest — " + newCount + " new", lines.join("\n"));
  }
}

/** Один раз: тригер щодня о 8:00 за часовим поясом таблиці. */
function createDailyDigestTrigger() {
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === "dailyDigest") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("dailyDigest")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  SpreadsheetApp.getUi().alert("Тригер dailyDigest створено: щодня о 8:00 (час у налаштуваннях проєкту).");
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("LeadPulse")
    .addItem("1) Форматувати таблицю (статус, кольори)", "setupLeadsUi")
    .addItem("2) Щоденний email-дайджест о 8:00", "createDailyDigestTrigger")
    .addItem("Тест: надіслати дайджест зараз", "dailyDigest")
    .addToUi();
}
