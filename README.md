# Email studies

A static, dependency-free showcase of three fictional transactional emails. The original workspace contained only an empty HTML scaffold; no portfolio, framework, build pipeline, or design system existed.

Open `index.html` directly or serve this directory with any static HTTP server. No installation, build, environment variables, or backend is needed. Render can host this as a Static Site with the project directory as the publish directory and no build command. No deployment configuration was changed.

## Routes

- `index.html#/` — collection
- `index.html#/email-templates/welcome`
- `index.html#/email-templates/session-reminder`
- `index.html#/email-templates/verification`

Hash routing supports direct links and refresh without server rewrite rules. Unknown routes show a recovery link. `email-template.html` redirects to the collection.

## Extending

Add a record to `emailTemplates` in `templates.js`, including metadata, sample `data`, and a `render` function. `headline` supplies the thumbnail title. Use `escapeText` for dynamic content and `emailFrame` for the shared header/footer. Optional `githubUrl` displays a source link only for an HTTPS GitHub URL. A generic thumbnail is used for additional templates; customize `thumbnail` in `app.js` if needed.

Portfolio styling lives in `styles.css`. Isolated email styling lives in `emailStyles`. Desktop/mobile controls cap the preview at 640/375px while fitting smaller screens. Email actions are disabled. Template HTML must be trusted.

Typography uses locally available sans-serif fonts with Arial and Georgia fallbacks; no external font requests are needed. No npm dependencies are used. These are browser presentations, not tested production email-client templates.
