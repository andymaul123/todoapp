var expect = require('chai').expect,
    store = require('../../../../services/store/users.js'),
    sinon = require('sinon');

// Mock data values

var bob = {
        "id": 1,
        "listRefs": [],
        "name": "Bob"
    };

var billy = {
        "id": 1,
        "listRefs": [],
        "name": "Billy"
    };

// Test Cases

describe('Users - Store', function() {
    this.timeout(3500);
    beforeEach(store.clearAllUsers);

    describe('createUser', function() {
        it('should create a new user with a given ID and name', function(done) {
            sinon.stub(store, 'createUser').callsFake(function(id,name){
                return new Promise(function(resolve){
                    resolve(billy);
                });
            });
            store.createUser(1,"Bob")
            .then(function(user){
                expect(user).to.deep.equal(bob);
                done();
            });
        });
    });

    describe('readUser', function() {
        it('should return all users without passing an id', function() {
            expect(store.readUser()).to.deep.equal([]);
        });
        it('should return a user when passing an id', function() {
            store.createUser(1,"Bob");
            expect(store.readUser(1)).to.deep.equal(bob);
        });
    });

    describe('updateUser', function() {
        it('should return null if no user is found', function() {
            store.createUser(1,"Bob");
            expect(store.updateUser(0,"Billy",null)).to.equal(null);
        });
        it('should replace name values', function() {
            store.createUser(1,"Bob");
            expect(store.updateUser(1,"Billy",null)).to.deep.equal(billy);
        });
    });

    describe('deleteUser', function() {
        it('should return null if no ID is passed', function() {
            expect(store.deleteUser()).to.equal(null);
        });
        it('should delete user Bob and return an (empty) store object', function() {
            store.createUser(1,"Bob");
            expect(store.deleteUser(1)).to.deep.equal([]);
        });
    });

});