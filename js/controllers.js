'use strict'

var shoppingListApp = angular.module('shoppingListApp', []);

shoppingListApp.controller('ShoppingListCtrl', function($scope) {
  $scope.items = [
    {'name': 'lamai',
     'description': '1 kg',
 	 'bought': false}
  ];

  $scope.orderProp = 'bought';
  $scope.formVisibilty = false;
  $scope.formName = '';
  $scope.formDescription = '';
  $scope.editedItemName = '';

  $scope.addEditItem = function () {

	if ($scope.formName === '') {
  		return;
  	}

  	if ($scope.inputMode === 'Add') {

		for (var i = 0; i < $scope.items.length; i++) {
  			if ($scope.items[i].name === $scope.formName) {
  				return;
  			}
  		};

  		$scope.items.push({
  		'name': $scope.formName,
  		'description': $scope.formDescription,
		'bought': false
	  	});
  	}
  	else {

 		for (var i = 0; i < $scope.items.length; i++) {
 			if ($scope.editedItemName === $scope.items[i].name) {
 				$scope.items[i].name = $scope.formName;
 				$scope.items[i].description = $scope.formDescription;
 				$scope.bought = false;
 			}
 		}

   	}

   	$scope.formName = '';
  	$scope.formDescription = '';
  	$scope.formVisibilty = false;

  }

  $scope.removeItem = function (name) {

  	for (var i = 0; i < $scope.items.length; i++) {
  		if ($scope.items[i].name === name) {
  			$scope.items.splice(i, 1);
  		}
  	};

  }

  $scope.removeBoughtItems = function () {

  	for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].bought === true) {
        $scope.removeItem($scope.items[i].name);
        i = 0;
      }
    };

  }

  $scope.checkBoughtItem = function (name, description) {

  	for (var i = 0; i < $scope.items.length; i++) {
  		if ($scope.items[i].name === name) {
  			if ($scope.items[i].bought === false) {
  				$scope.items[i] = {
	  			'name': name,
	  			'description': description,
	  			'bought': true
	  			}
  			}
  			else {
  				$scope.items[i] = {
	  			'name': name,
	  			'description': description,
	  			'bought': false
		  		}
  			}
  		}
  	};

  }

  $scope.checkCheckbox = function (name) {

  	for (var i = 0; i < $scope.items.length; i++) {
  		if ($scope.items[i].name === name) {
  			return $scope.items[i].bought;
  		}
  	};
  }

  $scope.changeClass = function (bought) {

  	if (bought) {
  		return "strike";
  	}
  	else {
  		return "black";
  	}

  }

  $scope.showForm = function () {

  	if ($scope.formVisibilty) {
  		return;
  	}
  	$scope.inputMode = 'Add';
  	$scope.formVisibilty = true;

  }

  $scope.showFormInEditMode = function (name, description) {

  	if ($scope.formVisibilty) {
  		return;
  	}
  	$scope.formName = name;
  	$scope.formDescription = description;
  	$scope.editedItemName = name;
  	$scope.inputMode = 'Edit';
  	$scope.formVisibilty = true;

  }

  $scope.isVisible = function () {

  	if ($scope.formVisibilty) {
  		return "shown";
  	}
  	else {
  		return "hidden";
  	}

  }

});
