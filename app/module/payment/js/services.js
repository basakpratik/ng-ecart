'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('cartApp.checkout.services', []).
  factory('formData', [function(){
    var savedData = {}, billingData = {};

    function setAddress(dataSet){
      savedData = dataSet;
    }
    function setBillingAddress(dataSet){
      billingData = dataSet;
    }
    function getAddress(){
      return savedData;
    }
    function getBillingAddress(){
      return billingData;
    }

    return {
      setAddress: setAddress,
      getAddress: getAddress,
      setBillingAddress: setBillingAddress,
      getBillingAddress: getBillingAddress
    }
  }]);
