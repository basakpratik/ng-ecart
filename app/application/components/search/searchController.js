'use strict';

/* Search Controllers */

angular.module('cartApp.search.controllers', []).
	controller('SearchController',
	['$scope', '$log', '$http', '$state', 'servQuantity',
		function ($scope, $log, $http, $state, servQuantity) {
			$log.log('inside search controller');
			servQuantity.resetProduct();

			$scope.searchResult = 'No product found with this name!!';
		}
	]);