'use strict';

/* Checkout Controllers */

angular.module('cartApp.login.controllers', []).
controller('LoginController', ['$scope', '$state', '$rootScope', 'util', 'apiConfig', 'loginModel',
	function ($scope, $state, $rootScope, util, apiConfig, loginModel) {
		$rootScope.validmsg = true;
		$rootScope.signup = false;
        $rootScope.login = false;
        $rootScope.logout = true;
		$rootScope.loggedName = "";
		$scope.loginSuccess = function () {
				var userLoginObj = {
					"username": $scope.username,
					"password": $scope.password
				};
				var username = $scope.username;
				var loginUrl = apiConfig.loginUrl;
				console.log('loginurl: '+loginUrl);
				loginModel.doLogin(loginUrl, 'POST', userLoginObj, function (results) {
					if (results.status === 'ok') {
						$state.go('category');
						$rootScope.signup = true;
						$rootScope.login = true;
						$rootScope.logout = false;
						$rootScope.loggedName = results.username;
						//session store
						//$scope.session_Token = results.result.session_token;
						//$scope.user_Id = results.result.user_id;
						//$scope.user_Role = results.result.user_role;
						//$scope.active_Session = results.result.active_session.is_active;
						//setting items in Session
						//sessionStorage.setItem('SessionToken', $scope.session_Token);
						//sessionStorage.setItem('UserID', $scope.user_Id);
						///sessionStorage.setItem('UserRole', $scope.user_Role);
						//sessionStorage.setItem('isActiveSession', $scope.active_Session);

						//sessionStorage.setItem('isSessionActivated', true);

						//$localStorage.isUserLoggedIn = true;
						//$rootScope.IsLoggedIn = true;

						//var Session_Token = sessionStorage.getItem('SessionToken');
						//var User_ID = sessionStorage.getItem('UserID');
						//var User_Role = sessionStorage.getItem('UserRole');
						//var isActive_Session = sessionStorage.getItem('isActiveSession');
						//end of session storage work

						//storing input data for remember Me
						//loginModel.storeRememberMe(userLoginObjForRememberMe);

					} else if (results.status === "failed") {
						console.log("Login failed in LoginController");
					}
				}, function (error) {
					//switch case will be added to recv particular error
					$scope.errorMsg = 'Invalid Username or Password';
					$rootScope.validmsg = false;
					console.log("Error Rsponse in LoginController " + error);
					//showing alert message while user not
					//$scope.errorMsg = errorConfig.err_05;                
				});
			},
			function (error) {
				$scope.errorMsg = 'Invalid Username or Password';
				$rootScope.validmsg = false;
				//$rootScope.IsLoginValidationMessageHidden = false;
				console.log("Error " + error);
				var errorMsg = error;
			}
	}
]);