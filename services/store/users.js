var store = [];

var createUser = function(id,name){
    var newItem = {};
    newItem.id = id;
    newItem.name = name;
    newItem.listRefs = [];
    store.push(newItem);
    return delayResponse(newItem);
};

var readUser = function(id){
    var results;
    if(id){
        var matchedItems = store.filter(function(item){
            return item.id === id;
        });
        results = matchedItems[0];
    } else {
        results = store;
    }
    return delayResponse(results);

};

var updateUser = function(id,newName,listRefs){
    for (var i = store.length - 1; i >= 0; i--) {
        if(store[i].id == id) {
            if(null != newName) {
                store[i].name = newName;
            }
            if(null != listRefs) {
                store[i].listRefs = listRefs;
            }
            return delayResponse(store[i]);
        }
    }
    return delayResponse(null);
};

var deleteUser = function(id){
    if (id) {
        store = store.filter(function(item) {
            return item.id !== id;
        });
        return delayResponse(store);
    }
    return delayResponse(null);
};

// Utils
var clearAllUsers = function() {
    store = [];
}
var delayResponse = function(results) {
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(results);
        }, 3000);
    });
};

module.exports = {
    createUser: createUser,
    readUser: readUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    clearAllUsers: clearAllUsers
};
