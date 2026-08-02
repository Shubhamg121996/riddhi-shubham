import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY = 'https://connector-gateway.lovable.dev/google_drive/drive/v3';
const FOLDER_ID = '1xIWkmIG0L9mAvU9aGxuxoX-RCZylWnmm';

function gwHeaders() {
  return {
    Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
    'X-Connection-Api-Key': Deno.env.get('GOOGLE_DRIVE_API_KEY') ?? '',
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const files: unknown[] = [];
    let pageToken: string | undefined;

    do {
      const params = new URLSearchParams({
        q: `'${FOLDER_ID}' in parents and trashed=false and mimeType contains 'image/'`,
        fields: 'nextPageToken, files(id,name,mimeType,description,createdTime,properties)',
        pageSize: '200',
        orderBy: 'createdTime desc',
      });
      if (pageToken) params.set('pageToken', pageToken);

      const res = await fetch(`${GATEWAY}/files?${params}`, { headers: gwHeaders() });
      if (!res.ok) {
        const body = await res.text();
        console.error(`Drive list failed [${res.status}]: ${body}`);
        return new Response(
          JSON.stringify({ error: 'Drive request failed', status: res.status, details: body }),
          { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
      const data = await res.json();
      for (const f of data.files ?? []) {
        files.push({
          id: f.id,
          name: f.name,
          uploadedBy: f.properties?.uploadedBy ?? f.description ?? '',
          createdTime: f.createdTime,
        });
      }
      pageToken = data.nextPageToken;
    } while (pageToken);

    return new Response(JSON.stringify({ photos: files }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('gallery-list error', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
