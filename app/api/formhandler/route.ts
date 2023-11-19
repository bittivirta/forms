import { NextResponse } from "next/server";
import { addSubmission } from "../../lib/db-connector";

export async function POST(req: Request) {
  if (req.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      { error: "This page supports only JSON requests" },
      { status: 415 }
    );
  }
  const res = await req.json();
  const state = await saveOutput(res);
  if (state.error) {
    return NextResponse.json(
      {
        code: 500,
        error: "Internal server error " + state.error,
      },
      { status: 500 }
    );
  }
  return NextResponse.json(
    {
      code: 200,
      raw: state,
    },
    { status: 200 }
  );
}
async function saveOutput(res: any) {
  const data = res;
  const formid = data.formid;
  const uuid = data.inputId;
  const startTime = data.starttime;
  const endTime = data.timestamp;

  const query = await addSubmission(
    uuid,
    formid,
    startTime,
    endTime,
    JSON.stringify(data)
  );
  return query;
}
