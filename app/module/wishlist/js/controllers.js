'use strict';

/* Checkout Controllers */

angular.module('cartApp.wishlist.controllers', []).
	controller('WishlistController',
	['$scope', '$state', '$log', '$rootScope', 'servQuantity', 'duplicateCheck',
		function ($scope, $state, $log, $rootScope, servQuantity, duplicateCheck) {

			$log.log('inside wishlist controller');
			$scope.servQuantity = servQuantity;
			$scope.duplicateCheck = duplicateCheck;

			$scope.goBackToProdList = function () {
				$state.go('products');
			};

			$scope.wishToCart = false;
			/*$scope.getProd = servQuantity.getProducts();
			$log.log('getProd: ' + JSON.stringify($scope.getProd));*/

			$scope.addedToCart = function ($index) {
				/*$log.log('wishlist[$rootScope.currIndex]: ' + JSON.stringify($rootScope.wishlist[$index]));
				$log.log('$rootScope.cart: ' + JSON.stringify($rootScope.cart));*/				
				if(duplicateCheck.checkDuplicateInObject($rootScope.wishlist[$index], $rootScope.cart, 'p_id', false)){
					$scope.wishToCart = true;
					$scope.duplicateData = 'This product is already added in your cart!!';
				} else {
					$rootScope.cart.push($rootScope.wishlist[$index]);
					$scope.wishToCart = true;
					$scope.duplicateData = 'This product is added in your cart!!';
					$rootScope.addedProdCount++;
				}

				/*$log.log('getProd: ' + JSON.stringify($scope.getProd));
				$log.log('servQuantity.prodQuantity: '+servQuantity.prodQuantity);*/
				//$log.log('WLC_wishlist_cart: ' + JSON.stringify($rootScope.cart));
			}

			$scope.removeProduct = function ($index) {
				$rootScope.addedWishCount--;
				$rootScope.wishlist.splice($index, 1);
				//$log.log('CC_Remove_from wishlist ' + JSON.stringify($rootScope.wishlist));
			}
		}
	]);