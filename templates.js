// All content is fictional sample data. Add a record and renderer to extend the collection.
const escapeText = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const emailStyles = `*{box-sizing:border-box}body{margin:0;background:#fffdf8;color:#2d4133;font:15px/1.7 Arial,sans-serif;overflow-wrap:anywhere}.email{max-width:600px;margin:auto}.header{padding:28px 36px;border-bottom:1px solid #dfe3d8;font-size:23px;font-weight:bold;letter-spacing:-1px}.header span{float:right;font-size:8px;letter-spacing:1.4px;line-height:39px;font-weight:normal}.body{padding:36px}.eyebrow{font-size:10px;letter-spacing:2px;font-weight:bold;color:#6e7e60;margin:0 0 24px}h1{font:38px/1.12 Georgia,serif;letter-spacing:-1px;margin:0 0 26px}p{margin:0 0 20px}.muted{color:#65715f}.button{display:inline-block;padding:13px 23px;background:#2c4b37;color:white;border-radius:4px;font-size:13px;text-decoration:none;font-weight:bold;margin:5px 0 24px}.button:focus-visible{outline:3px solid #997123;outline-offset:4px}.panel{background:#edf0e5;border:1px solid #dfe5d4;border-radius:4px;padding:23px;margin:24px 0}.label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#66735c}.session-title{font:23px/1.3 Georgia,serif;margin:10px 0 22px}.row{display:flex;justify-content:space-between;gap:12px;font-size:13px;margin-top:12px}.row strong{text-align:right}.small{font-size:12px;color:#697466}.footer{padding:24px 36px;border-top:1px solid #dfe3d8;font-size:11px;color:#717b6b}.footer p{margin:0 0 8px}.step{display:flex;gap:18px;padding:17px 0;border-top:1px solid #e3e7db}.step>span{font:23px Georgia,serif;color:#7f8c6a}.step strong{font-size:14px}.step p{font-size:12px;color:#697466;margin:4px 0}.star{font-size:47px;line-height:1;color:#889574;margin-bottom:26px}.code{font:30px monospace;letter-spacing:5px;text-align:center;margin:17px 0}.blue{color:#374561}.blue .panel{background:#eff1f8;border-color:#dfe3ef}.blue .label{color:#67728b}@media(max-width:430px){.body{padding:28px 24px}.header,.footer{padding:24px}h1{font-size:32px}.panel{padding:18px}.row{flex-direction:column;gap:1px}.row strong{text-align:left}.header span{font-size:7px}}`;
function emailFrame(content, theme = "") {
  return `<article class="email ${theme}"><header class="header">folio<span>A LITTLE ROOM TO GROW</span></header><div class="body">${content}</div><footer class="footer"><p><strong>folio</strong> · Make space for your next chapter.</p><p>A fictional email for a frontend design showcase.<br>Preview only — no account or session actions are performed.</p></footer></article>`;
}
const emailTemplates = [
  {
    slug: "welcome",
    title: "A warmer welcome",
    category: "Onboarding",
    description:
      "A thoughtful first hello, with a clear path to getting started.",
    subject: "A little space for your next big idea",
    accent: "sage",
    headline: "A little space.<br>A lot of possibility.",
    purpose:
      "Sent after account creation to introduce the product and guide a new member to their first useful action.",
    design:
      "A warm editorial headline and three short steps introduce the product without overwhelming the reader.",
    technical:
      "Shared layout, escaped dynamic text, and a single column that adapts to narrow screens.",
    data: { name: "Alex" },
    render: ({ name }) =>
      emailFrame(
        `<p class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><div class="star" aria-hidden="true">✳</div><h1>A little space.<br>A lot of possibility.</h1><p>Welcome to folio, ${escapeText(name)}.</p><p class="muted">Good ideas need somewhere to begin. You now have a place to collect your thoughts, learn with others, and turn a small first step into something meaningful.</p><a class="button" href="https://example.com/">Explore your workspace ↗</a><div class="step"><span>01</span><div><strong>Make yourself at home</strong><p>Add a name and a few words about what you’re working on.</p></div></div><div class="step"><span>02</span><div><strong>Start with one idea</strong><p>Create a space for the thing you’ve been meaning to try.</p></div></div><div class="step"><span>03</span><div><strong>Find your people</strong><p>Connect with someone who can help you take the next step.</p></div></div>`,
      ),
  },
  {
    slug: "session-reminder",
    title: "Right on time",
    category: "Sessions",
    description: "The essential session details, exactly when they’re needed.",
    subject: "Your frontend session is coming up",
    accent: "sand",
    headline: "Good things<br>are on the calendar.",
    purpose:
      "Sent before a mentoring session so the participant can confirm the details and prepare.",
    design:
      "A compact appointment block groups the mentor, time, and duration. One prominent action leads to the session.",
    technical:
      "Data-driven appointment details and stacked metadata on small screens.",
    data: {
      name: "Alex",
      mentor: "Jordan Lee",
      session: "Building better interfaces",
      date: "October 10, 2026",
      time: "3:00 PM · WAT (UTC+1)",
      duration: "45 minutes",
    },
    render: ({ name, mentor, session, date, time, duration }) =>
      emailFrame(
        `<p class="eyebrow">A FRIENDLY REMINDER</p><h1>Good things<br>are on the calendar.</h1><p>Hi ${escapeText(name)},</p><p class="muted">Your frontend mentoring session is coming up. Bring your questions, your work in progress, and a little curiosity.</p><div class="panel"><div class="label">YOUR UPCOMING SESSION</div><div class="session-title">${escapeText(session)}</div>${[
          ["With", mentor],
          ["Date", date],
          ["Time", time],
          ["Duration", duration],
        ]
          .map(
            ([label, value]) =>
              `<div class="row"><span>${label}</span><strong>${escapeText(value)}</strong></div>`,
          )
          .join(
            "",
          )}</div><a class="button" href="https://example.com/">Join your session ↗</a><p class="small">Find a quiet spot and check your camera and microphone before joining.</p><p>See you there,<br>The folio team</p>`,
      ),
  },
  {
    slug: "verification",
    title: "One small security check",
    category: "Authentication",
    description: "A focused verification email that puts the code first.",
    subject: "Your folio verification code",
    accent: "lavender",
    headline: "A quick check.<br>Then you’re in.",
    purpose:
      "Sent when someone requests email verification, providing a short-lived code to complete the process.",
    design:
      "A high-contrast code panel is the focal point. Expiry and unexpected-request guidance stay close to the code.",
    technical:
      "Selectable text code and an independent light canvas. No authentication service is connected.",
    data: { name: "Alex", code: "482 916", expiry: "10 minutes" },
    render: ({ name, code, expiry }) =>
      emailFrame(
        `<p class="eyebrow">KEEPING YOUR SPACE YOURS</p><h1>A quick check.<br>Then you’re in.</h1><p>Hi ${escapeText(name)},</p><p class="muted">Use the code below to verify your email address and finish setting up your folio account.</p><div class="panel"><div class="label" style="text-align:center">YOUR VERIFICATION CODE</div><p class="code">${escapeText(code)}</p><div class="small" style="text-align:center">This code expires in ${escapeText(expiry)}.</div></div><p>Enter this code in the window where you started signing up. Keep it private — our team will never ask you to share it.</p><p class="small">Didn’t request this? You can safely ignore this email. No changes will be made to your account.</p>`,
        "blue",
      ),
  },
];
function emailDocument(template) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeText(template.title)}</title><style>${emailStyles}</style></head><body>${template.render(template.data)}</body></html>`;
}
