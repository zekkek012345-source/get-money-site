const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const form = document.getElementById("lead-form");
const formMessage = document.getElementById("form-message");

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      niche: String(formData.get("niche") || "").trim(),
      leadVolume: String(formData.get("lead_volume") || "").trim(),
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("leadpulse_latest_lead", JSON.stringify(payload));
    formMessage.textContent = "Thanks. Your audit request is saved. We will contact you shortly.";
    form.reset();
  });
}
