'use strict'

var shoppingListApp = angular.module('shoppingListApp', []);

shoppingListApp.controller('ShoppingListCtrl', function($scope) {
  $scope.items = [
    {'name': 'lamai',
     'description': '1 kg',
 	 'bought': false},
    {'name': 'mere',
     'description': '3 kg',
 	 'bought': false},
    {'name': 'cartofi',
     'description': 'multi. ca ne e foame.',
 	 'bought': false}
  ];

  $scope.orderProp = 'name';
  $scope.formVisibilty = false;
  $scope.formName = '';
  $scope.formDescription = '';

  $scope.addItem = function (name, description) {

  	$scope.items.push({
  		'name': name,
  		'description': description,
		'bought': false
  	});

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

  $scope.toggleForm = function () {

  	$scope.formVisibilty = !$scope.formVisibilty;

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
