// get the client
const mysql = require("mysql2/promise");

// create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/* Function to get a form from the database
 * @param id: id of form
 * @returns JSON object as string with form data
 *
 * If there is an error, the JSON object will contain an error field
 * eg. form does not exist or database tables do not exist (first time running)
 */
export async function getForm(id: string) {
  try {
    const [rows, fields, err] = await pool.execute(
      "SELECT * FROM `forms` WHERE `name` = ?",
      [id]
    );
    const data = await formRowsToJson(rows);

    return data;
  } catch (err: any) {
    if (err.code === "ER_NO_SUCH_TABLE") {
      console.log("Table not found, creating tables");
      let initTables = await createTables();
      getForm(id);
    }
    return { error: err.code };
  }
}
/* Function to convert rows from database to JSON format
 * @param rows: rows from database
 * @returns JSON object as string with form data
 */
async function formRowsToJson(rows: any) {
  if (rows[0] === undefined) {
    return { error: "No result found" };
  }
  let data = rows[0];

  data["publicFields"] = JSON.parse(data["publicFields"]);
  data["fields"] = JSON.parse(data["fields"]);
  data = JSON.stringify(data);
  return data;
}

/* Function to create tables if they do not exist
 * @returns true if tables are created, false if tables are not created
 */
async function createTables() {
  const forms_init = `CREATE TABLE IF NOT EXISTS forms (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL UNIQUE,
    title VARCHAR(256) NOT NULL,
    description LONGTEXT NOT NULL,
    fields LONGTEXT NOT NULL,
    publicFields LONGTEXT NULL,
    expires BIGINT NULL,
    PRIMARY KEY (id)
  )`;
  const submissions_init = `CREATE TABLE IF NOT EXISTS submissions (
    id INT NOT NULL AUTO_INCREMENT,
    inputId VARCHAR(256) NOT NULL UNIQUE,
    formId VARCHAR(256) NOT NULL,
    startTime BIGINT NOT NULL, 
    endTime BIGINT NOT NULL,
    userInput LONGTEXT NOT NULL,
    PRIMARY KEY (id)
  )`;
  const [forms, formserr] = await pool.execute(forms_init);
  const [submissions, submissionerr] = await pool.execute(submissions_init);
  if (forms === undefined || submissions === undefined) {
    return false;
  } else {
    return true;
  }
}

/* Function to get statistics of a form from the database
 *  @param id: id of form
 *  @returns JSON object with statistics
 *
 *  If there is an error, the JSON object will contain an error field
 *  eg. form does not exist or database tables do not exist (first time running)
 *  Example JSON given in statsRowsToJson function
 */
export async function getStats(id: string) {
  try {
    const [rows, fields, err] = await pool.execute(
      "SELECT * FROM `submissions` WHERE `formId` = ?",
      [id]
    );
    const data = await statsRowsToJson(rows, id);
    return data;
  } catch (err: any) {
    if (err.code === "ER_NO_SUCH_TABLE") {
      // creating tables if they do not exist, if they do exist, then there is an error
      console.log("Table not found, creating tables");
      let initTables = await createTables();
      // recursively call getStats function to get statistics after creating tables
      getStats(id);
    }
    return { error: err.code };
  }
}

/* Function to convert rows statistics from database to JSON format
 *  @param rows: rows from database
 *  @param id: id of form
 *  @returns JSON object with statistics
 *
 *  Example JSON object:
 *  {
 *    "general": {
 *      "title": "Test form",
 *      "description": "This is a test form",
 *      "fields": ["age"], // these are the public fields, not all fields, public fields are meant for raw data requests for such fields that are meant to be public.
 *      "response_amount": 3,
 *      "avg_duration": 10,
 *      "duration_available": 3
 *    },
 *    "responses": [
 *      {
 *        "id": "1234",
 *        "queries": [
 *          {
 *            "field": "age",
 *            "value": "18"
 *          }
 *        ]
 *      } ...
 *    ]
 *  }
 */
async function statsRowsToJson(rows: any, id: string) {
  if (rows[0] === undefined) {
    return { error: "No result found" };
  }
  const responses = {} as any;
  const formName = await getFormField(id, "title");
  const formDesc = await getFormField(id, "description");
  const publicFields = await getFormField(id, "publicFields");
  const fields = JSON.parse(publicFields);

  responses["general"] = {
    title: formName,
    description: formDesc,
    fields: fields,
    response_amount: 0,
    avg_duration: 0,
    duration_available: 0,
  };
  responses["responses"] = {};

  for (let i = 0; i < rows.length; i++) {
    let response = {
      id: rows[i]["inputId"],
      queries: [] as any,
    };
    for (let j = 0; j < Object.keys(fields).length; j++) {
      let data = rows[i]["userInput"];
      data = JSON.parse(data);
      let query = {
        field: fields[j],
        value: data["userInput"][fields[j]],
      } as any;
      response.queries.push(query);
      responses["responses"][i] = response;
    }
    if (rows[i]["endTime"] !== null) {
      responses["general"]["duration_available"]++;
      responses["general"]["avg_duration"] +=
        rows[i]["endTime"] - rows[i]["startTime"];
    }
    responses["general"]["response_amount"]++;
  }
  responses["general"]["avg_duration"] = Math.ceil(
    responses["general"]["avg_duration"] /
      responses["general"]["duration_available"] /
      1000
  );

  return JSON.stringify(responses);
}

/* Function to get a field from the form table
 * @param id: id of form
 * @param field: field to get from form table
 * @returns JSON object with field
 */
async function getFormField(id: string, field: string) {
  try {
    const [rows, fields, err] = await pool.execute(
      "SELECT * FROM `forms` WHERE `name` = ?",
      [id]
    );
    const data = JSON.parse(JSON.stringify(rows[0][field]));
    return data;
  } catch (err: any) {
    return { error: err.code };
  }
}

/* Function for adding a form submission to the database
 * @param inputId: id of form submission
 * @param formId: id of form
 * @param startTime: start time of form submission
 * @param endTime: end time of form submission
 * @param userInput: user input of form submission
 * @returns JSON object with field
 */
export async function addSubmission(
  inputId: string,
  formId: string,
  startTime: number,
  endTime: number,
  userInput: string
) {
  try {
    const [rows, fields, err] = await pool.execute(
      "INSERT INTO submissions (inputId, formId, startTime, endTime, userInput) VALUES (?, ?, ?, ?, ?)",
      [inputId, formId, startTime, endTime, userInput]
    );
    return rows;
  } catch (err: any) {
    if (err.code == "ER_DUP_ENTRY") {
      const resubmit = (await addSubmission(
        "#" + inputId,
        formId,
        startTime,
        endTime,
        userInput
      )) as any;
      return resubmit;
    } else {
      return { error: err.code };
    }
  }
}
