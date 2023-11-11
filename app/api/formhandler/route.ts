import { NextResponse } from "next/server";
import { addResponse, databaseAvailable } from "../../lib/db-functions";

export async function POST(req: Request) {
  if (req.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      { error: "This page supports only JSON requests" },
      { status: 415 }
    );
  }
  const res = await req.json();
  saveOutput(res);
  return NextResponse.json(res, { status: 200 });
}

// save request json to file, path for data is /submissions/formname/output.json
interface FormInput {
  inputId: string;
  formid: string;
  starttime: number;
  timestamp: number;
  userInput: [];
}
async function saveOutput(res: FormInput) {
  const database = await databaseAvailable();
  const data = res;
  const formid = data.formid;
  const uuid = data.inputId;
  const startTime = data.starttime;
  const endTime = data.timestamp;
  if (database) {
    // if database is available, save data to database

    const query = await addResponse(
      uuid,
      formid,
      startTime,
      endTime,
      JSON.stringify(data)
    );
    query ? console.log("data added to database") : console.log("error", query);
    let state = false;
    query ? (state = true) : (state = false);
    return state;
  } else {
    console.log("database not available, saving to file");
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
      .then(() =>
        console.log("data added to form " + formid + " with id " + uuid)
      )
      .catch((err: string) => console.log(err));
    return true;
  }
}
