import { NextResponse } from "next/server";

export async function GET(request) {
  const surveyid = request.nextUrl.searchParams.get("id");
  const datapath = process.cwd() + "/queries/" + surveyid + ".json";
  const fsPromises = require("fs").promises;
  const fileContents = await fsPromises
    .readFile(datapath, "utf8")
    .catch((err) => console.error("Failed to read file", err));
  if (fileContents === undefined) {
    return NextResponse.json(
      {
        code: 404,
        error:
          "Please check the URL or if you think this is an error, please contact us at on Discord.",
      },
      { status: 404 }
    );
  }
  let data = JSON.parse(fileContents);
  let time = Date.now();
  if (data.expires * 1000 > time && data.expires !== undefined) {
    return NextResponse.json(JSON.parse(fileContents));
  } else if (data.expires === undefined) {
    return NextResponse.json(JSON.parse(fileContents));
  } else {
    return NextResponse.json(
      {
        code: 410,
        error:
          "Access denied, this module has expired. Please check the URL or if you think this is an error, please contact us at on Discord.",
      },
      { status: 410 }
    );
  }
}
