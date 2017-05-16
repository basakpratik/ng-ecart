'use strict';

/* Invoice Controllers */

angular.module('cartApp.invoice.controllers', []).
	controller('InvoiceController',
	['$scope', '$state', '$rootScope', 'servQuantity', 'formData', '$log',
		function ($scope, $state, $rootScope, servQuantity, formData, $log) {
			$scope.date = new Date();
			$scope.priceSummary = $rootScope.finalPrice;
			if($rootScope.dPrice == undefined){
				$rootScope.appliedCoupon = 'NO COUPON APPLIED';
				$rootScope.dPrice = 0;
			}

			$scope.getShipAddDetails = formData.getAddress();
			$scope.getBillAddDetails = formData.getBillingAddress();

			$log.info('order placed: '+JSON.stringify($rootScope.cart));

			// console.log('getShipAddDetails: '+JSON.stringify($scope.getShipAddDetails));
			// console.log('getBillAddDetails: '+JSON.stringify($scope.getBillAddDetails));

			$scope.fullName = $scope.getShipAddDetails.fullName;
			$scope.address = $scope.getShipAddDetails.address + ' , ' + $scope.getShipAddDetails.city + ' , ' + $scope.getShipAddDetails.state + ' , ' + $scope.getShipAddDetails.zip;
			$scope.phoneNumber = $scope.getShipAddDetails.phone;
			$scope.email = $scope.getShipAddDetails.email;

			$scope.receiverFullName = $scope.getBillAddDetails.fullName;
			$scope.receiverAddress = $scope.getBillAddDetails.address + ' , ' + $scope.getBillAddDetails.city + ' , ' + $scope.getBillAddDetails.state + ' , ' + $scope.getBillAddDetails.zip;
			$scope.receiverPhoneNumber = $scope.getBillAddDetails.phone;
			$scope.receiverEmail = $scope.getBillAddDetails.email;
		}
	]);