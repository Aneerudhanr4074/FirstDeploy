// Netlify Function: submit-attempt
// Stores quiz attempts into a Supabase table named 'attempts' using Supabase REST API.
//
// Table schema suggestion:
// id uuid default gen_random_uuid() primary key
// student_name text
// set text
// score int4
// total int4
// answers jsonb
// submitted_at timestamptz default now()
//
// Required Netlify environment variables (Site settings → Build & deploy → Environment):
// SUPABASE_URL             e.g., https://your-project.supabase.co
// SUPABASE_SERVICE_KEY     your service role key (server-only)

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing Supabase env vars" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  // Basic validation
  const required = ["student_name", "set", "score", "total", "answers"];
  for (const key of required) {
    if (payload[key] === undefined || payload[key] === null) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `Missing field: ${key}` }),
      };
    }
  }

  const row = {
    student_name: String(payload.student_name).slice(0, 200),
    set: String(payload.set).slice(0, 50),
    score: Number(payload.score),
    total: Number(payload.total),
    answers: payload.answers,
    submitted_at: payload.submitted_at || new Date().toISOString(),
  };

  // Insert via Supabase REST (PostgREST)
  const url = `${SUPABASE_URL}/rest/v1/attempts`;
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify([row])
    });

    const text = await resp.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Supabase insert failed", details: json })
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, inserted: json })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Fetch error", details: String(err) }),
    };
  }
}
