import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }
  // Do something with the data, then return a success response

  const tgMsg = `from: ${name}, ${email} - ${message}`;

  const botToken = import.meta.env.BOT_TOKEN;
  const ownerTgID = import.meta.env.OWNER_TG_ID;

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${ownerTgID}&text=${encodeURIComponent(
      tgMsg,
    )}`,
  );

  if (res.status === 200)
    return new Response(
      JSON.stringify({
        message: "Success!",
        status: 200,
      }),
    );

  return new Response(
    JSON.stringify({
      message: "Message couldn't be delivered.",
      status: 400,
    }),
  );
};
