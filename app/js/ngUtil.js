'use strict';

/*
Utility Functions: These methods acts as tools which provides support to
redundant tasks all across the application.
*/

angular.module('ngUtil', []).
factory('util', function($log, $rootScope, $http, $timeout, $location){
    return {
		navigationStack: [],

    //INVOKING COMMON API FOR ALL REST METHODS USING -AJAX-
    invokeAPI: function(type, data_url, config, content_type, data_type, data, onSuccess, onError) {
      console.log("In util:  "+type+" "+data_url+" "+config+" "+content_type+" "+data_type+" "+data);
      try {
          var data = JSON.stringify(data);
          $.ajax({
              type: type,
              url: data_url,
              config: config,
              contentType: content_type,
              dataType: data_type,
              data: data,
              success: function(response) {
                console.log("1. Success in API call");
                onSuccess(response);
              },
              error: function(err) {
                onError('Error while invoking API: ' + data_url + '. Error: ' + JSON.stringify(err));
              }
          });
      } catch (ex) {
          onError('Error while invoking API: ' + data_url + '. Error: ' + ex);
      }
  },

    //POST METHOD IN ANGULAR.(1)
    invokePostAPI: function(data_url, type, content_type, data_type, data, onSuccess, onError) {
      try{
        console.log(data_url +":data_url "+type+":requestType"+ JSON.stringify(data)+":requestBody");
        //taking the session token from session storage
       // var Session_Token = sessionStorage.getItem('SessionToken');
        //console.log("Session Token: "+Session_Token);
        var config = {
          headers: {
            'Authorization': "chgchfhgfhgv",
            'Content-Type': content_type
          }
        };
        //console.log("Config headers:"+JSON.stringify(config));
        //console.log("Parameters::  "+JSON.stringify(data)+" || "+JSON.stringify(config)+" || "+data_url);
        $http.post(data_url, data, config).success(function(response) {
          $timeout(function() {
            onSuccess(response);
            console.log("Success in API method: "+response);
          });
          sessionStorage.setItem("loginResponseObject", JSON.stringify(response));
        }).error(function(error) {
            $timeout(function() {
              console.log("Error in API method: "+JSON.stringify(error));
              onError(error);
            });
          });
      }catch (ex) {
        onError(' Error: ' + ex);
        console.log(' Error: ' + ex);
      }
    },

    //PUT METHOD IN ANGULAR.(2)
    invokePutAPI: function(data_url, type, content_type, data_type, data, onSuccess, onError) {
      try{
        //taking the session token from session storage
        var Session_Token = sessionStorage.getItem('SessionToken');
        console.log("Session Token: "+Session_Token);
        var config = {
          headers: {
            'Authorization': Session_Token,
            'Content-Type': content_type
          }
        };
        //console.log("Parameters::  "+JSON.stringify(data)+" || "+JSON.stringify(config)+" || "+data_url);
        $http.put(data_url, data, config).success(function(response) {
          $timeout(function() {
             onSuccess(response);
           });
          sessionStorage.setItem("loginResponseObject", JSON.stringify(response));
        }).error(function(error, status) {
            $timeout(function() {
              onError(error);
              console.log("Error: "+error);
            });
          });
      } catch (ex) {
        onError(' Error: ' + ex);
        console.log(' Error: ' + ex);
      }
    },

    //GET METHOD IN ANGULAR.(3)
    invokeGetAPI: function(data_url, type, content_type, data_type, data, onSuccess, onError) {
       try{
          //taking the session token from session storage
          var Session_Token = sessionStorage.getItem('SessionToken');
          //console.log("Session Token: "+Session_Token);
          var config = {
              headers: {
                'Authorization': Session_Token,
                'Content-Type': content_type
              }
          };
          //console.log("Parameters:: "+JSON.stringify(data)+" || "+JSON.stringify(config)+" || "+data_url);
          $http.get(data_url, config).success(function(response) {
            $timeout(function() {
              onSuccess(response);
            });
            sessionStorage.setItem("loginResponseObject", JSON.stringify(response));
          }).error(function(error, status) {
              $timeout(function() {
                onError(error);
                console.log("Error: "+error);
              });
            });
        } catch (ex) {
          onError(' Error: ' + ex);
          console.log(' Error: ' + ex);
        }
      },

      //PATCH METHOD IN ANGULAR.(4)
      invokePatchAPI: function(data_url, type, content_type, data_type, data, onSuccess, onError) {
        try{
          //taking the session token from session storage
          var Session_Token = sessionStorage.getItem('SessionToken');
          //console.log("Session Token: "+Session_Token);
          var config = {
            headers: {
              'Content-Type': content_type
            }
          };
          console.log("Parameters::  "+JSON.stringify(data)+" || "+JSON.stringify(config)+" || "+data_url);
          $http.patch(data_url, data, config).success(function(response) {
            $timeout(function() {
               onSuccess(response);
             });
            sessionStorage.setItem("loginResponseObject", JSON.stringify(response));
          }).error(function(error, status) {
              $timeout(function() {
                onError(error);
                console.log("Error: "+error);
              });
            });
        } catch (ex) {
          onError(' Error: ' + ex);
          console.log(' Error: ' + ex);
        }
      },


    //* navigateTo: function
		//* navigateTo is used to navigate to different screens.
	 navigateTo: function(location){
		 	try{
		 		var presentLocation = $location.path();
		 		this.navigationStack.push(presentLocation);
		 		$location.path(location);
		 	}catch(e){
		 		console.log("Error is navigateTo: "+e.message);
		 	}
		}

		// /*
    //     * goBack: function
		// * goBack is used to navigate to back screen.
		// */
		// goBack: function(){
		// 	try{
		// 		window.history.back();
		// 	}catch(e){
		// 		console.log("Error is goBack: "+e.message);
		// 	}
		// },
    //
    //     /*
    //     * setMainContentHeight: function
		// * setMainContentHeight is used to adjust screen height for main container.
		// */
		// setMainContentHeight: function(mainContentElementClassName, innerHeight, sectionHeight){
		// 	innerHeight= innerHeight - sectionHeight;
    //         $('.' + mainContentElementClassName).height(innerHeight);
		// },
		// /*returnFormattedDate: function
		// *returnFormattedDate is used to return the formatted date according to choice.
		// */
		// returnFormattedDate : function(timeStamp){
		// 	try{
		// 		var monthArr = ["Start","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		// 		var fullDate = '';
		// 		var dateObj = new Date(timeStamp * 1000);
		// 		var day = dateObj.getDate();
		// 		if(day < 10){
		// 			day = "0" + day;
		// 		}
		// 		var month = parseInt(dateObj.getMonth());
		// 		month++;
		// 		var year = dateObj.getFullYear();
		// 		switch(appVariables.dateFormat){
		// 			case 'mm-dd-yyyy':
		// 				if(month < 10){
		// 					month = "0" + month;
		// 				}
		// 				fullDate = month + '-' + day + '-' + year;
		// 			break;
		// 			case 'dd-mmm-yyyy':
		// 				fullDate = day + '-' + monthArr[month] + '-' + year;
		// 			break;
		// 			case 'dd-mm-yyyy':
		// 			default:
		// 				if(month < 10){
		// 					month = "0" + month;
		// 				}
		// 				fullDate = day + '-' + month + '-' + year;
		// 		}
		// 		return fullDate;
		// 	}catch(e){
		// 		console.log("Error is returnFormattedDate: "+e.message);
		// 	}
		// }
    };
});
