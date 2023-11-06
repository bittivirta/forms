import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      { error: "This page supports only JSON requests" },
      { status: 415 }
    );
  }
  const res = await req.json();
  console.log(res);
  saveOutput(res);
  return NextResponse.json(res, { status: 200 });
}

// save request json to file, path for data is /submissions/formname/output.json
interface FormInput {
  inputId: string;
  formid: string;
  starttime: string;
  timestamp: string;
  userInput: [];
}
function saveOutput(res: FormInput) {
  const data = res;
  console.log(data);
  const formid = data.formid;
  const uuid = data.inputId;
  const fs = require("fs");
  const fsPromises = require("fs").promises;
  const path = require("path");
  // create auto increment id for each form

  const output = path.join(
    process.cwd(),
    "submissions",
    formid,
    `${uuid}.json`
  );
  if (!fs.existsSync(path.join(process.cwd(), "submissions", formid))) {
    fsPromises.mkdir(path.join(process.cwd(), "submissions", formid));
  }

  fsPromises
    .writeFile(output, JSON.stringify(data))
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
}
