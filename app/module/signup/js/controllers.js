'use strict';

/* Signup Controllers */

angular.module('cartApp.signup.controllers', []).
controller('SignupController', ['$scope', '$state', '$log', '$rootScope', '$http', 'apiConfig', 'signUpModel',
	function ($scope, $state, $log, $rootScope, $http, apiConfig, signUpModel) {
		$rootScope.validmsg = true;
		$rootScope.signup = false;
        $rootScope.login = false;
        $rootScope.logout = true;
		var varID = 0;
		$log.log('inside login controller');

		$scope.signup = function () {
			var SignUpObj = {
				"username": $scope.username,
				"password": $scope.password,
				"useremail": $scope.useremail,
				"confpassword": $scope.confpassword
			};
			console.log(JSON.stringify(SignUpObj));

			var NewSignUpUrl = apiConfig.signUpUrl;
			console.log(NewSignUpUrl);
			signUpModel.doSignUp(NewSignUpUrl, 'POST', SignUpObj, function (results) {
				if (results.status === 'ok') {
					$state.go('category');
					$rootScope.signup = true;
					$rootScope.login = true;
					$rootScope.logout = false;
					$rootScope.loggedName = $scope.username;
					console.log('$rootScope.loggedName: '+$rootScope.loggedName);
				}
			}, function (error) {
				$scope.errorMsg = error.error.status;
				$rootScope.validmsg = false;
				//$rootScope.IsLoginValidationMessageHidden = false;
				console.log("Error " + JSON.stringify(error));
				console.log("error msg:::  " + error.error.status);
				var errorMsg = error;
			});

		}
	}
]);