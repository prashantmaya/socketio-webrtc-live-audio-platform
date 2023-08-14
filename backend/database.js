const mongoose = require("mongoose");

function DBConnect() {
  const DB_URL = process.env.DB_URL;
  mongoose.connect(DB_URL, {
    useNewUrlParser: true, // Use "useNewUrlParser" instead of "useNewURLParser"
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on(
    "error",
    console.error.bind(console, "Error while connecting to the DB...")
  ); // Add "console" before "error"
  db.once("open", () => {
    console.log("DB Connected...");
  });
}

module.exports = DBConnect;
