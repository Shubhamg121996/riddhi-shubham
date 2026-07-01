import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY = 'https://connector-gateway.lovable.dev/google_sheets/v4';
const SHEET_ID = '19I_1J2xh4ZyGDheAUdYBJDw8NX8BUHCqKg219O3069A';
const TAB = 'RSVP';
const HEADERS = [
  'Code',
  'Name',
  'Attendance',
  'Adults',
  'Children (<10)',
  'Arrival Date',
  'Arrival Time',
  'Travel Mode',
  'Special Requirements',
  'Decline Message',
  'Last Updated',
];

function gwHeaders() {
  return {
    Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
    'X-Connection-Api-Key': Deno.env.get('GOOGLE_SHEETS_API_KEY') ?? '',
    'Content-Type': 'application/json',
  };
}

async function ensureTab() {
  // Check if tab exists
  const metaRes = await fetch(
    `${GATEWAY}/spreadsheets/${SHEET_ID}?fields=sheets(properties(title))`,
    { headers: gwHeaders() },
  );
  if (!metaRes.ok) throw new Error(`meta fetch failed: ${metaRes.status} ${await metaRes.text()}`);
  const meta = await metaRes.json();
  const hasTab = (meta.sheets ?? []).some((s: any) => s.properties?.title === TAB);
  if (!hasTab) {
    const addRes = await fetch(`${GATEWAY}/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: 'POST',
      headers: gwHeaders(),
      body: JSON.stringify({
        requests: [{ addSheet: { properties: { title: TAB } } }],
      }),
    });
    if (!addRes.ok) throw new Error(`addSheet failed: ${addRes.status} ${await addRes.text()}`);
  }

  // Ensure header row
  const hdrRes = await fetch(`${GATEWAY}/spreadsheets/${SHEET_ID}/values/${TAB}!A1:K1`, {
    headers: gwHeaders(),
  });
  const hdrData = hdrRes.ok ? await hdrRes.json() : { values: [] };
  const currentHeaders: string[] = hdrData.values?.[0] ?? [];
  if (currentHeaders.length === 0 || currentHeaders[0] !== 'Code') {
    const putRes = await fetch(
      `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${TAB}!A1:K1?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: gwHeaders(),
        body: JSON.stringify({ values: [HEADERS] }),
      },
    );
    if (!putRes.ok) throw new Error(`header write failed: ${putRes.status} ${await putRes.text()}`);
  }
}

async function findRow(code: string): Promise<number | null> {
  const res = await fetch(`${GATEWAY}/spreadsheets/${SHEET_ID}/values/${TAB}!A:A`, {
    headers: gwHeaders(),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const rows: string[][] = data.values ?? [];
  for (let i = 1; i < rows.length; i++) {
    if ((rows[i][0] ?? '').toUpperCase() === code.toUpperCase()) return i + 1; // 1-indexed
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
      return new Response(JSON.stringify({ error: 'code required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (attendance !== 'Yes' && attendance !== 'No') {
      return new Response(JSON.stringify({ error: 'attendance must be Yes or No' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await ensureTab();

    const lastUpdated = new Date().toISOString();
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
      lastUpdated,
    ];

    const existingRow = await findRow(code);

    if (existingRow) {
      const range = `${TAB}!A${existingRow}:K${existingRow}`;
      const putRes = await fetch(
        `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: gwHeaders(),
          body: JSON.stringify({ values: [row] }),
        },
      );
      if (!putRes.ok) {
        throw new Error(`update failed: ${putRes.status} ${await putRes.text()}`);
      }
    } else {
      const appendRes = await fetch(
        `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${TAB}!A:K:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: 'POST',
          headers: gwHeaders(),
          body: JSON.stringify({ values: [row] }),
        },
      );
      if (!appendRes.ok) {
        throw new Error(`append failed: ${appendRes.status} ${await appendRes.text()}`);
      }
    }

    return new Response(JSON.stringify({ ok: true, updated: !!existingRow }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('submit-rsvp error', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
