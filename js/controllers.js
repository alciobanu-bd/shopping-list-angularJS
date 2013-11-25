'use strict'

var shoppingListApp = angular.module('shoppingListApp', []);

shoppingListApp.controller('ShoppingListCtrl', function($scope) {
  $scope.items = [
    {'name': 'corcoduse',
    'description': '2 buzunare',
    'bought': false,
    'editModeOn': false},
    {'name': 'mure',
    'description': '42 kg',
    'bought': false,
    'editModeOn': false}
  ];

  $scope.orderProp = 'bought';
  $scope.formVisibilty = false;
  $scope.form = {
    'name': '', // modelul pentru numele din input la adaugare/editare
    'description': '' // modelul pentru descrierea din input la adaugare/editare
  };
  $scope.edit_count = 0;

  $scope.addItem = function () {

  	if ($scope.form.name === '') {
    	return;
    }

  	for (var i = 0; i < $scope.items.length; i++) {
  		if ($scope.items[i].name === $scope.form.name) {
  			return;
  		}
  	};

  	$scope.items.push({
      'name': $scope.form.name,
      'description': $scope.form.description,
     	'bought': false,
      'editModeOn': false
    });

   	$scope.form.name = '';
  	$scope.form.description = '';
    $scope.edit_count--;
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
	  			  'bought': true,
            'editModeOn': false
	  			}
  			}
  			else {
  				$scope.items[i] = {
	  			'name': name,
	  			'description': description,
	  			'bought': false,
          'editModeOn': false
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

  	if ($scope.formVisibilty || $scope.edit_count > 0) {
  		return;
  	}
  	$scope.formVisibilty = true;
    $scope.edit_count++;

  }

  $scope.isVisible = function () {

  	if ($scope.formVisibilty) {
  		return "shown";
  	}
  	else {
  		return "hidden";
  	}

  }

  $scope.visibilityTextNormalMode = function (editModeOn) {

    if (editModeOn)
      return "hidden";
    else
      return "shown";

  }

  $scope.visibilityTextEditMode = function (editModeOn) {

    if (editModeOn)
      return "shown";
    else
      return "hidden";

  }

  /**
  Intra in edit mode daca nu este deja.
  Iese din edit mode daca s-a terminat editarea.
  Salveaza elementul editat in vector.
  */
  $scope.editItem = function (name) {

    for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].name === name) {
        if (!$scope.items[i].editModeOn) {
          if ($scope.edit_count == 0)  {
            // daca nu e edit mode activ pe element, intram in edit mode 
            // (doar daca nu e un alt element in edit mode)
            $scope.form.name = $scope.items[i].name; // e pus in campul input numele actual
            $scope.form.description = $scope.items[i].description; // e pusa in campul input descrierea actuala
            $scope.items[i].editModeOn = true; // flag-uieste ca elementul se afla in edit mode
            $scope.edit_count++;
            return;
          }
          else {
            // s-a verificat elementul, nu se poate edita
            return;
          }
        }
        else {
          // daca edit mode e activ, inseamna ca trebuie sa editam intrarea
          $scope.items[i].name = $scope.form.name; // salveaza numele din model
          $scope.items[i].description = $scope.form.description; // salveaza descrierea din model
          $scope.items[i].editModeOn = false; // iese din edit mode
          $scope.form.name = '';
          $scope.form.description = '';
          $scope.edit_count--;
          return;
        }
      }
    };

  }

  $scope.print = function () {

    if ($scope.edit_count == 3)
      document.write($scope.form.name);
    $scope.edit_count++;

  }

});
