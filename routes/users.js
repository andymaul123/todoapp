const   express = require('express'),
        router = express.Router(),
        userStore = require('../services/store/users.js'),
        listStore = require('../services/store/lists.js'),
        uuid = require('uuid/v1');

/* POST - create user */
router.post('/', function(req, res, next) {
    var name = req.body.name ? req.body.name : "";

    userStore.createUser(uuiid(),name)
    .then(function(results){
      res.json(results);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
});

/* GET - return all users */
router.get('/', function(req, res, next) {
    userStore.readUser()
    .then(function(results){
        res.json(results);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
});

/* GET - return user by id */
router.get('/', function(req, res, next) {
  userStore.readUser(req.body.id)
  .then(function(results){
      res.json(results);
  })
  .catch(function(err){
    res.status(500).send(err);
  });
});

/* PUT - update specific user's name by id */
router.put('/', function(req, res, next) {
  userStore.updateUser(req.body.id,req.body.name,null)
  .then(function(updatedUser){
    if(null != updatedUser) {
      res.send(updatedUser);
    } else {
      res.send("Update user failed");
    }
  })
  .catch(function(err){
    res.status(500).send(err);
  });
});

/* DELETE - delete specific user by id */
router.delete('/', function(req, res, next) {
    userStore.deleteUser(req.body.id)
    .then(function(deletedUser){
      if(null != deletedUser) {
        res.send(deletedUser);
      } else {
        res.send("Delete user failed");
      }
    })
    .catch(function(err){
      res.status(500).send(err);
    });
});

/* GET - return all of a specific user's lists */
router.get('/lists', function(req, res, next) {
userStore.readUser(req.body.id)
    .then(function(user){
      var lists = [];
      for (var i = user.listRefs.length - 1; i >= 0; i--) {
       lists.push(listStore.readList(user.listRefs[i]));
      }
      res.json(user);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
});

/* PUT - update user's list references */
router.put('/lists', function(req, res, next) {
    var updatedUser = userStore.updateUser(req.body.id,null,req.body.listRef);
    res.send(updatedUser);
});

module.exports = router;


// Make all services "promisify-ed"