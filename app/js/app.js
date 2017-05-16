'use strict';

angular.module('cartApp', [
    'ui',
    // 'ui.filters',
    'ui.router',
    'ui.bootstrap',
    'ngUtil',
    'cartApp.appConfig',
    'cartApp.category',
    'cartApp.product',
    'cartApp.header',
    'cartApp.cart',
    'cartApp.wishlist',
    'cartApp.login',
    'cartApp.signup',
    'cartApp.productSummary',
    'cartApp.checkout',
    'cartApp.invoice',
    'cartApp.search'
]);

angular.module('cartApp').config([
    '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider.state('category', {
            url: '/category',
            controller: 'CategoryController',
            templateUrl: 'module/category/views/category.html'
        });
        $stateProvider.state('products', {
            url: '/products',
            controller: 'ProductsController',
            templateUrl: 'module/products/views/products.html'
        });
        $stateProvider.state('productsDetails', {
            url: '/details/:product',
            controller: 'ProductDetailsController',
            templateUrl: 'module/products/views/details.html'
        });
        $stateProvider.state('cart', {
            url: '/cart',
            controller: 'CartController',
            templateUrl: 'module/cart/views/cart.html'
        });
        $stateProvider.state('wishlist', {
            url: '/wishlist',
            controller: 'WishlistController',
            templateUrl: 'module/wishlist/views/wishlist.html'
        });
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'module/login/views/login.html'
        });
        $stateProvider.state('signup', {
            url: '/signup',
            controller: 'SignupController',
            templateUrl: 'module/signup/views/signup.html'
        });
        $stateProvider.state('productSummary', {
            url: '/productSummary',
            controller: 'ProductSummaryController',
            templateUrl: 'module/productSummary/views/productSummary.html'
        });
        $stateProvider.state('checkout', {
            url: '/checkout',
            controller: 'CheckoutController',
            templateUrl: 'module/checkout/views/checkout.html'
        });
        $stateProvider.state('invoice', {
            url: '/invoice',
            controller: 'InvoiceController',
            templateUrl: 'module/invoice/views/invoice.html'
        });
        $stateProvider.state('search', {
            url: '/search',
            controller: 'SearchController',
            templateUrl: 'module/search/views/search.html'
        });
        $urlRouterProvider.otherwise('/views/products.html');
    }
]).run(['$state', '$rootScope', '$location', 'servQuantity',
    function ($state, $rootScope, $location, servQuantity) {
        $state.go('category');
        console.log('app loaded');

        $rootScope.addedProdCount = 0;
        $rootScope.addedWishCount = 0;
        $rootScope.arrHoldProduct = [];
        $rootScope.arrGrandTotal = [];
        $rootScope.cart = [];
        $rootScope.wishlist = [];

        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.actualLocation = $location.path();
        });

        $rootScope.$watch(function () { return $location.path() }, function (newLocation, oldLocation) {
            if ($rootScope.actualLocation === newLocation) {
                //servQuantity.resetProduct();
                console.log('location changed!!');
            }
        });
    }
]);