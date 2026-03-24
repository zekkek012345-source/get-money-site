const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const form = document.getElementById("lead-form");
const formMessage = document.getElementById("form-message");
const languageSelect = document.getElementById("language-select");
const endpoint = window.LEADPULSE_ENDPOINT || "";
const LANGUAGE_KEY = "leadpulse_language";
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";

const translations = {
  en: {},
  uk: {
    "nav.cta": "Отримати безкоштовний аудит",
    "hero.eyebrow": "Для локального сервісного бізнесу",
    "hero.title": "Перестаньте втрачати дорогі ліди, поки команда зайнята.",
    "hero.copy": "Ми створюємо AI-систему, що відповідає менш ніж за 2 хвилини, повертає пропущені дзвінки та бронює більше заявок на автопілоті.",
    "hero.ctaPrimary": "Замовити безкоштовний аудит",
    "hero.ctaSecondary": "Як це працює",
    "hero.trust1": "Без довгострокових контрактів",
    "hero.trust2": "Запуск за 5-7 днів",
    "hero.trust3": "Щотижнева звітність",
    "hero.cardTitle": "Очікуване зростання",
    "hero.metric1": "Повернення пропущених лідів",
    "hero.metric2": "Швидкість відповіді",
    "hero.metric3": "Заброньовані заявки",
    "hero.disclaimer": "Типові результати за перші 30 днів після запуску. Залежить від ніші та обсягу лідів.",
    "proof.kicker": "Чому власники обирають нас",
    "proof.card1Title": "Автоматизація, що приносить дохід",
    "proof.card1Copy": "Кожен сценарій прив'язаний до записів та відновлених можливостей.",
    "proof.card2Title": "Створено для зайнятих команд",
    "proof.card2Copy": "Команда працює як завжди, а AI закриває швидку реакцію та follow-up.",
    "proof.card3Title": "Прозорі щотижневі звіти",
    "proof.card3Copy": "Ви бачите, скільки лідів збережено, конвертовано та скільки вони вартують.",
    "how.kicker": "Як це працює",
    "how.step1Title": "Аудит потоку лідів",
    "how.step1Copy": "Ми знаходимо, де губляться звернення: форми, дзвінки, пошта та follow-up.",
    "how.step2Title": "Запуск AI-системи відновлення",
    "how.step2Copy": "Підключаємо миттєві відповіді, нагадування, реактивацію та трекінг воронки.",
    "how.step3Title": "Масштабування найкращого",
    "how.step3Copy": "Щотижня оптимізуємо сценарії та автоматизації для більшої конверсії.",
    "pricing.kicker": "Просте ціноутворення",
    "pricing.launchTitle": "Старт",
    "pricing.launch1": "Аудит потоку лідів",
    "pricing.launch2": "AI-скрипти відповідей",
    "pricing.launch3": "Інтеграція CRM",
    "pricing.badge": "Найпопулярніший",
    "pricing.growthTitle": "Зростання",
    "pricing.growth1": "Усе зі Старту",
    "pricing.growth2": "Автоматичний follow-up",
    "pricing.growth3": "Щотижнева оптимізація",
    "pricing.growth4": "KPI-звіти для власника",
    "pricing.scaleTitle": "Масштаб",
    "pricing.scalePrice": "Індивідуально",
    "pricing.scale1": "Запуск у кількох локаціях",
    "pricing.scale2": "Розширена аналітика",
    "pricing.scale3": "Пріоритетна підтримка",
    "faq.kicker": "Поширені запитання",
    "faq.q1": "Як швидко можна запустити?",
    "faq.a1": "Типовий запуск займає 5-7 робочих днів після стратсесії та доступів.",
    "faq.q2": "Чи потрібне нове ПЗ?",
    "faq.a2": "Ні. Працюємо з вашою CRM або підключаємо легкий стек.",
    "faq.q3": "Чи працює при низькому потоці лідів?",
    "faq.a3": "Так, але найкращий ROI зазвичай від 100 вхідних лідів на місяць.",
    "contact.kicker": "Безкоштовний аудит конверсії",
    "contact.title": "Дізнайтесь, скільки лідів ви втрачаєте вже зараз.",
    "contact.copy": "Заповніть форму, і ми надішлемо карту можливостей протягом 24 годин.",
    "form.name": "Ім'я",
    "form.phone": "Телефон / WhatsApp",
    "form.phonePlaceholder": "+49 151 12345678",
    "form.email": "Робочий Email",
    "form.businessType": "Тип бізнесу",
    "form.businessTypePlaceholder": "HVAC, Plumbing, Dental...",
    "form.leadVolume": "Місячний обсяг лідів",
    "form.chooseOne": "Оберіть варіант",
    "form.submit": "Отримати безкоштовний аудит",
    "form.note": "Надсилаючи форму, ви погоджуєтесь на контакт щодо аудиту.",
    "footer.copyright": "© <span id=\"year\"></span> LeadPulse AI. Усі права захищено.",
    "footer.backToTop": "Нагору",
    "msg.blocked": "Надсилання заблоковано.",
    "msg.demo": "Демо-режим: лід збережено локально. Додайте LEADPULSE_ENDPOINT у config.js для живого збору.",
    "msg.success": "Дякуємо. Запит на аудит отримано. Ми зв'яжемося з вами найближчим часом.",
    "msg.error": "Не вдалося надіслати запит зараз. Ми зберегли його локально та повторимо вручну."
  },
  de: {
    "nav.cta": "Kostenloses Audit erhalten",
    "hero.eyebrow": "Fur lokale Dienstleistungsunternehmen",
    "hero.title": "Verlieren Sie keine hochwertigen Leads mehr, wahrend Ihr Team beschaftigt ist.",
    "hero.copy": "Wir bauen ein KI-Follow-up-System, das in unter 2 Minuten antwortet, verpasste Anrufe reaktiviert und mehr Auftrage automatisch bucht.",
    "hero.ctaPrimary": "Mein kostenloses Audit buchen",
    "hero.ctaSecondary": "So funktioniert es",
    "hero.trust1": "Keine Langzeitvertrage",
    "hero.trust2": "Start in 5-7 Tagen",
    "hero.trust3": "Wochentliche Performance-Berichte",
    "hero.cardTitle": "Erwarteter Effekt",
    "hero.metric1": "Zuruckgewonnene verpasste Leads",
    "hero.metric2": "Antwortgeschwindigkeit",
    "hero.metric3": "Gebuchte Auftrage",
    "hero.disclaimer": "Typische Ergebnisse in den ersten 30 Tagen nach dem Go-live. Abhangig von Nische und Lead-Volumen.",
    "proof.kicker": "Warum Unternehmer uns wahlen",
    "proof.card1Title": "Umsatzorientierte Automatisierung",
    "proof.card1Copy": "Jeder Workflow ist auf gebuchte Termine und gerettete Chancen ausgerichtet.",
    "proof.card2Title": "Fur ausgelastete Teams",
    "proof.card2Copy": "Ihr Team arbeitet wie gewohnt, wahrend KI Speed-to-Lead und Follow-up ubernimmt.",
    "proof.card3Title": "Transparente Wochenberichte",
    "proof.card3Copy": "Sie sehen genau, wie viele Leads gerettet, konvertiert und wertvoll waren.",
    "how.kicker": "So funktioniert es",
    "how.step1Title": "Lead-Flow analysieren",
    "how.step1Copy": "Wir identifizieren, wo Leads verloren gehen: Formulare, Anrufe, Postfach und Follow-up.",
    "how.step2Title": "KI-Recovery-System ausrollen",
    "how.step2Copy": "Wir starten Sofortantworten, Erinnerungen, Reaktivierung und Pipeline-Tracking.",
    "how.step3Title": "Konversion skalieren",
    "how.step3Copy": "Wochentlich optimieren wir Skripte und Automatisierungen fur bessere Abschlussraten.",
    "pricing.kicker": "Einfache Preise",
    "pricing.launchTitle": "Launch",
    "pricing.launch1": "Lead-Flow-Audit",
    "pricing.launch2": "KI-Antwortskripte",
    "pricing.launch3": "CRM-Integration",
    "pricing.badge": "Am beliebtesten",
    "pricing.growthTitle": "Growth",
    "pricing.growth1": "Alles aus Launch",
    "pricing.growth2": "Follow-up-Automatisierung",
    "pricing.growth3": "Wochentliche Optimierung",
    "pricing.growth4": "KPI-Reports fur Inhaber",
    "pricing.scaleTitle": "Scale",
    "pricing.scalePrice": "Individuell",
    "pricing.scale1": "Rollout fur mehrere Standorte",
    "pricing.scale2": "Erweiterte Analytik",
    "pricing.scale3": "Priorisierter Support",
    "faq.kicker": "FAQ",
    "faq.q1": "Wie schnell konnen wir starten?",
    "faq.a1": "Der Start dauert typischerweise 5-7 Werktage nach Strategiegesprach und Freigaben.",
    "faq.q2": "Brauchen wir neue Software?",
    "faq.a2": "Nein. Wir arbeiten mit Ihrem bestehenden CRM oder verbinden einen schlanken Stack.",
    "faq.q3": "Funktioniert das bei wenig Leads?",
    "faq.a3": "Ja, den starksten ROI sehen wir meist ab 100 eingehenden Leads pro Monat.",
    "contact.kicker": "Kostenloses Conversion-Audit",
    "contact.title": "Sehen Sie, wie viele Leads Sie aktuell verlieren.",
    "contact.copy": "Formular ausfullen und wir senden Ihre individuelle Potenzialanalyse innerhalb von 24 Stunden.",
    "form.name": "Name",
    "form.phone": "Telefon / WhatsApp",
    "form.phonePlaceholder": "+49 151 12345678",
    "form.email": "Business-E-Mail",
    "form.businessType": "Branche",
    "form.businessTypePlaceholder": "HVAC, Plumbing, Dental...",
    "form.leadVolume": "Monatliches Lead-Volumen",
    "form.chooseOne": "Bitte wahlen",
    "form.submit": "Kostenloses Audit anfordern",
    "form.note": "Mit dem Absenden stimmen Sie der Kontaktaufnahme bezuglich Ihres Audits zu.",
    "footer.copyright": "© <span id=\"year\"></span> LeadPulse AI. Alle Rechte vorbehalten.",
    "footer.backToTop": "Nach oben",
    "msg.blocked": "Senden blockiert.",
    "msg.demo": "Demo-Modus: Lead lokal gespeichert. Fugen Sie LEADPULSE_ENDPOINT in config.js ein.",
    "msg.success": "Danke. Ihre Audit-Anfrage ist eingegangen. Wir melden uns in Kurze.",
    "msg.error": "Anfrage konnte gerade nicht gesendet werden. Wir haben sie lokal gespeichert und senden manuell nach."
  }
};

