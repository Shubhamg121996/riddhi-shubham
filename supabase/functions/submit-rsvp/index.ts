import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY = 'https://connector-gateway.lovable.dev/google_sheets/v4';
const SHEET_ID = '19I_1J2xh4ZyGDheAUdYBJDw8NX8BUHCqKg219O3069A';
const TAB = 'RSVP';
const HEADERS = [
  'Invite Code',
  'Family Name',
  'Attendance',
  'Adults',
  'Children (<10)',
  'Arrival Date',
  'Arrival Time',
  'Travel Mode',
  'Special Requirements',
  'Decline Message',
  'Submitted At',
  'Last Updated',
];
const RANGE_COLS = 'A:L';
const LAST_COL = 'L';

function gwHeaders() {
  return {
    Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
    'X-Connection-Api-Key': Deno.env.get('GOOGLE_SHEETS_API_KEY') ?? '',
    'Content-Type': 'application/json',
  };
}

async function ensureTab() {
  const metaRes = await fetch(
    `${GATEWAY}/spreadsheets/${SHEET_ID}?fields=sheets(properties(title))`,
    { headers: gwHeaders() },
  );
  if (!metaRes.ok) throw new Error(`Sheet metadata fetch failed (${metaRes.status}): ${await metaRes.text()}`);
  const meta = await metaRes.json();
  const hasTab = (meta.sheets ?? []).some((s: any) => s.properties?.title === TAB);
  if (!hasTab) {
    const addRes = await fetch(`${GATEWAY}/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: 'POST',
      headers: gwHeaders(),
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title: TAB } } }] }),
    });
    if (!addRes.ok) throw new Error(`Could not create RSVP tab (${addRes.status}): ${await addRes.text()}`);
  }

  const hdrRes = await fetch(`${GATEWAY}/spreadsheets/${SHEET_ID}/values/${TAB}!A1:${LAST_COL}1`, {
    headers: gwHeaders(),
  });
  const hdrData = hdrRes.ok ? await hdrRes.json() : { values: [] };
  const currentHeaders: string[] = hdrData.values?.[0] ?? [];
  const needsWrite =
    currentHeaders.length !== HEADERS.length ||
    HEADERS.some((h, i) => currentHeaders[i] !== h);
  if (needsWrite) {
    const putRes = await fetch(
      `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${TAB}!A1:${LAST_COL}1?valueInputOption=USER_ENTERED`,
      { method: 'PUT', headers: gwHeaders(), body: JSON.stringify({ values: [HEADERS] }) },
    );
    if (!putRes.ok) throw new Error(`Header write failed (${putRes.status}): ${await putRes.text()}`);
  }
}

async function findRow(code: string): Promise<{ row: number; submittedAt: string } | null> {
  const res = await fetch(`${GATEWAY}/spreadsheets/${SHEET_ID}/values/${TAB}!A:${LAST_COL}`, {
    headers: gwHeaders(),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const rows: string[][] = data.values ?? [];
  for (let i = 1; i < rows.length; i++) {
    if ((rows[i][0] ?? '').toUpperCase() === code.toUpperCase()) {
      return { row: i + 1, submittedAt: rows[i][10] ?? '' };
    }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const {
      code,
      name = '',
      attendance = '',
      adults = 0,
      children = 0,
      arrivalDate = '',
      arrivalTime = '',
      travelMode = '',
      specialRequirements = '',
      declineMessage = '',
    } = body;

    if (!code || typeof code !== 'string') {
      return new Response(JSON.stringify({ error: 'Invite code missing from session.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (attendance !== 'Yes' && attendance !== 'No') {
      return new Response(JSON.stringify({ error: 'Please select whether you can attend.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await ensureTab();

    const now = new Date().toISOString();
    const existing = await findRow(code);
    const submittedAt = existing?.submittedAt || now;

    const row = [
      code,
      String(name).slice(0, 200),
      attendance,
      String(adults),
      String(children),
      String(arrivalDate).slice(0, 100),
      String(arrivalTime).slice(0, 100),
      String(travelMode).slice(0, 100),
      String(specialRequirements).slice(0, 2000),
      String(declineMessage).slice(0, 2000),
      submittedAt,
      now,
    ];

    if (existing) {
      const range = `${TAB}!A${existing.row}:${LAST_COL}${existing.row}`;
      const putRes = await fetch(
        `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`,
        { method: 'PUT', headers: gwHeaders(), body: JSON.stringify({ values: [row] }) },
      );
      if (!putRes.ok) {
        const txt = await putRes.text();
        console.error('RSVP update failed', putRes.status, txt);
        throw new Error(`Could not update your RSVP in the sheet (${putRes.status}): ${txt}`);
      }
    } else {
      const appendRes = await fetch(
        `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${TAB}!${RANGE_COLS}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        { method: 'POST', headers: gwHeaders(), body: JSON.stringify({ values: [row] }) },
      );
      if (!appendRes.ok) {
        const txt = await appendRes.text();
        console.error('RSVP append failed', appendRes.status, txt);
        throw new Error(`Could not save your RSVP to the sheet (${appendRes.status}): ${txt}`);
      }
    }

    return new Response(JSON.stringify({ ok: true, updated: !!existing }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('submit-rsvp error:', err);
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
