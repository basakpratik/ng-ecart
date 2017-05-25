'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('cartApp.cart.services', []).
	factory('priceCalculation', ['$rootScope', function ($rootScope) {
		return {
			updateJson: function ($index) {
				//console.log('$rootScope.cart[$index]: ' + $rootScope.cart[$index]);
				$rootScope.cart[$index].p_price = $rootScope.cart[$index].p_quantity * $rootScope.cart[$index].p_originalprice;
			}
		}
	}]);