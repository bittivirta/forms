const mysql = require("mysql2");
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

// initializing database connection
function conn() {
  const connection = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_pass,
    database: db_name,
    port: db_port,
  });
  return connection;
}

export async function getForm(id: string) {
  // formFields is used to map the result to the form object, fields 0 and 1 are not used as they are not needed
  let formFields = [
    "id",
    "name",
    "title",
    "description",
    "fields",
    "publicfields",
    "expires",
  ];
  return new Promise((resolve, reject) => {
    conn().query(
      `SELECT * FROM forms WHERE name = ?`,
      id,
      (err: string, result: any) => {
        if (err) {
          let error = err.toString();
          // if connection works, but table is not found, create tables and try again
          if (error.includes("ER_NO_SUCH_TABLE")) {
            console.log("Table not found, creating tables");
            createTables();
            getForm(id);
          } else if (err) {
            // if connection does not work, reject promise
            console.log(err);
            reject(err);
            conn().end();
          }
        } else {
          // if no result is found, return undefined
          if (result[0] === undefined) {
            conn().end();
            resolve(undefined);
          } else {
            // else return result
            let res = Object.values(JSON.parse(JSON.stringify(result[0]))); // convert result to json and then eventually to object
            let obj = {} as any; // create empty object
            for (let i = 2; i < res.length; i++) {
              // create new object with formFields as keys and res as values, starting at 2 as id and name are not needed
              obj[formFields[i]] = res[i];
            }
            if (obj["expires"] == null) {
              obj["expires"] = undefined;
            }
            // parse fields as json as it is stored as string in db
            obj["fields"] = JSON.parse(obj["fields"]);
            obj["publicfields"] = JSON.parse(obj["publicfields"]);
            // convert object to json
            const json = JSON.stringify(obj);
            // return json and end connection
            conn().end();
            resolve(json);
          }
        }
      }
    );
  });
}

// return test_connection function value as boolean, true if connection is successful, false if not
function test_connection() {
  return new Promise((resolve) => {
    conn().connect((err: string) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export async function databaseAvailable() {
  const result = await test_connection();
  return result;
}
// create tables if they do not exist
function createTables() {
  conn().connect;

  // create table with id int(11) autoinc, name varchar(256) unique, title varchar(256), description longtext, fields longtext longtext, publicFields longtext, expires bigint

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
  // create table submissions with id int(11) autoinc, inputId uuid4,  formId, starttime, endtime, userInput longtext

  const submissions_init = `CREATE TABLE IF NOT EXISTS submissions (
    id INT NOT NULL AUTO_INCREMENT,
    inputId VARCHAR(256) NOT NULL UNIQUE,
    formId VARCHAR(256) NOT NULL,
    startTime BIGINT NOT NULL, 
    endTime BIGINT NOT NULL,
    userInput LONGTEXT NOT NULL,
    PRIMARY KEY (id)
  )`;
  const forms = conn().query(forms_init, (err: string, result: any) => {
    if (err) throw err;
  });
  const submissions = conn().query(
    submissions_init,
    (err: string, result: any) => {
      if (err) throw err;
    }
  );
  conn().end();

  if (forms === undefined || submissions === undefined) {
    return false;
  } else {
    console.log("Tables created");
    return true;
  }
}

export async function addResponse(
  inputId: string,
  formId: string,
  startTime: number,
  endTime: number,
  userInput: string
) {
  return new Promise((resolve, reject) => {
    conn().query(
      `INSERT INTO submissions (inputId, formId, startTime, endTime, userInput) VALUES (?, ?, ?, ?, ?)`,
      [inputId, formId, startTime, endTime, userInput],
      (err: string, result: any) => {
        if (err) {
          conn().end();
          reject(err);
        } else {
          conn().end();
          resolve(result);
        }
      }
    );
  });
}

export async function getDbResponses(formId: string) {
  const responseFields = [
    "id",
    "inputId",
    "formId",
    "startTime",
    "endTime",
    "userInput",
  ];
  return new Promise((resolve, reject) => {
    conn().query(
      `SELECT * FROM submissions WHERE formId = ?`,
      formId,
      (err: string, result: any) => {
        if (err) {
          conn().end();
          resolve({ error: err });
        } else if (result[0] === undefined) {
          conn().end();
          resolve(undefined);
        } else {
          conn().end();
          let obj = {} as any; // create empty object
          for (let i = 0; i < result.length; i++) {
            // create new object with responseFields as keys and res as values
            obj[i] = {} as any;
            for (let j = 0; j < responseFields.length; j++) {
              obj[i][responseFields[j]] = result[i][responseFields[j]];
            }
          }

          const json = JSON.stringify(obj);
          resolve(json);
        }
      }
    );
  });
}
