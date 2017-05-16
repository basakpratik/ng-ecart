'use strict';

/* Product/Product Details Services */

angular.module('cartApp.product.service', []).
	service('servQuantity', ['$rootScope',
		function ($rootScope) {

			this.prodQuantity = "1";
			var productList = [];

			var addProduct = function (newObj) {
				productList.push(newObj);
			};

			var getProducts = function () {
				return productList;
			};

			var resetProduct = function () {
				productList.length = 0;
			};

			return {
				addProduct: addProduct,
				getProducts: getProducts,
				resetProduct: resetProduct
			};

		}
	]);
