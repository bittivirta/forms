import { NextResponse } from "next/server";

export async function GET(request) {
  const surveyid = request.nextUrl.searchParams.get("id");

  const datapath = process.cwd() + "/submissions/" + surveyid;
  const fsPromises = require("fs").promises;

  //get all files in the directory
  const files = await fsPromises
    .readdir(datapath)
    .catch((err) => console.error("Failed to read file", err));

  if (files === undefined || files.length === 0) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }
  let data = await getPublicFields(surveyid); // get the public fields
  let responses = await getResponses(data, surveyid) // get the responses
    .then((responses) => {
      // get the stats

      responses = JSON.parse(responses);
      return responses;
    })
    .catch((err) => console.error("Failed to read file", err));
  return NextResponse.json(responses, { status: 200 });
}

// go through the first file and get the public field values

async function getResponses(vars, surveyid) {
  const datapath = process.cwd() + "/submissions/" + surveyid;
  const fsPromises = require("fs").promises;
  const respLength = vars.publicfields.length;
  const files = await fsPromises
    .readdir(datapath)
    .catch((err) => console.error("Failed to read file", err));
  const responses = {};
  responses[0] = {
    title: vars.title,
    description: vars.description,
    fields: vars.fieldnames,
    response_amount: 0,
  };
  for (let i = 0; i < files.length; i++) {
    // read only JSON files
    if (!files[i].endsWith(".json")) {
      continue;
    }
    const fileContents = await fsPromises
      .readFile(datapath + "/" + files[i], "utf8")
      .catch((err) => console.error("Failed to read file", err))
      .then((data) => {
        let j = 0;
        data = JSON.parse(data);
        let response = { id: data.inputId, queries: [] };
        for (j = 0; j < respLength; j++) {
          let fieldid = vars.publicfields[j];

          response.queries.push(data.userInput[fieldid]);
        }
        responses[i] = response;
        responses[0].response_amount = i;
      });
  }
  return JSON.stringify(responses);
}

async function getPublicFields(surveyid) {
  const path = process.cwd() + "/queries/" + surveyid + ".json";
  const fsPromises = require("fs").promises;
  const fileContents = await fsPromises
    .readFile(path, "utf8")
    .catch((err) => console.error("Failed to read file", err));
  if (fileContents === undefined) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }
  // parse the JSON into an object
  const data = JSON.parse(fileContents);
  // return title, description, and publicfields
  let fieldNames = [];
  for (let i = 0; i < data.publicfields.length; i++) {
    fieldNames.push(data.publicfields[i]);
  }
  let fields = {
    title: data.title,
    description: data.description,
    publicfields: data.publicfields,
    fieldnames: fieldNames,
  };
  return fields;
}
