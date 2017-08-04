const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const path = require("path");
const favicon = require('serve-favicon');
const db = require('./config/db');
//controllers
const articleController = require("./controllers/articleController");
const mediaController = require("./controllers/mediaController");

module.exports = {
  app: function () {
    const app = express();
    //const indexPath = path.join(__dirname, 'indexDep.html');
    //const publicPath = express.static(path.join(__dirname, '../dist'));
    //app.use('/dist', publicPath);
    //app.get('/', function (_, res) { res.sendFile(indexPath) });

    app.use(favicon(path.join(__dirname,"./favicon.ico")));
    app.use("/public", express.static(path.join(__dirname,"../public")));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use("/api/articles", articleController);
    app.use("/api/media", mediaController);
    /*
    app.get("/*", function (req, res) {
      res.sendFile("index.html", {root: path.join(__dirname,"../public") })
    });
    */
    return app;
  }
}


//Express request pipeline
//const app = express();
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname,"../client/views"));
//app.use(favicon(path.join(__dirname,"./favicon.ico")));
//app.use(express.static(path.join(__dirname,"../public/assets")));
// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//app.use(cookieParser());
//app.use("/api", articleController);

//app.get('/*', function(req, res) {
//  res.render("homepage.ejs");
//});
