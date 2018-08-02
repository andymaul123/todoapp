const   express = require('express'),
        router = express.Router(),
        store = require('../services/store'),
        uuid = require('uuid/v1');

// /users

/* POST - create user */
router.post('/', function(req, res, next) {
    var name = req.query.name ? req.query.name : "";
    var newUser = store.createItem(uuid(),name);
    res.send(newUser);
});

/* GET - return all users */
router.get('/', function(req, res, next) {
    var users = store.readItem();
    res.json(users);
});

/* GET - return user by id */
router.get('/:id', function(req, res, next) {
  var users = store.readItem(req.params.id);
  res.json(users);
});

/* GET - return user by name */
router.get('/:name', function(req, res, next) {
  var users = store.readItem(req.params.name);
  res.json(users);
});

/* PUT - update specific user's name by id */
router.put('/:id', function(req, res, next) {
    var updatedUser = store.updateItem(req.params.id,req.query.name);
    res.send(updatedUser);
});

/* DELETE - delete specific user by id */
router.delete('/:id', function(req, res, next) {
    var deletedUser = store.deleteItem(req.params.id);
    res.send(deletedUser);
});



module.exports = router;
