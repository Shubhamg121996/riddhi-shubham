import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY = 'https://connector-gateway.lovable.dev/google_sheets/v4';
const SHEET_ID = '19I_1J2xh4ZyGDheAUdYBJDw8NX8BUHCqKg219O3069A';
const TAB = 'RSVP';
const RANGE = `${TAB}!A:L`;

function gwHeaders() {
  return {
    Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
    'X-Connection-Api-Key': Deno.env.get('GOOGLE_SHEETS_API_KEY') ?? '',
    'Content-Type': 'application/json',
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { code } = await req.json();
    if (!code || typeof code !== 'string') {
      return new Response(JSON.stringify({ error: 'code required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(`${GATEWAY}/spreadsheets/${SHEET_ID}/values/${RANGE}`, {
      headers: gwHeaders(),
    });

    if (!res.ok) {
      // Tab likely doesn't exist yet — no rsvp
      return new Response(JSON.stringify({ rsvp: null }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    const rows: string[][] = data.values ?? [];
    const match = rows.slice(1).find((r) => (r[0] ?? '').toUpperCase() === code.toUpperCase());
    if (!match) {
      return new Response(JSON.stringify({ rsvp: null }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rsvp = {
      code: match[0] ?? '',
      name: match[1] ?? '',
      attendance: match[2] ?? '',
      adults: Number(match[3] ?? 0) || 0,
      children: Number(match[4] ?? 0) || 0,
      arrivalDate: match[5] ?? '',
      arrivalTime: match[6] ?? '',
      travelMode: match[7] ?? '',
      specialRequirements: match[8] ?? '',
      declineMessage: match[9] ?? '',
      lastUpdated: match[10] ?? '',
    };

    return new Response(JSON.stringify({ rsvp }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('get-rsvp error', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
