const text = await Deno.readTextFile("./sample.html");
Deno.serve(() => {
  return new Response(text, {
    headers: {
      "content-type": "text/html",
    },
  });
});
