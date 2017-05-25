'use strict';

/* Invoice Controllers */

angular.module('cartApp.productSummary.controllers', []).
	controller('ProductSummaryController',
	['$scope', '$state', '$rootScope', 'servQuantity',
		function ($scope, $state, $rootScope, servQuantity) {
			$scope.date = new Date();

			$scope.priceSummary = $rootScope.grandTotal;

			$scope.goBackToProdList = function () {
				servQuantity.resetProduct();
				$state.go('products');
			}

			$scope.goBackToCart = function(){
				$state.go('cart');
			}

			$scope.proceedToCheckout = function(){
				$state.go('checkout');
			}
		}
	]);