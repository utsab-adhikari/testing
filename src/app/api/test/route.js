import ConnectDB from "@/lib/ConnectDB";

export async function GET() {
  await ConnectDB();

  return Response.json({ message: "DB Connected Successfully" });
}
