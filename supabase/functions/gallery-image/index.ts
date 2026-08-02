import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY = 'https://connector-gateway.lovable.dev/google_drive/drive/v3';

function gwHeaders() {
  return {
    Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
    'X-Connection-Api-Key': Deno.env.get('GOOGLE_DRIVE_API_KEY') ?? '',
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id') ?? '';
    if (!/^[A-Za-z0-9_-]{10,80}$/.test(id)) {
      return new Response(JSON.stringify({ error: 'invalid id' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(`${GATEWAY}/files/${id}?alt=media`, { headers: gwHeaders() });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Drive download failed [${res.status}]: ${body}`);
      return new Response(JSON.stringify({ error: 'Drive request failed', status: res.status, details: body }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const bytes = await res.arrayBuffer();
    return new Response(bytes, {
      headers: {
        ...corsHeaders,
        'Content-Type': res.headers.get('content-type') ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e) {
    console.error('gallery-image error', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
