'use strict';

/* Product Category Controllers */

angular.module('cartApp.category.controllers', []).
	controller('CategoryController',
	['$scope', '$http', '$state', '$rootScope', 'servQuantity',
		function ($scope, $http, $state, $rootScope, servQuantity) {			
			console.log('inside category controller');
			servQuantity.resetProduct();
			$http.get('data/cart.json').
				success(function (data) {
					$rootScope.productCatgId = data.productsInCart;
				}).
				error(function () {
					console.log('could not find cart.json');
				});
			/*$scope.moreInfo = function ($index) {
				$rootScope.currIndex = $index;
				//servQuantity.addProduct($rootScope.products[$index]);
			}*/

			$scope.viewProductList = function(input){
				console.log(input);
				$http.get('data/cart.json').
				success(function (data) {
					$rootScope.productCatgId = data.productsInCart;
					var key = 1;
					var newCat = [];
					for (key in data.productsInCart){
						console.log(key);
						if(input == key){
							var category = data.productsInCart[key].p_catg_id;
						}						
					}
					for (key in data.productsInCart){
						if(category == data.productsInCart[key].p_catg_id){
							newCat.push(data.productsInCart[key]); 
							console.log(newCat);
						}						
					}
				}).
				error(function () {
					console.log('could not find cart.json');
				});
				
				$state.go('products');
			}

			// carousal
			$scope.myInterval = 5000;
			var slides = $scope.slides = [];
			$scope.addSlide = function () {
				var newWidth = 100 + slides.length + 1;
				slides.push({
					image: 'img/banners/' + newWidth + '/ecomerce-banner.jpg',
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