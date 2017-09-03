const mongoose = require("mongoose");
const Project = require("../schema/project");
const router = require("express").Router();

router.get('/', all);
router.get('/add', add);
//router.get('/:id', single);
router.route("/:id").get(single).put(update).delete(destroy);

function all(req, res) {
  Project.find( {}, 'id',function (err, projects) {
      if (err)
          res.send(err);
      else
          res.json(projects);
  });
}
function single(req, res) {
  Project.findById(req.id, function (err, project) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      console.log('GET Retrieving ID: ' + project._id);
      res.json(project);
    }
  });
}
function add(req, res) {
  const project = new Project();
  project.save(function (err) {
      if (err)
          res.send(err);
      else
          res.json(project);
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
  //console.log(set);
  Project.findOneAndUpdate({_id: req.id}, {$set: set},
                           {new: true}, function(err, project){
      if(err){
          console.log("Something wrong when updating data!");
      }
      res.json(project);
  });
}

function destroy(req, res) {
  Project.findById(req.id, function (err, project) {
    if (err){
      return console.error(err);
    }else{
      project.remove(function (err, project) {
        if (err) {
          return console.error(err);
        } else {
          //Returning success messages saying it was deleted
          console.log('DELETE removing ID: ' + project._id);
            res.json({message: 'deleted',
                      item: project});
        }});
    }
  });
}

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    Project.findById(id, function (err, project) {
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
