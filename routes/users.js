const   express = require('express'),
        router = express.Router(),
        store = require('../services/store'),
        uuid = require('uuid/v1');

// /users

/* POST - create user */
router.post('/', function(req, res, next) {
    var name = req.body.name ? req.body.name : "";
    var newUser = store.createItem(uuid(),name);
    res.json(newUser);
});

/* GET - return all users */
router.get('/', function(req, res, next) {
    var users = store.readItem();
    res.json(users);
});

/* GET - return user by id */
router.get('/', function(req, res, next) {
  var users = store.readItem(req.body.id);
  res.json(users);
});

/* PUT - update specific user's name by id */
router.put('/', function(req, res, next) {
    var updatedUser = store.updateItem(req.body.id,req.body.name);
    if(null != updatedUser) {
      res.send(updatedUser);
    } else {
      res.send("Update user failed");
    }
});

/* DELETE - delete specific user by id */
router.delete('/', function(req, res, next) {
    var deletedUser = store.deleteItem(req.body.id);
    if(null != deletedUser) {
      res.send(deletedUser);
    } else {
      res.send("Delete user failed");
    }

});



module.exports = router;
