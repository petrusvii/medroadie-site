// Contact form: sends to Formspree when FORM_ENDPOINT is set, otherwise opens an email to hello@medroadie.com.
// Set FORM_ENDPOINT to your Formspree form URL, e.g. "https://formspree.io/f/abcdwxyz".
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "hello@medroadie.com";

const form = document.getElementById("contact-form");
const msg = form.querySelector(".form-msg");

function say(text, ok) {
  msg.textContent = text;
  msg.className = "form-msg " + (ok ? "ok" : "err");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  if (data.get("_gotcha")) return; // spam bot filled the hidden field
  if (!data.get("name") || !data.get("email") || !data.get("company")) return say("Please fill in your name, work email and company.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.get("email"))) return say("Please check the email address.");
  if (!data.get("consent")) return say("Please tick the box so we can store your details to answer you.");

  if (!FORM_ENDPOINT) {
    const body = ["name", "company", "role", "email", "team_size", "markets", "message"]
      .map((k) => `${k.replace("_", " ")}: ${data.get(k) || ""}`).join("\n");
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("MedRoadie demo request: " + data.get("company"))}&body=${encodeURIComponent(body)}`;
    return say("Your email app opened with the details. Just press send.", true);
  }

  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const r = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error();
    form.reset();
    say("Thanks! We'll get back to you within one business day.", true);
  } catch {
    say(`Sorry, that didn't go through. Please email ${CONTACT_EMAIL}.`);
  } finally {
    btn.disabled = false;
  }
});
