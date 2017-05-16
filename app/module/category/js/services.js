'use strict';

/* Category Services */

angular.module('cartApp.category.services', []).
	factory('category',
	[function () {
		var fProductArr = [];
		function setFilteredProducts(fProduct){
			fProductArr.push(fProduct);
		}

		function getFilteredProducts(){
			return fProductArr;
		}

		var resetFilteredProducts = function () {
			fProductArr = [];
		}

		return {
			setFilteredProducts: setFilteredProducts,
			getFilteredProducts: getFilteredProducts,
			resetFilteredProducts: resetFilteredProducts
		}
	}]);
