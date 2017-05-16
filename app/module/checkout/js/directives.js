'use strict';

/* Directives */


angular.module('cartApp.checkout.directives', []).
	directive('creditCardType', function(){
		var directive = {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function (value) {
					scope.ccinfo.type =
						(/^5[1-5]/.test(value)) ? "Master Card" :
						(/^4/.test(value)) ? "Visa" :
						(/^3[47]/.test(value)) ? "Amex" :
						(/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? "Discover" :
						undefined
					ctrl.$setValidity('invalid', !!scope.ccinfo.type)
					return value;
				});
			}
		}
		return directive;
	}).
	directive('cardExpiration', function(){
		var directive = {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {
				scope.$watch('[ccinfo.month,ccinfo.year]', function (value) {
					ctrl.$setValidity('invalid', true);
					if (scope.ccinfo.year == scope.currentYear &&
						scope.ccinfo.month <= scope.currentMonth){
						ctrl.$setValidity('invalid', false);
					}
					return value;
				}, true);
			}
		}
		return directive;
	});