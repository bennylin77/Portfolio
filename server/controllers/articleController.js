const mongoose = require("mongoose");
const Article = require("../schema/article");
const router = require("express").Router();

router.get('/', all);
router.get('/add', add);
//router.get('/:id', single);
router.route("/:id").get(single).put(update).delete(destroy);

function all(req, res) {
  Article.find( {}, 'id').sort({createdAt: -1}).exec(function (err, articles) {
      if (err)
          res.send(err);
      else
          res.json(articles);
  });
}
function single(req, res) {
  Article.findById(req.id, function (err, article) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      console.log('GET Retrieving ID: ' + article._id);
      res.json(article);
    }
  });
}
function add(req, res) {
  const article = new Article();
  article.save(function (err) {
      if (err)
          res.send(err);
      else
          res.json(article);
  });
}
function update(req, res) {
  const set = {};
  for (var field in req.body) {
    if( field == 'content')
      set[field] = JSON.stringify(req.body[field]);
    else
      set[field] = req.body[field];
  }
  Article.findOneAndUpdate({_id: req.id}, {$set: set},
                           {new: true}, function(err, article){
      if(err){
          console.log("Something wrong when updating data!");
      }
      res.json(article);
  });
}

function destroy(req, res) {
  Article.findById(req.id, function (err, article) {
    if (err){
      return console.error(err);
    }else{
      article.remove(function (err, article) {
        if (err) {
          return console.error(err);
        } else {
          //Returning success messages saying it was deleted
          console.log('DELETE removing ID: ' + article._id);
            res.json({message: 'deleted',
                      item: article});
        }});
    }
  });
}

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    Article.findById(id, function (err, article) {
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.json({message : err.status  + ' ' + err});
        } else {
            req.id = id;
            next();
        }
    });
});

module.exports = router;
