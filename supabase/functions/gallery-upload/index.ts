import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const UPLOAD_GATEWAY = 'https://connector-gateway.lovable.dev/google_drive/upload/drive/v3/files';
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
    const body = await req.json();
    const name = typeof body?.name === 'string' ? body.name.slice(0, 120) : '';
    const mimeType = typeof body?.mimeType === 'string' ? body.mimeType : '';
    const uploadedBy = typeof body?.uploadedBy === 'string' ? body.uploadedBy.slice(0, 80) : 'Guest';
    const dataB64 = typeof body?.data === 'string' ? body.data : '';

    if (!name || !mimeType.startsWith('image/') || !dataB64) {
      return new Response(JSON.stringify({ error: 'name, image mimeType and data are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const binary = Uint8Array.from(atob(dataB64), (c) => c.charCodeAt(0));
    if (binary.byteLength > 15 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'file too large' }), {
        status: 413,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const metadata = {
      name,
      parents: [FOLDER_ID],
      description: `Uploaded by ${uploadedBy}`,
      properties: { uploadedBy },
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([binary], { type: mimeType }));

    const res = await fetch(`${UPLOAD_GATEWAY}?uploadType=multipart&fields=id,name`, {
      method: 'POST',
      headers: gwHeaders(),
      body: form,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Drive upload failed [${res.status}]: ${text}`);
      return new Response(JSON.stringify({ error: 'Drive upload failed', status: res.status, details: text }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const file = await res.json();
    return new Response(JSON.stringify({ file }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('gallery-upload error', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
