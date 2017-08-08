const path = require("path");
const Server = require('./server/server.js')
const port = (process.env.PORT || 8080)
const app = Server.app()

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
  res.sendFile("index.html", {root: path.join(__dirname, "./public") })
});
app.listen(port,function(){
    console.log("Started listening on port", port);
})
