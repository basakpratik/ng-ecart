'use strict';

/* Header Directive */

angular.module('cartApp.header.directives', []).
	directive('navHeader', ['$rootScope', function ($rootScope) {

		return {
			restrict: 'EA',
			templateUrl: 'module/header/views/header.html',
			link: function (scope, elem, attrs, state) {
				//console.log('inside header link');
				//$rootScope.grandTotal = 0;

				$rootScope.signup = false;
				$rootScope.login = false;
				$rootScope.logout = true;

				scope.$watch('addedProdCount', function (newValue, oldValue) {
					$rootScope.addedProdCount = newValue;
					//console.log('watch $rootScope.addedProdCount');
				});
			}
		};

	}]);
