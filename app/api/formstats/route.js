import { NextResponse } from "next/server";
import {
  getDbResponses,
  databaseAvailable,
  getForm,
} from "../../lib/db-functions";

// Define an async function to handle GET requests
export async function GET(request) {
  // Extract the survey ID from the request URL's search parameters
  const surveyid = request.nextUrl.searchParams.get("id");
  const database = await databaseAvailable();
  if (database) {
    const stats = await getResponsesFromDB(surveyid);
    return NextResponse.json(stats, { status: 200 });
  } else {
    // Construct the path to the directory where the survey data is stored
    const datapath = process.cwd() + "/submissions/" + surveyid;
    // Import the fs.promises module for working with the file system
    const fsPromises = require("fs").promises;

    // Try to read the directory and get a list of all files in it
    const files = await fsPromises
      .readdir(datapath)
      .catch((err) => console.error("Failed to read file", err));

    // If no files were found, return a 404 error
    if (files === undefined || files.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    // Get the public fields for the survey
    let data = await getPublicFields(surveyid);
    // Get the responses for the survey
    let responses = await getResponses(data, surveyid)
      .then((responses) => {
        // Parse the responses from JSON
        responses = JSON.parse(responses);
        return responses;
      })
      .catch((err) => console.error("Failed to read file", err));

    // Return the responses as a JSON object with a 200 OK status
    return NextResponse.json(responses, { status: 200 });
  }
}

// Define an async function to get the responses for a survey
async function getResponses(vars, surveyid) {
  // Construct the path to the directory where the survey data is stored
  const datapath = process.cwd() + "/submissions/" + surveyid;
  // Import the fs.promises module for working with the file system
  const fsPromises = require("fs").promises;
  // Get the number of public fields in the survey

  const respLength = vars.publicfields.length;
  // Try to read the directory and get a list of all files in it
  const files = await fsPromises
    .readdir(datapath)
    .catch((err) => console.error("Failed to read file", err));
  // Initialize an object to store the responses
  const responses = {};
  // Add the survey metadata to the responses object
  responses["general"] = {
    title: vars.title,
    description: vars.description,
    fields: vars.fieldnames,
    response_amount: 0,
    avg_duration: 0,
    duration_available: 0,
  };

  responses["responses"] = {};
  // Loop over the files and process each one
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

        // parse the JSON into an object
        data = JSON.parse(data);
        // create a response object with the ID and the public fields
        let response = {
          id: data.inputId,
          queries: [],
        };
        // calculate the response time based on endtime - starttime
        if (
          typeof data.timestamp === "number" &&
          typeof data.starttime === "number"
        ) {
          responses["general"].avg_duration =
            responses["general"].avg_duration +
            (data.timestamp - data.starttime);
          responses["general"].duration_available++;
        }
        // loop over the public fields and add them to the response object
        for (j = 0; j < respLength; j++) {
          // get the field ID from the public fields array
          let fieldid = vars.publicfields[j];
          // add the field to the response object
          response.queries.push(data.userInput[fieldid]);
          responses["responses"][i] = response;
        }
        // return the response object
        // increment the response amount
        responses["general"].response_amount =
          responses["general"].response_amount + 1;
      });
  }
  responses["general"].avg_duration = Math.ceil(
    responses["general"].avg_duration /
      responses["general"].duration_available /
      1000
  );
  // return the responses as a JSON string
  return JSON.stringify(responses);
}
// Define an async function to get the public fields for a survey
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

  // check if the publicfields array exists, if it doesnt, create empty array
  if (data.publicfields === undefined) {
    data.publicfields = [];
  }

  // return title, description, and publicfields
  let fieldNames = [];
  // loop over the public fields and add them to the fieldNames array
  for (let i = 0; i < data.publicfields.length; i++) {
    fieldNames.push(data.publicfields[i]);
  }
  // return the title, description, publicfields, and fieldnames
  let fields = {
    title: data.title,
    description: data.description,
    publicfields: data.publicfields,
    fieldnames: fieldNames,
  };
  return fields;
}

async function getResponsesFromDB(surveyid) {
  // using the database if available
  // Get the public fields for the survey
  const formFields = await getForm(surveyid);
  if (formFields === undefined) {
    return { error: "No data found" };
  }
  const formFieldsObj = JSON.parse(formFields);
  const publicFields = formFieldsObj["publicfields"];
  const pflen = publicFields.length;

  // Get the responses for the survey
  const dbResponses = await getDbResponses(surveyid);
  // if no responses were found, return an 404 error
  if (dbResponses === undefined) {
    return { error: "No data found" };
  }
  // parse the responses from json
  let resp = JSON.parse(dbResponses);

  const responses = {};
  // Add the survey keys to the responses object
  responses["general"] = {
    title: formFieldsObj["title"],
    description: formFieldsObj["description"],
    fields: publicFields,
    response_amount: 0,
    avg_duration: 0,
    duration_available: 0,
  };
  // Add the responses to the responses object
  responses["responses"] = {};
  // Loop over the responses and process each one
  for (let i = 0; i < Object.keys(resp).length; i++) {
    let response = {
      id: resp[i]["inputId"],
      queries: [],
    };
    // for each response, loop over the public fields and add them to the response object
    for (let j = 0; j < pflen; j++) {
      let fieldid = publicFields[j];
      let clientResp = JSON.parse(resp[i]["userInput"]);
      response.queries.push(clientResp.userInput[fieldid]);
      responses["responses"][i] = response;
    }
    // calculate the response time based on endtime - starttime if available
    if (
      typeof resp[i]["startTime"] === "number" &&
      typeof resp[i]["endTime"] === "number"
    ) {
      responses["general"].avg_duration =
        responses["general"].avg_duration +
        (resp[i]["endTime"] - resp[i]["startTime"]);
      responses["general"].duration_available++;
    }
    // calculate correct response amount
    responses["general"].response_amount =
      responses["general"].response_amount + 1;
  }
  // calculate the average response time, earch response time is in milliseconds so divide by 1000 to get seconds
  responses["general"].avg_duration = Math.ceil(
    responses["general"].avg_duration /
      responses["general"].duration_available /
      1000
  );
  // return the responses as a JSON string
  return responses;
}
