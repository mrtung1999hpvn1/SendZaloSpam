/** @format */

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bypartshopdata",
  password: "temis.vn",
  port: 5431,
});
// const pool = new Pool({
//   user: 'pxbvwnaehnvmai',
//   host: 'ec2-54-172-17-119.compute-1.amazonaws.com',
//   database: 'da6op2gc2rk2s6',
//   password: 'c58674b8f810fb9ca19a3032e1df7a58ff7c7c2e5440990de588cd628db17874',
//   port: 5432,
// });
module.exports = pool;
