import { NextResponse } from "next/server";
import fs from "fs";

export async function GET(request) {
  const surveyid = request.nextUrl.searchParams.get("id");
  const datapath = process.cwd() + "/data/" + surveyid + ".json";
  const fsPromises = require("fs").promises;
  const fileContents = await fsPromises
    .readFile(datapath, "utf8")
    .catch((err) => console.error("Failed to read file", err));
  if (fileContents === undefined) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }
  return NextResponse.json(JSON.parse(fileContents));
}
