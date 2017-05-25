'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('cartApp.header.services', []).
	service('duplicateCheck', function () {
		this.checkDuplicateInObject = function (arrSingleData, arrComparableData, compareUnit, type) {
			var seenDuplicate = false;
			if(type == true){
				for(var i=0; i<arrComparableData.length; i++){
					if(arrSingleData[0][compareUnit] == arrComparableData[i][compareUnit]){
						//console.log(type + ' catg :: duplicate data found');
						seenDuplicate = true;
					}
				}
			} else {
				for(var i=0; i<arrComparableData.length; i++){
					if(arrSingleData[compareUnit] == arrComparableData[i][compareUnit]){
						//console.log(type +' catg :: duplicate data found');
						seenDuplicate = true;
					}
				}
			}			
			return seenDuplicate;
		}
	});
