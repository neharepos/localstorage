export async function GET() {
  return new Response(
    JSON.stringify({ message: "Send a POST request to log a message" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}