//DANGER! THIS WILL NUKE THE DB!!!!
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    if (err) throw err;
    app.dataSources.db.automigrate();
});
