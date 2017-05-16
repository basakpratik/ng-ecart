'use strict';

/* Product Controllers */

angular.module('cartApp.product.controllers', []).
	controller('ProductsController',
	['$scope', '$log', '$http', '$state', '$rootScope', 'servQuantity', 'duplicateCheck', 'category',
		function ($scope, $log, $http, $state, $rootScope, servQuantity, duplicateCheck, category) {
			$log.log('inside product controller');
			servQuantity.resetProduct();
			/*$http.get('data/cart.json').
				success(function (data) {
					$rootScope.products = data.productsInCart;
					console.log('$rootScope.products: '+JSON.stringify($rootScope.products));
				}).
				error(function () {
					$log.log('could not find cart.json');
				});*/
			//$rootScope.products = $rootScope.filteredProducts;
			$rootScope.products = category.getFilteredProducts();
			//console.log('$rootScope.products: '+JSON.stringify($rootScope.products));
			$scope.moreInfo = function ($index) {
				$rootScope.currIndex = $index;
				console.log('products[$index]: '+JSON.stringify($rootScope.products[$index]));
				servQuantity.addProduct($rootScope.products[$index]);
				servQuantity.prodQuantity = 1;
				$state.go('productsDetails');
			}
			$scope.moveToWishlist = function($index){
				$log.log('moved to wishlist');
				$log.log('wishlist b4: ' + JSON.stringify($rootScope.wishlist));
				if (duplicateCheck.checkDuplicateInObject($rootScope.products[$index], $rootScope.wishlist, 'p_id', false)) {
					$scope.wishToCart = true;
					$scope.duplicateData = 'This product is already added in your wishlist!!';
				} else {
					$rootScope.wishlist.push($rootScope.products[$index]);
					$scope.wishToCart = true;
					$scope.duplicateData = 'This product is added in your wishlist!!';
					$rootScope.addedWishCount++;
					$log.log('wishlist after: ' + JSON.stringify($rootScope.wishlist));
				}
			}
			$scope.addedToCart = function ($index) {
				//$log.log('cart b4: ' + JSON.stringify($rootScope.cart));
				if(duplicateCheck.checkDuplicateInObject($rootScope.products[$index], $rootScope.cart, 'p_id', false)){
					$scope.wishToCart = true;
					$scope.duplicateData = 'This product is already added in your cart!!';
				} else {
					$rootScope.cart.push($rootScope.products[$index]);
					$scope.wishToCart = true;
					$scope.duplicateData = 'This product is added in your cart!!';
					$rootScope.addedProdCount++;
					//$log.log('cart after: ' + JSON.stringify($rootScope.cart));
					$rootScope.products[$index].p_quantity = 1;
				}
			}
			$scope.sort = false;
		}
	]).controller('ProductDetailsController',
	['$scope', '$log', '$stateParams', '$rootScope', '$state', 'servQuantity', 'duplicateCheck',
		function ($scope, $log, $stateParams, $rootScope, $state, servQuantity, duplicateCheck) {

			$log.log('inside product details controller');
			$scope.servQuantity = servQuantity;
			$scope.duplicateCheck = duplicateCheck;
			$scope.addToWishlistTxt = 'Add to Wishlist';
			$scope.productStatus = false;
			$scope.getProd = servQuantity.getProducts();
			//$log.log('getProd: ' + JSON.stringify($scope.getProd));

			$scope.addedToCart = function () {
				if (duplicateCheck.checkDuplicateInObject($scope.getProd, $rootScope.cart, 'p_id', true)) {
					$scope.productStatus = true;
					$scope.statusMessage = 'This product is already added in your cart!!';
				} else {
					console.log('no duplicate');
					$rootScope.cart.push($scope.getProd[0]);
					$scope.productStatus = true;
					$scope.statusMessage = 'This product is added in your cart!!';
					$rootScope.addedProdCount++;

					$rootScope.products[$rootScope.currIndex].p_quantity = servQuantity.prodQuantity;
					$rootScope.products[$rootScope.currIndex].p_price = $rootScope.products[$rootScope.currIndex].p_quantity * $rootScope.products[$rootScope.currIndex].p_originalprice;

					$rootScope.products[$rootScope.currIndex].p_price = $rootScope.products[$rootScope.currIndex].p_quantity * $rootScope.products[$rootScope.currIndex].p_originalprice;
					$rootScope.arrGrandTotal.push($rootScope.products[$rootScope.currIndex].p_price);

					for (var i = 0; i < $rootScope.cart.length; i++) {
						$rootScope.grandTotal += $rootScope.arrGrandTotal[i];
					}
					$rootScope.totalUpdate = $rootScope.grandTotal;
				}

				/*$log.log('$rootScope.cart: ' + JSON.stringify($rootScope.cart));
				setTimeout(function () {
					$log.log('getProd: ' + JSON.stringify($scope.getProd));
				}, 1500);*/
				//$state.go('checkout');
			}

			$scope.addedToWishlist = function () {
				//$log.log('$rootScope.wishlist: ' + JSON.stringify($rootScope.wishlist));
				if (duplicateCheck.checkDuplicateInObject($scope.getProd, $rootScope.wishlist, 'p_id', true)) {
					$scope.productStatus = true;
					$scope.statusMessage = 'This product is already added in your wishlist!!';
				} else {
					$rootScope.wishlist.push($scope.getProd[0]);
					$scope.productStatus = true;
					$scope.statusMessage = 'This product is added in your wishlist!!';
					$rootScope.addedWishCount++;
				}
			}

		}
	]);