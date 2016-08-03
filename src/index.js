const path = require('path');
const http = require('http');
const app = require(path.resolve('src/routes'));

http.createServer(app).listen(app.get('port'), function() {
  console.log(app.get('title') + ' listening on port ' + app.get('port'));
});
