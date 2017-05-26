'use strict';

/* Footer Directive */

angular.module('cartApp.footer.directives', []).
	directive('siteFooter', ['$rootScope', function ($rootScope) {

		return {
			restrict: 'EA',
			templateUrl: 'application/shared/footer/footer.html',
			link: function (scope, elem, attrs) {
				// ....
			}
		};

	}]);
