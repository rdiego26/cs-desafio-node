const constants = {

  db: {
    host: 'localhost',
    username: process.env.CS_DB_USER || 'postgres',
    password: process.env.CS_DB_PASSWORD || 'postgres',
    database: process.env.CS_DB || 'cs_desafio_node',
    port: 5432
  },

  message: {

    DEFAULT_ERROR: { mensagem: 'Erro ao processas requisição' },
    ALREADY_MAIL: { mensagem: 'E-mail já existente' },
    INVALID_SIGNIN_DATA: { mensagem: 'Usuário e/ou senha inválidos' }

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

