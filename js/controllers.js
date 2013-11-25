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
  $scope.formVisibilty = false; // adding form's visibility
  $scope.form = { // model for the adding/editing input tag
    // when the input in a form changes, this model changes
    'name': '',
    'description': ''
  };
  $scope.edit_count = 0; // used to stop possibility of editing 2 items at the same time

  $scope.addItem = function () {

  	if ($scope.form.name === '') {
      // null string is not accepted
    	return;
    }

  	for (var i = 0; i < $scope.items.length; i++) {
  		if ($scope.items[i].name === $scope.form.name) {
        // no duplicates
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

  /**
  Removes bought items from array.
  */
  $scope.removeBoughtItems = function () {

  	for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].bought === true) {
        $scope.removeItem($scope.items[i].name);
        i--; // for loop reverts to search
        // this is needed because an element is removed while the array is traversed
      }
    };

  }

  /**
  Flags a bought item.
  */
  $scope.checkBoughtItem = function (name) {

    for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].name === name) {
        if ($scope.items[i].bought === false) {
          $scope.items[i].bought = true;
        }
        else {
          $scope.items[i].bought = false;
        }
      }
    };

  }

  /**
  Used by html checkbox to check itself.
  */
  $scope.checkCheckbox = function (name) {

  	for (var i = 0; i < $scope.items.length; i++) {
  		if ($scope.items[i].name === name) {
  			return $scope.items[i].bought;
  		}
  	};

  }

  /**
  Returns strikethrough css class or not, depending on the state of an item (bought or not).
  */
  $scope.strikeItemOrNotClass = function (bought) {

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

  /**
  Visibility for the text of an item.
  Visibility is shown when the item is not in edit mode and hidden when it is in edit mode.
  */
  $scope.visibilityTextNormalMode = function (editModeOn) {

    if (editModeOn)
      return "hidden";
    else
      return "shown";

  }

  /**
  Visibility for the input boxes of an item.
  Visibility is hidden when the item is not in edit mode and shown when it is in edit mode.
  */
  $scope.visibilityTextEditMode = function (editModeOn) {

    if (editModeOn)
      return "shown";
    else
      return "hidden";

  }

  /**
  Enters edit mode if needed.
  Quits edit mode when editing finished.
  Saved the edited item in array.
  */
  $scope.editItem = function (name) {

    for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].name === name) {
        if (!$scope.items[i].editModeOn) {
          // preparing to enter edit mode
          if ($scope.edit_count == 0)  { 
            // if another item is being currently edited, quits edit mode
            $scope.form.name = $scope.items[i].name; // copies the name of the item to the text input view
            $scope.form.description = $scope.items[i].description; // copies the description of an item to input
            $scope.items[i].editModeOn = true; // flags that item enters edit mode
            $scope.edit_count++;
            return;
          }
          else {
            // item is already checked, it can't be edited
            return;
          }
        }
        else {
          // if edit mode is on, item is going to be edited
          if ($scope.form.name === '') {
            return;
          }
          $scope.items[i].name = $scope.form.name; // saves the name from model (model is what user typed in textbox)
          $scope.items[i].description = $scope.form.description; // saves the description from model
          $scope.items[i].editModeOn = false; // flags that item exits edit mode
          $scope.form.name = '';
          $scope.form.description = '';
          $scope.edit_count--;
          return;
        }
      }
    };

  }

});
