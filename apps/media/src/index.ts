export interface Env {
  ASSETS: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const key = url.pathname.replace(/^\/media\//, "media/");
    if (request.method === "GET") {
      const obj = await env.ASSETS.get(key);
      if (!obj) return new Response("Not found", { status: 404 });
      return new Response(obj.body, {
        headers: {
          "content-type": obj.httpMetadata?.contentType || "application/octet-stream"
        }
      });
    }
    return new Response("Method not allowed", { status: 405 });
  }
};
