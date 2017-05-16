'use strict';

/* Invoice Controllers */

angular.module('cartApp.checkout.controllers', []).
	controller('CheckoutController',
	['$scope', '$state', '$rootScope', 'servQuantity', 'formData', '$locale',
		function ($scope, $state, $rootScope, servQuantity, formData, $locale) {
			$scope.date = new Date();
			$rootScope.billSameAsShip = true;

			if($rootScope.billSameAsShip){
				$scope.billingAddress = true;
			}

			$scope.toggleBillAddressView = function(){
				//console.log('$rootScope.billSameAsShip: '+$rootScope.billSameAsShip);
				if($rootScope.billSameAsShip){
					$rootScope.bool = true;
					$scope.billingAddress = true;
				} else {
					$scope.billingAddress = false;
					$rootScope.bool = false;
				}
			}

			$scope.subtotal = $rootScope.grandTotal;

			if($scope.subtotal < 1000){
				$scope.shippingcost = 60;
			} else {
				$scope.shippingcost = 0;
			}

			$scope.ordertotal = $scope.subtotal + $scope.shippingcost;

			$scope.couponCode = function(){
				if($scope.coupon.toUpperCase() == 'FIRSTBUY'){
					$scope.discountedPrice = false;
					$scope.strikePrice = true;
					$scope.discountPrice = $scope.ordertotal - (($scope.ordertotal*25)/100);
				} else if($scope.coupon.toUpperCase() == 'SECONDBUY'){
					$scope.discountedPrice = false;
					$scope.strikePrice = true;
					$scope.discountPrice = $scope.ordertotal - (($scope.ordertotal*15)/100);
				} else {
					$scope.discountedPrice = true;
					$scope.strikePrice = false;
				}
			}

			$scope.gotoInvoice = function(){
				//console.log('discountPrice: '+$scope.discountPrice + ' ::ordertotal: '+$scope.ordertotal);
				$scope.shipAddressData = {
					'country': $scope.shipCountry,
					'fullName': $scope.shipFullName,
					'address': $scope.shipAddress,
					'city': $scope.shipCity,
					'state': $scope.shipState,
					'zip': $scope.shipPostal,
					'phone': $scope.shipPhone,
					'email': $scope.shipEmail
				}
				$scope.billAddressData = {
					'country': $scope.billCountry,
					'fullName': $scope.billFullName,
					'address': $scope.billAddress,
					'city': $scope.billCity,
					'state': $scope.billState,
					'zip': $scope.billPostal,
					'phone': $scope.billPhone,
					'email': $scope.billEmail
				}

				formData.setAddress($scope.shipAddressData);
				formData.setBillingAddress($scope.billAddressData);
				
				/*if(!$rootScope.billSameAsShip){
					formData.setBillingAddress($scope.billAddressData);
				} */
				
				if($scope.discountPrice == undefined){
					$rootScope.finalPrice = $scope.ordertotal;
				} else {
					$rootScope.finalPrice = $scope.discountPrice;
				}
				//$state.go('invoice');
			}

			// CC validation
			$scope.currentYear = new Date().getFullYear();
			$scope.currentMonth = new Date().getMonth() + 1;
			$scope.months = $locale.DATETIME_FORMATS.MONTH;
			$scope.ccinfo = {type:undefined};
			$scope.save = function(data){
				if ($scope.paymentType == 'card' && $scope.paymentForm.$valid){
					console.log('data: '+data) // valid data saving stuff here
					$state.go('invoice');
				} else if($scope.paymentType == 'cash' && $scope.paymentForm.$valid){
					$state.go('invoice');
				}
			}

		}
	]);