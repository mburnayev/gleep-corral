// README:  should be parsed as a TypeScript file; this file was changed to txt to prevent linter
//          errors but remains important since supabase doesn't have version control
// Edge Function: gemini-proxy with CORS support
// Set GEMINI_API_KEY as a secret.
// Optionally set CORS_ALLOWED_ORIGIN (e.g., http://localhost:3000) to restrict origins.
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const CLOUDFLARE_AUTH_TOKEN = Deno.env.get("CLOUDFLARE_BEARER_TOKEN") ?? "";
const CLOUDFLARE_API_KEY = Deno.env.get("CLOUDFLARE_WORKERS_AI_API_KEY") ?? "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
// const CLOUDFLARE_WORKER_API_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_AUTH_TOKEN}/ai/run/@cf/black-forest-labs/flux-1-schnell`;
const CLOUDFLARE_WORKER_API_URL = "https://api.cloudflare.com/client/v4/accounts/ac73d0deb385956e4d51115c5cb30790/ai/run/@cf/black-forest-labs/flux-1-schnell";
const CORS_ALLOWED_ORIGIN = Deno.env.get("CORS_ALLOWED_ORIGIN") ?? "*"; // default allow all
function corsResponse(body, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Access-Control-Allow-Origin", CORS_ALLOWED_ORIGIN);
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, x-client-info, apikey");
  return new Response(body, {
    ...init,
    headers
  });
}
Deno.serve(async (req)=>{
  if (req.method === "OPTIONS") {
    return corsResponse(null, {
      status: 204
    });
  }
  if (req.method !== "POST") {
    return corsResponse(JSON.stringify({
      error: "Method not allowed, use POST"
    }), {
      status: 405,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  try {
    const { tPrompt, iPrompt } = await req.json();
    if (tPrompt != "") {
      const geminiPayload = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: tPrompt
              }
            ]
          }
        ],
        generationConfig: {
          thinkingConfig: {
            thinkingBudget: 0
          }
        }
      };
      const geminiResponse = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify(geminiPayload)
      });
      const result = await geminiResponse.json();
      return corsResponse(JSON.stringify(result), {
        status: geminiResponse.status,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } 
    
    
    else if (iPrompt != "") {
      const fixedPrompt = { prompt: JSON.stringify(iPrompt)}
      const cfWorkerResponse = await fetch(CLOUDFLARE_WORKER_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_AUTH_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fixedPrompt)
      });
      const result = await cfWorkerResponse.json();
      console.log(result);
      return corsResponse(JSON.stringify(result), {
        status: cfWorkerResponse.status,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else {
      return corsResponse(JSON.stringify({
        error: "Missing/empty prompts (tPrompt/iPrompt) in request body"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  } catch (err) {
    console.error("Error in gemini-proxy:", err);
    return corsResponse(JSON.stringify({
      error: "Internal server error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
});
