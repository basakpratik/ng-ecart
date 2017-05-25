'use strict';

/* Checkout Controllers */

angular.module('cartApp.checkout.controllers', []).
	controller('CheckoutController',
	['$scope', '$state', '$rootScope', 'servQuantity', 'formData', '$locale',
		function ($scope, $state, $rootScope, servQuantity, formData, $locale) {
			$scope.date = new Date();
			$rootScope.billSameAsShip = true;
			$scope.paymentSection = true;
			$scope.errorCoupon = true;

			if($rootScope.billSameAsShip){
				$scope.billingAddress = true;
			}

			$scope.radioSwitch = function(){
				console.log('paymentType: '+$scope.paymentType);
				if($scope.paymentType == 'cash'){
					$rootScope.paymentType = 'Cash on Delivery';
				} else {
					$rootScope.paymentType = 'Debit/Credit Card';
				}
			}

			$scope.ship = {}, $scope.bill = {};
			$scope.update = function(ship){
				$scope.bill = angular.copy($scope.ship);
			}

			$scope.subtotal = $rootScope.grandTotal;

			if($scope.subtotal < 1000){
				$scope.shippingcost = 60;
			} else {
				$scope.shippingcost = 0;
			}

			$scope.ordertotal = $scope.subtotal + $scope.shippingcost;

			$scope.couponCode = function(){
				console.log('$scope.coupon: '+$scope.coupon);
				if($scope.coupon.toUpperCase() == 'FIRSTBUY'){
					//$scope.error.coupon = true;
					$rootScope.appliedCoupon = 'FIRSTBUY';
					$scope.discountedPrice = false;
					$scope.strikePrice = true;
					$rootScope.dPrice = ($scope.ordertotal*25)/100;
					$scope.discountPrice = $scope.ordertotal - $rootScope.dPrice;
				} else if($scope.coupon.toUpperCase() == 'SECONDBUY'){
					//$scope.error.coupon = true;
					$rootScope.appliedCoupon = 'SECONDBUY';
					$scope.discountedPrice = false;
					$scope.strikePrice = true;
					$rootScope.dPrice = ($scope.ordertotal*15)/100;
					$scope.discountPrice = $scope.ordertotal - $rootScope.dPrice;
				} else {
					$scope.discountedPrice = true;
					$scope.strikePrice = false;
				}
			}

			$scope.gotoInvoice = function(){
				//console.log('discountPrice: '+$scope.discountPrice + ' ::ordertotal: '+$scope.ordertotal);
				$scope.shipAddressData = {
					'country': $scope.ship.country,
					'fullName': $scope.ship.fName,
					'address': $scope.ship.address,
					'city': $scope.ship.city,
					'state': $scope.ship.state,
					'zip': $scope.ship.postal,
					'phone': $scope.ship.phone,
					'email': $scope.ship.email
				}
				$scope.billAddressData = {
					'country': $scope.bill.country,
					'fullName': $scope.bill.fName,
					'address': $scope.bill.address,
					'city': $scope.bill.city,
					'state': $scope.bill.state,
					'zip': $scope.bill.postal,
					'phone': $scope.bill.phone,
					'email': $scope.bill.email
				}

				formData.setAddress($scope.shipAddressData);
				formData.setBillingAddress($scope.billAddressData);
				
				/*if(!$rootScope.billSameAsShip){
					formData.setBillingAddress($scope.billAddressData);
				} */

				if($scope.addressForm.$valid){
					//console.log('$scope.addressForm.$valid: '+$scope.addressForm.$valid);
					$scope.paymentSection = false;
				} else {
					//console.log('$scope.addressForm.$valid: '+$scope.addressForm.$valid);
					$scope.paymentSection = true;
				}
			}

			// CC validation
			$scope.currentYear = new Date().getFullYear();
			$scope.currentMonth = new Date().getMonth() + 1;
			$scope.months = $locale.DATETIME_FORMATS.MONTH;
			$scope.ccinfo = {type:undefined};
			$scope.save = function(data){
				if (($scope.paymentType == 'card' && $scope.paymentForm.$valid) && $scope.addressForm.$valid){
					console.log('data: '+data) // valid data saving stuff here
					if($scope.discountPrice == undefined){
						$rootScope.finalPrice = $scope.ordertotal;
					} else {
						$rootScope.finalPrice = $scope.discountPrice;
					}
					$state.go('invoice');
				} else if($scope.paymentType == 'cash' && $scope.addressForm.$valid){
					if($scope.discountPrice == undefined){
						$rootScope.finalPrice = $scope.ordertotal;
					} else {
						$rootScope.finalPrice = $scope.discountPrice;
					}
					$state.go('invoice');
				}
			}

		}
	]);