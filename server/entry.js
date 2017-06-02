var indexRoute = require('./routes/index');

console.log("f333ff222ff");

module.exports = (app) => {
    app.use(indexRoute.routes());
}