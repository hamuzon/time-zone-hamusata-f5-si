// functions/countdown.js

import win10Html from "win10.html?raw";
import newyearHtml from "newyear.html?raw";

const htmlFiles = {
  "/countdown/win10.html": win10Html,
  "/countdown/newyear.html": newyearHtml,
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (pathname in htmlFiles) {
    return new Response(htmlFiles[pathname], {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
