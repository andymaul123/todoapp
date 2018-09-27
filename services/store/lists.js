var store = [];

var createList = function(id,listData){
    var newItem = {};
    newItem.id = id;
    newItem.listData = listData;
    store.push(newItem);
    return newItem;
};

var readList = function(id){
    if(id){
        var matchedItems = store.filter(function(item){
            return item.id === id;
        });
        return matchedItems[0];
    } else {
        return store;
    }
};

var updateList = function(id,listData){
    if (listData) {
        for (var i = store.length - 1; i >= 0; i--) {
            if(store[i].id == id) {
                store[i].listData = listData;
                return store[i];
            }
        }
    }
    return null;
};

var deleteList = function(id){
    if (id) {
        store = store.filter(function(item) {
            return item.id !== id;
        });
        return store;
    }
    return null;
};

// For testing purposes
var clearAllLists = function() {
    store = [];
}

module.exports = {
    createList: createList,
    readList: readList,
    updateList: updateList,
    deleteList: deleteList,
    clearAllLists: clearAllLists
};