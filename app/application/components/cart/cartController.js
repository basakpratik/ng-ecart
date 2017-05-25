'use strict';

/* Cart Controllers */

angular.module('cartApp.cart.controllers', []).
	controller('CartController',
	['$scope', '$state', '$log', '$rootScope', 'servQuantity', 'duplicateCheck', 'priceCalculation',
		function ($scope, $state, $log, $rootScope, servQuantity, duplicateCheck, priceCalculation) {

			$log.log('inside cart controller');
			/*$scope.servQuantity = servQuantity;
			$scope.duplicateCheck = duplicateCheck;*/
			$rootScope.grandTotal = 0;
			$rootScope.arrGrandTotal = [];
			//$scope.discountedPrice = true;

			$scope.goBackToProdList = function () {
				//$rootScope.finalPrice = $rootScope.grandTotal;
				servQuantity.resetProduct();
				$state.go('products');
			};

			//console.log('$rootScope.cart.length: '+$rootScope.cart.length);
			//console.log('$rootScope.cart: '+JSON.stringify($rootScope.cart));

			if($rootScope.cart.length > 0){
				$scope.expression = false;
				for (var i = 0; i < $rootScope.cart.length; i++) {
					$rootScope.cart[i].p_price = $rootScope.cart[i].p_quantity * $rootScope.cart[i].p_originalprice;
					//console.log('$rootScope.cart[i].p_price: '+$rootScope.cart[i].p_price);
					$rootScope.arrGrandTotal.push($rootScope.cart[i].p_price);
					//console.log('$rootScope.arrGrandTotal: '+JSON.stringify($rootScope.arrGrandTotal));
					$rootScope.grandTotal += $rootScope.arrGrandTotal[i];
					//console.log("$rootScope.grandTotal: "+$rootScope.grandTotal);
				}
				//$scope.totalUpdate = $rootScope.grandTotal;
				//console.log("$rootScope.grandTotal: "+$rootScope.grandTotal);
			} else {
				$scope.expression = true;
			}

			//console.log('$rootScope.finalPrice-> '+$rootScope.finalPrice);

			/*if($rootScope.finalPrice != undefined){
				$rootScope.grandTotal = $rootScope.finalPrice;
				// $rootScope.grandTotal = $rootScope.someVar;
				// if($rootScope.discountPrice != undefined){
				// 	console.log('if');
				// 	$scope.discountedPrice = false;
				// 	$scope.strikePrice = true;
				// 	$rootScope.discountPrice = $rootScope.finalPrice;
				// } else {
				// 	console.log('else');
				// 	$rootScope.grandTotal = $rootScope.finalPrice;
				// }
			}*/
			
			/*$log.log('arrGrandTotal ' + JSON.stringify($rootScope.arrGrandTotal));
			$log.log('CC_addedArr ' + JSON.stringify($rootScope.addedArr));*/

			$scope.updateJson1 = function($index){
				priceCalculation.updateJson($index);
			}
			
			$scope.$watch('cart', function(newValue, oldValue){
				for(var i=0; i<$rootScope.cart.length; i++){
					if(newValue[i].p_price != oldValue[i].p_price){
						if(newValue[i].p_price > oldValue[i].p_price){
							$rootScope.grandTotal += (newValue[i].p_price - oldValue[i].p_price);
						} else {
							$rootScope.grandTotal -= (oldValue[i].p_price - newValue[i].p_price);
						}
					}
				}
			}, true);			
			
			$scope.moveToWishlist = function($index){
				/*$log.log('moved to wishlist');
				$log.log('$rootScope.wishlist: ' + JSON.stringify($rootScope.wishlist));*/
				if (duplicateCheck.checkDuplicateInObject($rootScope.cart[$index], $rootScope.wishlist, 'p_id', false)) {
					$scope.wishToCart = true;
					$scope.duplicateData = 'This product is already added in your wishlist!!';
				} else {
					$rootScope.wishlist.push($rootScope.cart[$index]);
					$scope.wishToCart = true;
					$scope.duplicateData = 'This product is added in your wishlist!!';
					$rootScope.addedWishCount++;
				}
			}
			$scope.removeProduct = function($index){
				$rootScope.addedProdCount--;
				$rootScope.grandTotal -= $rootScope.cart[$index].p_price;
				$rootScope.cart.splice($index, 1);
				//console.log('$rootScope.cart: '+JSON.stringify($rootScope.cart));
			}

			/*$scope.couponCode = function(){
				if($scope.coupon.toUpperCase() == 'FIRSTBUY'){
					$scope.discountedPrice = false;
					$scope.strikePrice = true;
					$rootScope.discountPrice = $rootScope.grandTotal - (($rootScope.grandTotal*25)/100);
				} else if($scope.coupon.toUpperCase() == 'SECONDBUY'){
					$scope.discountedPrice = false;
					$scope.strikePrice = true;
					$rootScope.discountPrice = $rootScope.grandTotal - (($rootScope.grandTotal*15)/100);
				} else {
					$scope.discountedPrice = true;
					$scope.strikePrice = false;
				}
			}*/

			$scope.gotoProdSumm = function(){
				/*console.log($rootScope.discountPrice, $rootScope.grandTotal);
				$rootScope.someVar = $rootScope.grandTotal;
				if($rootScope.discountPrice != undefined){
					$rootScope.finalPrice = $rootScope.discountPrice;
				} else {
					$rootScope.finalPrice = $rootScope.grandTotal;
				}*/
				//$rootScope.finalPrice = $rootScope.grandTotal;
				//console.log('$rootScope.finalPrice: '+$rootScope.finalPrice);
				$state.go('productSummary');
			}
		}
	]);