// var MongoClient= mongodb.MongoClient;
var express = require("express");
var router = express.Router();
// var ObjectId = require("mongodb").ObjectId;
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/hello", function(req, res) {
//   res.render("hello", { title: "hello" });
// });

router.get("/chat", function(req, res) {
  var db = req.db;
  var collection = db.get("usercollection");
  collection.find({}, {}, function(e, docs) {
    res.render("chat", {
      userlist: docs,
      query: req.query
    });
  });
});
/* GET New User page. */
// router.get("/newuser", function(req, res) {
//   res.render("newuser", { title: "Add New User" });
// });

// router.post("/addmessage", function(req, res) {
router.post("/addmessage", function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var author = req.body.author;
  var message = req.body.message;

  // Set our collection
  var collection = db.get("usercollection");
  var date = new Date();
  // Submit to the DB

  if (message) {
    collection.insert(
      {
        author: author,
        message: message,
        date: date
      },
      function(err, doc) {
        if (err) {
          // If it failed, return error
          res.send(
            "There was a problem adding the information to the database."
          );
        } else {
          // And forward to success page
          res.redirect(`/chat?name=${author}`);
        }
      }
    );
  }
});

router.get("/:id", (req, res) => {
  var db = req.db;
  var collection = db.get("usercollection");

  collection.remove({ _id: req.params.id }, (err, result) => {
    if (err) return console.log(err);

    res.redirect("/chat");
  });
});

module.exports = router;
