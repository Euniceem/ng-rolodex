// require('dotenv').config({ path: '../.env' })
const config = require('../knexfile.js');
module.exports = require('knex')(config);