angular.module('wishListService', [])

// each function returns a promise object
    .factory('wishListFact', ['$http',function($http) {
        return {
            get : function() { //Specify the path for route.js
                return $http.get('/api/items');
            },
            getOcc : function() {
                return $http.get('/api/itemsOcc');
            },
            getList : function() {
                return $http.get('/api/itemsList');
            },
            createServiceFamMember : function(addItem) {
                return $http.post('/api/items', addItem);
            },
            createServiceOcc : function(addItem) {
                return $http.post('/api/occ', addItem);
            },
            createServiceWish : function(addItem) {
                return $http.post('/api/wish', addItem);
            },
            delete : function(id) {
                return $http.delete('/api/items/' + id);
            },

            deleteOcc : function(id) {
                return $http.delete('/api/occ/' + id);
            },
            deleteWish : function(id) {
                return $http.delete('/api/wish/' + id);
            }

        }
    }]);
