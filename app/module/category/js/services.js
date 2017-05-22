'use strict';

/* Category Services */

angular.module('cartApp.category.services', []).
	factory('category',
	[function () {
		var oCategory = {};
		oCategory.fProductArr = [];
		oCategory.setFilteredProducts = function(fProduct){
			fProductArr.push(fProduct);
		}

		oCategory.getFilteredProducts = function(){
			return fProductArr;
		}

		oCategory.resetFilteredProducts = function () {
			fProductArr = [];
		}

		return oCategory;
	}]);
