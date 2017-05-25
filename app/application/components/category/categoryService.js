'use strict';

/* Category Services */

angular.module('cartApp.category.services', []).
	factory('category',
	[function () {
		var oCategory = {};
		oCategory.fProductArr = [];
		oCategory.setFilteredProducts = function(fProduct){
			oCategory.fProductArr.push(fProduct);
		}

		oCategory.getFilteredProducts = function(){
			return oCategory.fProductArr;
		}

		oCategory.resetFilteredProducts = function () {
			oCategory.fProductArr = [];
		}

		return oCategory;
	}]);
