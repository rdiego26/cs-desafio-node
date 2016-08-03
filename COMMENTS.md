# Considerações

- O cadastro está forçado para persistir apenas um telefone .
- Não pude implementar o [JWT](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens) .

# Melhorias / Ajustes na arquitetura
- Caso escolhesse continuar com o PostgreSQL como banco, iria alterar para todo dado ser armazenado como JSON .
- Uma outra opção interessante para persistir os dados seria o Mongo .
- Uma melhoria que faria seria usar o Redis para controlar o tempo das sessões, aproveitando o [TTL](http://redis.io/commands/ttl), já usei para gerenciar sessões de aplicativos mobile e ficou interessante .
- Aumentar o code coverage do projeto .