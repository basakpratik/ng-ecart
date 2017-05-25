'use strict';

/* Category Services */

angular.module('cartApp.category.services', []).
	factory('category', function ($http, $q) {
		var serviceObject = {
			fProductArr: [],
			data: [],
			catgData: [],
			getData: getData,
			setDataFilter: setDataFilter,
			getDataFilter: getDataFilter,
			setFilteredProducts: setFilteredProducts,
			getFilteredProducts: getFilteredProducts,
			resetFilteredProducts: resetFilteredProducts,
		};

		function getData(){
			var def = $q.defer();
			$http.get('data/cart.json').then(
				function successCall(response){
					serviceObject.data = response.data;
					def.resolve(serviceObject.data);
				}, function failCall(){
					def.reject('Error loading data!');
				}
			);
			return def.promise;
		}

		function setDataFilter(dataFilter){
			for(var i=0; i<dataFilter.length; i++){
				serviceObject.catgData.push({
					'p_catg_id': dataFilter[i].p_catg_id,
					'p_catg_img': dataFilter[i].p_image
				});
				var counter = 0;
				for(var j=0; j<serviceObject.catgData.length; j++){
					if(dataFilter[i].p_catg_id == serviceObject.catgData[j].p_catg_id){
						counter++;
					}
				}
				if(counter > 1){
					serviceObject.catgData.pop({
						'p_catg_id': dataFilter[i].p_catg_id,
						'p_catg_img': dataFilter[i].p_image
					});
				}
			}
		}

		function getDataFilter(){
			return serviceObject.catgData;
		}

		function setFilteredProducts(fProduct){
			serviceObject.fProductArr.push(fProduct);
		}

		function getFilteredProducts(){
			return serviceObject.fProductArr;
		}

		function resetFilteredProducts() {
			serviceObject.fProductArr = [];
		}

		return serviceObject;
	});
