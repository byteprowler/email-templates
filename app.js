const main = document.querySelector("main");
document.querySelector(".skip").addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});
const technologies = ["HTML", "CSS", "JavaScript", "Responsive design"];
function thumbnail(t, index) {
  return `<div class="thumbnail ${t.accent}" aria-hidden="true"><div class="mini-email"><div class="mini-brand">folio <span>A LITTLE ROOM TO GROW</span></div><div class="mini-content"><span class="mini-eyebrow">${t.category}</span><h3>${t.headline}</h3><div class="mini-line"></div><div class="mini-line short"></div>${t.slug === "verification" ? '<div class="mini-code">482 916</div>' : t.slug === "session-reminder" ? '<div class="mini-appointment"><b>Building better interfaces</b><span>October 10, 2026 · 3:00 PM</span><span>With Jordan Lee</span></div><div class="mini-button">Join your session ↗</div>' : '<div class="mini-button">Explore your workspace ↗</div><div class="mini-step">01 <b>Make yourself at home</b></div><div class="mini-step">02 <b>Start with one idea</b></div>'}</div></div><span class="preview-caption">${t.category.toUpperCase()} / ${String(index + 1).padStart(2, "0")}</span></div>`;
}
function collection() {
  document.title = "Email studies — The collection";
  main.innerHTML = `<section class="hero"><p class="eyebrow"><i></i> THE EMAIL COLLECTION</p><h1>Small messages.<br><em>Considered design.</em></h1><div class="hero-bottom"><p>Thoughtful emails for the moments that matter.<br>Explorations in hierarchy, clarity, and responsive design.</p><span class="count">01 — ${String(emailTemplates.length).padStart(2, "0")}<small>EMAIL DESIGN STUDIES</small></span></div></section><section aria-labelledby="collection-heading"><div class="section-heading"><h2 id="collection-heading">Inside the inbox</h2><span>Transactional emails, with intention.</span></div><div class="card-grid">${emailTemplates.map((t, i) => `<a class="template-card" href="#/email-templates/${t.slug}">${thumbnail(t, i)}<div class="card-meta"><span>${t.category}</span><span>${String(i + 1).padStart(2, "0")} / ${String(emailTemplates.length).padStart(2, "0")}</span></div><h3>${t.title}<span aria-hidden="true">↗</span></h3><p>${t.description}</p><div class="card-bottom"><span>HTML / CSS / JS</span><span>View template →</span></div></a>`).join("")}</div></section><section class="collection-note"><span class="note-symbol" aria-hidden="true">✳</span><div><h2>Built around the message.</h2><p>Reusable layouts. Readable typography. Room to breathe. Each study explores a different moment in a product’s relationship with its users.</p></div><span class="note-label">BROWSER PREVIEWS<br>FICTIONAL SAMPLE CONTENT</span></section>`;
}
let cleanup = () => {};
function detail(t) {
  document.title = `${t.title} — Email studies`;
  const source =
    t.githubUrl && /^https:\/\/github\.com\/[^\s]+$/.test(t.githubUrl)
      ? `<a href="${escapeText(t.githubUrl)}" target="_blank" rel="noopener noreferrer">View source ↗</a>`
      : "";
  main.innerHTML = `<section class="detail-heading"><a class="back-link" href="#/">← Back to collection</a><p class="eyebrow">EMAIL STUDY / ${t.category.toUpperCase()}</p><h1>${t.title}</h1><p>${t.description}</p></section><section class="preview-shell" aria-label="Interactive email preview"><div class="preview-toolbar"><span class="preview-label"><i></i> Live preview</span><div class="device-controls" role="group" aria-label="Preview width"><button type="button" data-device="desktop" aria-pressed="true">Desktop</button><button type="button" data-device="mobile" aria-pressed="false">Mobile</button></div><span class="width-label" aria-live="polite">Up to 640px</span></div><div class="mail-meta"><div><span>From</span><strong>folio &lt;hello@example.com&gt;</strong></div><div><span>To</span><span>Alex &lt;alex@example.com&gt;</span></div><div><span>Subject</span><strong>${t.subject}</strong></div></div><div class="preview-stage"><div class="email-viewport"><iframe title="${t.title} email preview" sandbox="allow-same-origin" scrolling="no"></iframe></div></div><p class="preview-disclaimer">Layout preview · Sample content · Email actions are disabled</p></section><section class="about-template" aria-labelledby="about-heading"><div><p class="eyebrow">BEHIND THE EMAIL</p><h2 id="about-heading">A little context.</h2>${source}</div><div class="about-copy"><h3>Purpose</h3><p>${t.purpose}</p><h3>Design considerations</h3><p>${t.design}</p><h3>Technical considerations</h3><p>${t.technical}</p><div class="tags" aria-label="Technologies used">${technologies.map((item) => `<span>${item}</span>`).join("")}</div><p class="compatibility-note">Built as a browser showcase. Production email-client compatibility has not been tested.</p></div></section><nav class="other-templates" aria-label="Other templates"><span>Keep exploring</span>${emailTemplates
    .filter((item) => item !== t)
    .map(
      (item) => `<a href="#/email-templates/${item.slug}">${item.title} ↗</a>`,
    )
    .join("")}</nav>`;
  const frame = main.querySelector("iframe"),
    viewport = main.querySelector(".email-viewport");
  function resize() {
    if (!frame.contentDocument?.body) return;
    frame.style.height = "1px";
    frame.style.height = `${Math.ceil(frame.contentDocument.documentElement.scrollHeight)}px`;
  }
  frame.addEventListener("load", () => {
    frame.contentDocument.addEventListener("click", (event) => {
      if (event.target.closest("a")) event.preventDefault();
    });
    resize();
  });
  frame.srcdoc = emailDocument(t);
  let lastWidth = 0;
  const observer = new ResizeObserver((entries) => {
    const width = entries[0].contentRect.width;
    if (width !== lastWidth) {
      lastWidth = width;
      resize();
    }
  });
  observer.observe(viewport);
  cleanup = () => observer.disconnect();
  main.querySelectorAll("[data-device]").forEach((button) =>
    button.addEventListener("click", () => {
      const mobile = button.dataset.device === "mobile";
      viewport.classList.toggle("mobile", mobile);
      main
        .querySelectorAll("[data-device]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      main.querySelector(".width-label").textContent = mobile
        ? "Up to 375px"
        : "Up to 640px";
    }),
  );
}
function route() {
  cleanup();
  cleanup = () => {};
  const path = location.hash.slice(1) || "/";
  if (path === "/" || path === "/email-templates") collection();
  else {
    const t = emailTemplates.find(
      (item) => path === `/email-templates/${item.slug}`,
    );
    if (t) detail(t);
    else {
      document.title = "Template not found — Email studies";
      main.innerHTML =
        '<section class="not-found"><p class="eyebrow">404 / NOT IN THIS INBOX</p><h1>That template isn’t here.</h1><p>The link may be out of date. Explore the rest of the collection.</p><a class="back-link" href="#/">← Back to collection</a></section>';
    }
  }
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}
window.addEventListener("hashchange", route);
route();
