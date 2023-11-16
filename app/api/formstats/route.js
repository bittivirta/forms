import { getStats } from "app/lib/db-connector";
import { NextResponse } from "next/server";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  const data = await getStats(id);
  if (data.error == "No result found") {
    return NextResponse.json(
      {
        code: 404,
        error: "No data found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(JSON.parse(data));
}
