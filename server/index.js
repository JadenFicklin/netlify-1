require("dotenv").config();
const { PORT, CONNECTION_STRING } = process.env;
const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");
const { user } = require("pg/lib/defaults");

const app = express();

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "popstgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const users = await sequelize.query(`SELECT username FROM users`);

  // Sequel to check if username is already taken
  // `SELECT username FROM users WHERE username = '${username}'`;
  // [[], { meta }][([{ username: "abo" }], { meta })];

  // console.log(users);

  // for (let i = 0; i < users[0].length; i++) {
  //   console.log(users[0][i].username, username);
  //   if (users[0][i].username === username) {
  //     return res.status(400).send("username already exists");
  //   } else {
  return sequelize
    .query(
      `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`
    )
    .then((result) => res.send(result[0]).status(200));
  //   }
  // }
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});

// npm i sequelize pg pg-hstore axios dotenv express cors
