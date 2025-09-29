import fs from "fs";
import path from "path";

/**
 * Cloudflare Pages Function
 * /countdown/* にアクセスされたら public 内の対応ファイルを返す
 */
export async function onRequest(context) {
  const urlPath = context.request.url.replace(context.env.PAGES_BRANCH, ""); // URLのパスを取得
  const pathname = new URL(context.request.url).pathname;

  let fileName;

  if (pathname.endsWith("win10.html")) {
    fileName = "win10.html";
  } else if (pathname.endsWith("newyear.html")) {
    fileName = "newyear.html";
  } else {
    return new Response("Not Found", { status: 404 });
  }

  const filePath = path.resolve("public", fileName);
  const html = fs.readFileSync(filePath, "utf8");

  return new Response(html, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}
