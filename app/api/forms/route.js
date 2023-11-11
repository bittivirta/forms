import { NextResponse } from "next/server";
import { getForm, databaseAvailable } from "app/lib/db-functions";

export async function GET(request) {
  // defining the database connection, this is used for all the functions to determine if the database is available or not. If it is not available, module will work with the local files.
  const database = await databaseAvailable();

  const surveyid = request.nextUrl.searchParams.get("id");

  //
  const fileContents = await fetchData(database, surveyid);
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
          "Access denied, this module has expired. Please check the URL or if you think this is an error, please contact us.",
      },
      { status: 410 }
    );
  }
}
async function fetchData(database, surveyid) {
  if (
    surveyid === "" ||
    surveyid === undefined ||
    surveyid === "undefined" ||
    surveyid === null
  ) {
    return undefined;
  }
  if (database) {
    const queryContents = await getForm(surveyid);
    return queryContents;
  } else {
    const datapath = process.cwd() + "/queries/" + surveyid + ".json";
    const fsPromises = require("fs").promises;
    const queryContents = await fsPromises
      .readFile(datapath, "utf8")
      .catch((err) => console.error("Failed to read file", err));
    return queryContents;
  }
}
