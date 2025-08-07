const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",  // change to your MySQL root password
  database: "task_manager"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

module.exports = db;
