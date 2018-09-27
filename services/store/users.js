var store = [];

var createUser = function(id,name){
    var newItem = {};
    newItem.id = id;
    newItem.name = name;
    newItem.listRefs = [];
    store.push(newItem);
    return newItem;
};

var readUser = function(id){
    if(id){
        var matchedItems = store.filter(function(item){
            return item.id === id;
        });
        return matchedItems[0];
    } else {
        return store;
    }
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
            return store[i];
        }
    }
    return null;
};

var deleteUser = function(id){
    if (id) {
        store = store.filter(function(item) {
            return item.id !== id;
        });
        return store;
    }
    return null;
};

// For testing purposes
var clearAllUsers = function() {
    store = [];
}

module.exports = {
    createUser: createUser,
    readUser: readUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    clearAllUsers: clearAllUsers
};
