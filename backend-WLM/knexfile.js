const path = require("path");
require("dotenv").config({path: './.env'});

const {DATABASE_URL} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
  // TEST capabilities re:sqlite3 removed after assignment completion. 
  // test: {
  //   client: "sqlite3",
  //   connection: {
  //     filename: ":memory:",
  //   },
  //   migrations: {
  //     directory: path.join(__dirname, "src", "db", "migrations"),
  //   },
  //   seeds: {
  //     directory: path.join(__dirname, "src", "db", "seeds"),
  //   },
  //   useNullAsDefault: true,
  // },
};
