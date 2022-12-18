var express = require("express");
var app = express();
const { Pool } = require("pg");
var bodyParser = require("body-parser");
var path = require("path");

// Connect with postgres
const pool = new Pool({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "join_us",
  max: 20,
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views/public")));

app.post("/register", function (req, res) {
  let email = req.body.email;
  let q1 = `INSERT INTO users(email) 
            VALUES ('${email}');`;
  const ins = pool.query(q1, (err, result) => {
    if (err) {
      console.log(err.message);
    }
  });
  res.redirect("/");
});

app.get("/", function (req, res) {
  let total_subsribers = pool.query(
    "SELECT COUNT(*) FROM users;",
    (err, results) => {
      if (err) {
        console.log(err.message);
      }
      let count = results.rows[0]["count"];
      res.render("home", { count: count });
    }
  );
});

app.listen(8080, function () {
  console.log("Server running on 8080!");
});
