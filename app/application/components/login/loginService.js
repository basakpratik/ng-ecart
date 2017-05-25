'use strict';

/* Login Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('cartApp.login.services', []).
factory('loginModel', function ($rootScope, util) {
	return {
		/* doLogin function:
		 *  doLogin function for As a mobile user should have to login into app using username and password
		 */
		doLogin: function (login_url, requestType, requestBody, OnSuccess, OnError) {
			var that = this;
			util.invokePostAPI(login_url, requestType, "application/json", 'json', requestBody,
				function (result) {
					console.log("Success in doLogin: " + result);
					that.loginSuccessCallBack(result, requestBody, OnSuccess, OnError);
				},
				function (error) {
					console.log("Error in doLogin: " + error);
					that.loginErrorCallBack(error, requestBody, OnSuccess, OnError);
				});
		},

		/* loginSuccessCallBack function:
		 * This function is used to handle the success call back from the login api.
		 */
		loginSuccessCallBack: function (responseObj, paramObj, OnSuccess, OnError) {
			var that = this;
			try {
				if (responseObj.status === "ok") {
					console.log("Success in loginSuccessCallBack: " + responseObj);
					OnSuccess(responseObj);
				} else {
					console.log("Error in loginSuccessCallBack: " + responseObj);
					OnError(responseObj);
				}
			} catch (e) {
				console.log("Error in loginSuccessCallBack: " + responseObj);
			}
		},

		/* loginErrorCallBack function:
		 * This function is used to handle the error call back from the login api.
		 */
		loginErrorCallBack: function (error, requestBody, OnSuccess, OnError) {
			console.log("Error in loginErrorCallBack: " + error);
			OnError(error);
		},

		//storing remember Me
		/* storeRememberMe function:
		 *  storeRememberMe function is use to store the credentials in the local storage if remember me option is checked.
		 */
		/*storeRememberMe : function(userDetailsObj){
					if(userDetailsObj !== null && userDetailsObj!== undefined){
		        if(userDetailsObj.rememberMe === true){
							$localStorage.lastLoggedInUser = userDetailsObj;
		          $localStorage.userLogging = $rootScope.isLoggedIn;
						}else{
							$localStorage.lastLoggedInUser = '';
						}
					}
				},*/
		//end of storing remeber me.

		/* getRememberMe function:
		 *  getRememberMe function is used to retrieve the remembered credential in the mobile app.
		 */
		/*getRememberMe : function(onSuccess, onError){
			if($localStorage.lastLoggedInUser !== null && $localStorage.lastLoggedInUser!== undefined){
				onSuccess($localStorage.lastLoggedInUser);
			}else{
				onError('User info not found!! ');
			}
		},*/
		//end of getRemeberMe.
	};
});