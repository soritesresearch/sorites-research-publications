# Notes publishing

The Notes section is separate from the immutable thesis ledger. One Markdown file per note lives in `content/notes/`; the standing policy source is `content/disclosures.md`.

Install the pinned development dependency with `npm install`, then run `npm run build:notes`. This rebuilds the newest-first index and published individual pages in `site/`. Deploy only `site/`, never `.notes-preview/` or `content/`.

Copy `content/notes/_example.md`, choose a stable slug, and add the article below the metadata. Metadata is JSON between Markdown `---` lines (also valid YAML). Set `status` to `published` only after the text, price source, dates and specific disclosures are ready. Drafts are excluded from the public site. Company, ticker, valuation date, publication date, update date, summary and the three disclosure fields are required.

Use ISO dates (`YYYY-MM-DD`). The original publication date stays fixed. A later `updated` date requires a visible entry in `corrections`, e.g. `{"date":"2026-10-20","text":"Corrected the diluted share count; valuation revised accordingly."}`. Material changes must be described rather than silently replaced. The builder does not validate the truth of financial inputs; sources still need review.

Permalink: `/notes/<slug>`. Keep the slug stable. No categories or tags are currently generated. Each index row has a date, title, one-line summary and company/ticker. Reconsider categories only after ten published pieces.

The reusable layout preview is generated privately under `.notes-preview/notes/layout-preview.html`. It is a fictional format demonstration and must never be deployed.

Deployment remains the existing Cloudflare direct-upload project. Pushing GitHub alone does not deploy the website. Package `site/` as the upload bundle. Thesis Markdown sources and their publication hashes must remain unchanged.
