var store = [];

var createItem = function(id,name){
    var newItem = {};
    newItem.id = id;
    newItem.name = name;
    store.push(newItem);
    return "Successfully created new user.";
};

var readItem = function(id){
    if(id){
        var matchedItems = store.filter(function(item){
            return item.id === id;
        });
        return matchedItems[0];
    } else {
        return store;
    }
};

var updateItem = function(id,newName){
    if (newName) {
        for (var i = store.length - 1; i >= 0; i--) {
            if(store[i].id == id) {
                store[i].name = newName;
                return "Updated user successfully.";
            }
        }
    }
    return "Failed to update user.";
};

var deleteItem = function(id){
    if (id) {
        store = store.filter(function(item) {
            return item.id !== id;
        });
        return "Deleted user."
    }
    return "Failed to delete user.";
};

module.exports = {
    createItem: createItem,
    readItem: readItem,
    updateItem: updateItem,
    deleteItem: deleteItem
};