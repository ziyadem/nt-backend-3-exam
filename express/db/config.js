const { Pool } = require("pg");

const client = new Pool({
  user: "postgres",
  database: "credohouse_db",
  port: 5432,
  host: "localhost",
});

client.connect();

module.exports = client;
