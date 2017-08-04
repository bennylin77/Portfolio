const mongoose = require("mongoose");
const Media = require("../schema/media");
const router = require("express").Router();

const multer  = require('multer');
const express = require("express");
const path = require("path");
const upload = multer({ dest: path.join(__dirname,"../../public/uploads") })

router.get('/', all);
router.post('/add', upload.single('media'), add);
router.route("/:id").get(single).delete(destroy);

function all(req, res) {
  Media.find( {}, 'id', function (err, media) {
      if (err)
          res.send(err);
      else
          res.json(media);
  });
}
function add(req, res) {
  const destination = req.file.destination.replace(path.dirname(require.main.filename), "");
  const filename = req.file.filename;
  const size = req.file.size;
  const mimetype = req.file.mimetype;
  if (req.file) {
    const media = new Media({ destination: destination, filename: filename, size: size, mimetype: mimetype });
    media.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(media);
    });
  }else
    res.end('Missing file');

}
function single(req, res) {
  Media.findById(req.id, function (err, media) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      console.log('GET Retrieving ID: ' + media._id);
      res.json(media);
    }
  });
}
function destroy(req, res) {
  Media.findById(req.id, function (err, media) {
    if (err){
      return console.error(err);
    }else{
      media.remove(function (err, media) {
        if (err) {
          return console.error(err);
        } else {
          //Returning success messages saying it was deleted
          console.log('DELETE removing ID: ' + media._id);
            res.json({message: 'deleted',
                      item: media});
        }});
    }
  });
}
// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    Media.findById(id, function (err, article) {
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
