const mongoose = require("mongoose");
const Article = require("../schema/article");
const router = require("express").Router();

router.get('/articles', all);
router.get('/articles/add', add);
router.get('/articles/:id', single);
router.route("/articles/:id").put(update).delete(destroy);

function all(req, res) {
  Article.find( {}, 'id',function (err, articles) {
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
  const title = req.body.title;
  const content = req.body.content;
  Article.findOneAndUpdate({_id: req.id}, {$set: { title: title, content: JSON.stringify(content)}},
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
