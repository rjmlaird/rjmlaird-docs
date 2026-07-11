export interface Env {
  ASSETS: R2Bucket;
  UPLOAD_TOKEN?: string;
  PUBLIC_BASE_URL: string;
}

function redirect(url: string) {
  return Response.redirect(url, 303);
}

function sanitizeName(name: string) {
  return name.replace(/[^\w.\-]+/g, "_");
}

async function handleUpload(request: Request, env: Env) {
  const form = await request.formData();
  const target = String(form.get("target") || "").toLowerCase();
  const file = form.get("file");

  if (target !== "docs" && target !== "media") {
    return redirect("/upload?error=Invalid+target");
  }

  if (!(file instanceof File)) {
    return redirect("/upload?error=Missing+file");
  }

  if (env.UPLOAD_TOKEN) {
    const auth = request.headers.get("authorization") || "";
    const supplied = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (supplied !== env.UPLOAD_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const safeName = sanitizeName(file.name || "upload");
  const key = `${target}/${stamp}-${safeName}`;

  await env.ASSETS.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: file.type || "application/octet-stream"
    }
  });

  const url = `${env.PUBLIC_BASE_URL.replace(/\/$/, "")}/${key}`;
  return redirect(`/upload?message=${encodeURIComponent(`Uploaded to ${target}: ${url}`)}`);
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return redirect("/upload");
    }

    if (request.method === "GET" && url.pathname === "/upload") {
      return fetch(request);
    }

    if (request.method === "POST" && url.pathname === "/upload") {
      return handleUpload(request, env);
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json({ ok: true });
    }

    return new Response("Not found", { status: 404 });
  }
};
