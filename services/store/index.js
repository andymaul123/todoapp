var store = [];

var createItem = function(id,name){
    var newItem = {};
    newItem.id = id;
    newItem.name = name;
    newItem.listRefs = [];
    store.push(newItem);
    return newItem;
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
                return store[i];
            }
        }
    }
    return null;
};

var deleteItem = function(id){
    if (id) {
        store = store.filter(function(item) {
            return item.id !== id;
        });
        return store;
    }
    return null;
};

module.exports = {
    createItem: createItem,
    readItem: readItem,
    updateItem: updateItem,
    deleteItem: deleteItem
};