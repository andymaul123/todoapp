var expect = require('chai').expect,
    store = require('../../../../services/store/lists.js'),
    flush = require('flush-cache');

// Mock data values

var exampleList = {
    "id": 1,
    "listData": ["Apples", "Bananas"]
};

var updatedList = {
    "id": 1,
    "listData": ["Grapes"]
};

var arrayOfFruits = ["Apples", "Bananas"];

// Test Cases

describe('Lists - Store', function() {

    beforeEach(store.clearAllLists);

    describe('createList', function() {
        it('should create a new list with a given ID and list data', function() {
            expect(store.createList(1,arrayOfFruits)).to.deep.equal(exampleList);
        });
    });

    describe('readList', function() {
        it('should return all lists without passing an id', function() {
            expect(store.readList()).to.deep.equal([]);
        });
        it('should return a list when passing an id', function() {
            store.createList(1,arrayOfFruits);
            expect(store.readList(1)).to.deep.equal(exampleList);
        });
    });

    describe('updateList', function() {
        it('should return null if no list is found', function() {
            store.createList(1,arrayOfFruits);
            expect(store.updateList(0,["Grapes"])).to.equal(null);
        });
        it('should replace list array values', function() {
            store.createList(1,arrayOfFruits);
            expect(store.updateList(1,["Grapes"])).to.deep.equal(updatedList);
        });
    });

    describe('deleteList', function() {
        it('should return null if no ID is passed', function() {
            expect(store.deleteList()).to.equal(null);
        });
        it('should delete list and return an (empty) store object', function() {
            store.createList(1,arrayOfFruits);
            expect(store.deleteList(1)).to.deep.equal([]);
        });
    });

});