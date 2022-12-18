const { faker } = require("@faker-js/faker");
const { Pool } = require("pg");
const format = require("pg-format");

// Connect with postgres
const pool = new Pool({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "join_us",
  max: 20,
});

//insert data

let persons = [];
for (var i = 0; i < 350; i++) {
  persons.push([faker.internet.email(), faker.date.past()]);
}

q1 = format("INSERT INTO users (email,created_at) VALUES %L", persons);

const ins = pool.query(q1, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err);
  }
});

const count = pool.query(
  "SELECT COUNT(*) as no_of_users FROM users",
  (err, res, _) => {
    if (!err) {
      console.log(res.rows);
    } else {
      console.log(err);
    }
  }
);

// insert data
// let person = { email: faker.internet.email(), created_at: faker.date.past() };
//
// let end_result = client.query("INSERT INTO users SET ?", person, (err, res) => {
//   if (err) console.log(err.message);
//   console.log(res);
// });

// no of users
