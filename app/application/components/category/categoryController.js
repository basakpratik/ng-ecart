'use strict';

/* Product Category Controllers */

angular.module('cartApp.category.controllers', []).
	controller('CategoryController',
	['$scope', '$http', '$state', '$rootScope', '$log', 'servQuantity', 'category',
		function ($scope, $http, $state, $rootScope, $log, servQuantity, category) {			
			console.log('inside category controller');
			$scope.dataItems = [];
			$scope.categoryArr = [];
			servQuantity.resetProduct();
			category.resetFilteredProducts();

			/*$http.get('data/cart.json').
				success(function (data) {
					$scope.productCatgId = data.productsInCart;
					for(var i=0; i<$scope.productCatgId.length; i++){
						$scope.categoryArr.push({
							'p_catg_id': $scope.productCatgId[i].p_catg_id,
							'p_catg_img': $scope.productCatgId[i].p_image
						});
						var counter = 0;
						for(var j=0; j<$scope.categoryArr.length; j++){
							if($scope.productCatgId[i].p_catg_id == $scope.categoryArr[j].p_catg_id){
								counter++;
							}
						}
						if(counter > 1){
							$scope.categoryArr.pop({
								'p_catg_id': $scope.productCatgId[i].p_catg_id,
								'p_catg_img': $scope.productCatgId[i].p_image
							});
						}
					}
					console.log(JSON.stringify($scope.categoryArr));
				}).
				error(function () {
					console.log('could not find cart.json');
				});*/

			$scope.getItems = function(){
				category.getData().then(function(dataParam){
					$scope.dataItems = dataParam.productsInCart;
					dataholdFunc($scope.dataItems);
				}, function(){
					$log.error('Error fetching data from service!');
				})
			}
			$scope.getItems();

			function dataholdFunc(proData){
				category.setDataFilter(proData);
				$scope.categoryArr = category.getDataFilter(); //-> category wise filtered data
				//$log.log('$scope.categoryArr->'+JSON.stringify($scope.categoryArr));
			}
			
			$scope.viewProductList = function($index){
				var currCatgId = $scope.categoryArr[$index].p_catg_id;
				category.getData().then(function(dataParam){
					$scope.dataItems = dataParam.productsInCart;
					for(var i=0; i<$scope.dataItems.length; i++){
						if($scope.categoryArr[$index].p_catg_id == $scope.dataItems[i].p_catg_id){
							category.setFilteredProducts($scope.dataItems[i]);
						}
					}
				}, function(){
					$log.error('Error fetching data from service!');
				});
				$state.go('products', {
					catgId: currCatgId
				});
			}

			// carousal
			$scope.myInterval = 5000;
			var slides = $scope.slides = [];
			$scope.addSlide = function () {
				var newWidth = 100 + slides.length + 1;
				slides.push({
					image: 'assets/img/banners/' + newWidth + '/ecomerce-banner.jpg',
					text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
					['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
				});
			};
			for (var i = 0; i < 4; i++) {
				$scope.addSlide();
			}
			// end of carousal
		}
	]);