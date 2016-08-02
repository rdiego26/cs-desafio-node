const constants = {

  db: {
    host: 'localhost',
    username: process.env.CS_DB_USER || 'postgres',
    password: process.env.CS_DB_PASSWORD || 'postgres',
    database: process.env.CS_DB || 'cs_desafio_node',
    port: 5432
  },

  app: {
    name: 'Sign-in / Sign-out API'
  },

  header: {
    json: 'application/json;charset=UTF-8;'
  },

  server: {
    port: 4300
  }

};
module.exports = constants;

