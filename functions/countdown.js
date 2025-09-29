export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  let fileUrl;
  if (pathname === "/countdown/win10.html") {
    fileUrl = `${context.env.PAGES_URL}/win10.html`;
  } else if (pathname === "/countdown/newyear.html") {
    fileUrl = `${context.env.PAGES_URL}/newyear.html`;
  } else {
    return new Response("Not Found", { status: 404 });
  }

  const res = await fetch(fileUrl);
  if (!res.ok) return new Response("Error fetching HTML", { status: 500 });

  const html = await res.text();
  return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
