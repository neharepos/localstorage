export async function POST(request) {
  const data = await request.json();
  console.log("User message:", data.message);

  return new Response(
    JSON.stringify({ message: "Message logged!" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
