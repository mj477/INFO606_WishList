var mjAppC = angular.module('wishListController', [])

// inject the wishList service factory into our controller
    mjAppC.controller('mainController', ['$scope','$http','wishListFact', function($scope, $http, wishListFact) {
       $scope.formData = {};
       $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all items show them. Use the service to retrieve all data
        wishListFact.get()
            .success(function(data) {
                $scope.items = data;
                $scope.loading = false;

            });
        wishListFact.getOcc()
            .success(function(data) {
                $scope.itemsOcc = data;
                $scope.loading = false;

            });
        wishListFact.getList()
            .success(function(data) {
                $scope.itemsList = data;
                $scope.loading = false;

            });

        $scope.updateDropDown = function() {};

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createItemNowSQL = function() {

            // Validate form data
            if ($scope.formData.text !== undefined && $scope.formData.hobbies !== undefined && $scope.formData.birthday) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                wishListFact.createServiceFamMember($scope.formData)
                // if successful creation, call our get function to get new items
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.items = data; // assign our new list of items
                    });
            }
            else{
                alert("Please enter the name of the person you wish to add !!!")
            }
        };


        // CREATE a new occasion
        // when submitting the add form, send the text to the node API
        $scope.createItemNowOcc = function() {

            // Validate form data
           // if ($scope.formData.text != undefined) {
            if ($scope.formData.text !== undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                wishListFact.createServiceOcc($scope.formData)
                // if successful creation, call our get function to get new items
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.itemsOcc = data; // assign our new list of items
                    });
            }
            else{
                alert("Please enter the name of the Occasion you wish to add!!!")
            }
        };

        // CREATE a new item on the wish list
        // when submitting the add form, send the text to the node API
        $scope.createItemNowWish = function() {

            // Validate form data
            if ($scope.formData.text !== undefined && $scope.formData.occ !== undefined && $scope.formData.fam !== undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                wishListFact.createServiceWish($scope.formData)
                // if successful creation, call our get function to get new items
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.itemsList = data; // assign our new list of items
                    });
            }
            else{
                alert("Item Description, Occasion, and Name is required !!")
            }
        };

        // DELETE ==================================================================
        // delete a item after checking the check box
        //Service name: delete and dbHandler: deleteItem
        $scope.deleteItem = function(id) {
            $scope.loading = true;
            console.log(id);

            wishListFact.delete(id)
            // if successful creation, call our get function to get all the new data
                .success(function(data) {
                    $scope.loading = false;
                    $scope.items = data; // assign our new list of items
                });
        };

        // DELETE OCCASION ==================================================================
        // delete a item after checking the check box
        $scope.deleteItemOcc = function(id) {
            $scope.loading = true;

            wishListFact.deleteOcc(id)
            // if successful creation, call our get function to get all the new data
                .success(function(data) {
                    $scope.loading = false;
                    $scope.itemsOcc = data; // assign our new list of items
                });
        };

        // DELETE ITEM from WISH LIST ==================================================================
        // delete a item after checking the check box
        $scope.deleteItemWish = function(id) {
            $scope.loading = true;

            wishListFact.deleteWish(id)
            // if successful creation, call our get function to get all the new data
                .success(function(data) {
                    $scope.loading = false;
                    $scope.itemsList = data; // assign our new list of items
                });
        };

    }]);

mjAppC.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});










































