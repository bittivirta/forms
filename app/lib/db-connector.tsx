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
