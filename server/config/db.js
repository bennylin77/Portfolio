var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio_development', {
  useMongoClient: true,
  /* other options */
});
