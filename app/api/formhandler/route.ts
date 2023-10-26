import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      { error: "This page supports only JSON requests" },
      { status: 415 }
    );
  }
  console.log(req);
  const res = await req.json();
  console.log(res);
  return NextResponse.json(res, { status: 200 });
}
export async function GET() {
  return NextResponse.json(
    { error: "This page supports only POST requests" },
    { status: 405 }
  );
}
