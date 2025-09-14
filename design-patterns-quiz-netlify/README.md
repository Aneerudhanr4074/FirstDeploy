# Design Patterns Quiz — Netlify + Supabase

A zero-build static quiz site your students can take online. It shows the score instantly and stores every attempt in a database.

- **Frontend:** vanilla HTML/CSS/JS (no build step).
- **Deploy:** Netlify (free tier).
- **Storage:** Supabase (free tier) via a **Netlify Function** (so your keys stay secret).

## ✨ Features

- Choose **Easy / Medium / Hard** set
- Shuffle questions
- Instant **score + review** after submit
- Attempts saved to Supabase with: name, set, score, total, answers, timestamp

---

## 1) Create the Supabase table

1. Create a Supabase project at https://supabase.com
2. In **Table Editor**, create a table named `attempts` with columns:
   - `id` `uuid` **primary key**, default: `gen_random_uuid()`
   - `student_name` `text`
   - `set` `text`
   - `score` `int4`
   - `total` `int4`
   - `answers` `jsonb`
   - `submitted_at` `timestamptz` default: `now()`

3. Note your **Project URL** and **Service Role Key** (Settings → API).
https://bbbhaltopestyokyzqdp.supabase.co   url
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiYmhhbHRvcGVzdHlva3l6cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ5NTQ3NiwiZXhwIjoyMDczMDcxNDc2fQ.iNWVHAmU5Ck_8PaIIXnHjo_snHIPB13fox5Cn7BWePw               servicerole key

> The Service Role Key must **only** be used in the serverless function (never in the browser).

---

## 2) Deploy to Netlify

### Option A — GitHub flow (recommended)
1. Put these files in a new GitHub repo (or import this zip).
2. On Netlify, click **New site from Git** → choose your repo.
3. Build settings:
   - **Build command:** _None_
   - **Publish directory:** `/` (root)
   - **Functions directory:** `netlify/functions` (Netlify will detect from `netlify.toml` too)

4. In Netlify → **Site settings → Build & deploy → Environment**, add:
   - `SUPABASE_URL` = your project URL (e.g., `https://xxx.supabase.co`)
   - `SUPABASE_SERVICE_KEY` = your service role key

5. Redeploy ↩︎

### Option B — Netlify CLI
```bash
npm i -g netlify-cli
netlify login
netlify init  # link to a new site
# Set env vars in Netlify dashboard (as above)
netlify deploy --prod
```

> **Drag-and-drop deployments do not include Functions**, so use Git or the CLI.

---

## 3) Use it
- Open your site URL.
- Student enters name → picks set → answers questions → **Submit**.
- Score is shown instantly; attempt is posted to `/.netlify/functions/submit-attempt` and stored in Supabase.

---

## 4) Customize questions
Edit `questions.js`. Each question looks like:
```js
{
  q: "Question text...",
  options: ["A","B","C","D"],
  answerIndex: 1 // zero-based index
}
```

You can add more sets (e.g. `final`, `practice2`) and wire it in the dropdown in `index.html` if needed.

---

## 5) (Optional) Query results
Use Supabase SQL or Table Editor, e.g.:
```sql
select student_name, set, score, total, submitted_at
from attempts
order by submitted_at desc;
```

---

## Troubleshooting

- **Saved successfully ✅** appears, but no rows in Supabase:
  - Check that the table is named exactly `attempts`.
  - Confirm env vars `SUPABASE_URL` & `SUPABASE_SERVICE_KEY` are set on **the site** (not the team).
  - See Netlify → **Functions logs** for errors.

- **CORS/Network errors:**
  - You must access the function through your site domain: `/.netlify/functions/submit-attempt`.
  - Don’t call Supabase REST from the browser with the service key.

---

© 2025 — Built for teachers.
