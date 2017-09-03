const path = require("path");
const Server = require('./server/server.js')
const port = (process.env.PORT || 8080)
const app = Server.app();
const reactHelmet = require("react-helmet");

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.dev.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}



app.get("/*", function (req, res) {
  //res.sendFile("index.html", {root: path.join(__dirname, "./public") })
  const helmet = reactHelmet.Helmet.renderStatic();
  const html = `
      <!doctype html>
      <html ${helmet.htmlAttributes.toString()}>
          <head>
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              <!-- Latest compiled and minified CSS -->
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
              <!-- Optional theme -->
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
              <!--[if lt IE 9]>
              <script>
                  (function(){
                    var ef = function(){};
                    window.console = window.console || {log:ef,warn:ef,error:ef,dir:ef};
                  }());
              </script>
              <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
              <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
              <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
              <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
              <![endif]-->
          </head>
          <body ${helmet.bodyAttributes.toString()}>
            <div id="root"></div>
            <script src="/public/bundle.js"></script>
          </body>
      </html>
  `;
  res.send(html)
});

app.listen(port,function(){
    console.log("Started listening on port", port);
})
