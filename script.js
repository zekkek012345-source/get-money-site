const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const form = document.getElementById("lead-form");
const formMessage = document.getElementById("form-message");
const endpoint = window.LEADPULSE_ENDPOINT || "";

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
      showMessage("Submission blocked.", true);
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
      showMessage(
        "Demo mode: lead saved locally. Add LEADPULSE_ENDPOINT in config.js for live capture."
      );
      form.reset();
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      showMessage("Thanks. Audit request received. We will contact you shortly.");
      form.reset();
    } catch (error) {
      showMessage(
        "Could not send request right now. We saved your request locally and will retry manually.",
        true
      );
      console.error(error);
    }
  });
}
