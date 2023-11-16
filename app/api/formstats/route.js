import { getStats } from "app/lib/db-connector";
import { NextResponse } from "next/server";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  const data = await getStats(id);
  if (data.error == "No result found") {
    return NextResponse.json(
      {
        code: 404,
        error:
          "Please check the URL or if you think this is an error, please contact us.",
      },
      { status: 404 }
    );
  }
  if (data) {
    if (data.error) {
      return NextResponse.json(
        {
          code: 500,
          error: "Internal server error " + data.error,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(JSON.parse(data));
    }
  }
}
