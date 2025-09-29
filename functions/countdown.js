// functions/countdown.js

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // public 内のHTMLを静的 import
  const htmlFiles = {
    "/countdown/win10.html": `<!DOCTYPE html>
<html><head><title>Windows 10 Countdown</title></head>
<body><h1>Windows 10 Countdown Page</h1></body></html>`,

    "/countdown/newyear.html": `<!DOCTYPE html>
<html><head><title>New Year Countdown</title></head>
<body><h1>New Year Countdown Page</h1></body></html>`,
  };

  if (pathname in htmlFiles) {
    return new Response(htmlFiles[pathname], {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
