const   express = require('express'),
        router = express.Router(),
        userStore = require('../services/store/users.js'),
        listStore = require('../services/store/lists.js'),
        uuid = require('uuid/v1');

// /users

/* POST - create user */
router.post('/', function(req, res, next) {
    var name = req.body.name ? req.body.name : "";
    var newUser = userStore.createUser(uuid(),name);
    res.json(newUser);
});

/* GET - return all users */
router.get('/', function(req, res, next) {
    var users = userStore.readUser();
    res.json(users);
});

/* GET - return user by id */
router.get('/', function(req, res, next) {
  var users = userStore.readUser(req.body.id);
  res.json(users);
});

/* PUT - update specific user's name by id */
router.put('/', function(req, res, next) {
    var updatedUser = userStore.updateUser(req.body.id,req.body.name,null);
    if(null != updatedUser) {
      res.send(updatedUser);
    } else {
      res.send("Update user failed");
    }
});

/* DELETE - delete specific user by id */
router.delete('/', function(req, res, next) {
    var deletedUser = userStore.deleteUser(req.body.id);
    if(null != deletedUser) {
      res.send(deletedUser);
    } else {
      res.send("Delete user failed");
    }

});

/* GET - return all of a specific user's lists */
router.get('/lists', function(req, res, next) {
    var user = userStore.readUser(req.body.id);
    var lists = [];
    for (var i = user.listRefs.length - 1; i >= 0; i--) {
     lists.push(listStore.readList(user.listRefs[i]));
    }
    res.json(user);
});

/* PUT - update user's list references */
router.put('/lists', function(req, res, next) {
    var updatedUser = userStore.updateUser(req.body.id,null,req.body.listRef);
    res.send(updatedUser);
});

module.exports = router;
