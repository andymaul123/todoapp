const   express = require('express'),
        router = express.Router(),
        store = require('../services/store/lists.js'),
        uuid = require('uuid/v1');

// /lists

/* POST - create list */
router.post('/', function(req, res, next) {
    var listData = req.body.listData ? req.body.listData : [];
    var newList = store.createList(uuid(),listData);
    res.json(newList);
});

/* GET - return all lists */
router.get('/', function(req, res, next) {
    var lists = store.readList();
    res.json(lists);
});

/* GET - return list by id */
router.get('/', function(req, res, next) {
  var lists = store.readList(req.body.id);
  res.json(lists);
});

/* PUT - replace specific list's contents, by id, with new contents */
router.put('/', function(req, res, next) {
    var updatedList = store.updateList(req.body.id,req.body.listData);
    res.send(updatedList);
});

/* DELETE - delete specific list by id */
router.delete('/', function(req, res, next) {
    var deletedUser = store.deleteList(req.body.id);
    res.send(deletedUser);
});



module.exports = router;