function t(key) {
  const langPack = translations[currentLanguage] || {};
  return langPack[key] || key;
}

function applyLanguage(lang) {
  currentLanguage = translations[lang] ? lang : "en";
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (currentLanguage === "en" && !translations.en[key]) return;
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (currentLanguage === "en" && !translations.en[key]) return;
    el.innerHTML = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (currentLanguage === "en" && !translations.en[key]) return;
    el.setAttribute("placeholder", t(key));
  });

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  if (languageSelect) languageSelect.value = currentLanguage;
}

function showMessage(message, isError = false) {
  if (!formMessage) return;
  formMessage.textContent = message;
  formMessage.style.color = isError ? "#ff9aa2" : "";
}

function getLeadScore(leadVolume) {
  const weights = {
    "0-100": 25,
    "100-300": 55,
    "300-700": 80,
    "700+": 95,
  };
  return weights[leadVolume] || 20;
}

if (form && formMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const hpValue = String(formData.get("company_website") || "").trim();
    if (hpValue) {
      showMessage(t("msg.blocked"), true);
      return;
    }

    const leadVolume = String(formData.get("lead_volume") || "").trim();

    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      niche: String(formData.get("niche") || "").trim(),
      leadVolume,
      leadScore: getLeadScore(leadVolume),
      source: "landing_page",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("leadpulse_latest_lead", JSON.stringify(payload));

    if (!endpoint) {
      showMessage(t("msg.demo"));
      form.reset();
      return;
    }

    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      showMessage(t("msg.success"));
      form.reset();
    } catch (error) {
      showMessage(t("msg.error"), true);
      console.error(error);
    }
  });
}

if (languageSelect) {
  languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
}

applyLanguage(currentLanguage);
