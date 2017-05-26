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
    'cartApp.footer',
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
            templateUrl: 'application/components/category/category.html'
        });
        $stateProvider.state('products', {
            url: '/products',
            controller: 'ProductsController',
            templateUrl: 'application/components/products/products.html'
        });
        $stateProvider.state('productsDetails', {
            url: '/details/:product',
            controller: 'ProductDetailsController',
            templateUrl: 'application/components/products/details.html'
        });
        $stateProvider.state('cart', {
            url: '/cart',
            controller: 'CartController',
            templateUrl: 'application/components/cart/cart.html'
        });
        $stateProvider.state('wishlist', {
            url: '/wishlist',
            controller: 'WishlistController',
            templateUrl: 'application/components/wishlist/wishlist.html'
        });
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'application/components/login/login.html'
        });
        $stateProvider.state('signup', {
            url: '/signup',
            controller: 'SignupController',
            templateUrl: 'application/components/signup/signup.html'
        });
        $stateProvider.state('productSummary', {
            url: '/productSummary',
            controller: 'ProductSummaryController',
            templateUrl: 'application/components/productSummary/productSummary.html'
        });
        $stateProvider.state('checkout', {
            url: '/checkout',
            controller: 'CheckoutController',
            templateUrl: 'application/components/checkout/checkout.html'
        });
        $stateProvider.state('invoice', {
            url: '/invoice',
            controller: 'InvoiceController',
            templateUrl: 'application/components/invoice/invoice.html'
        });
        $stateProvider.state('search', {
            url: '/search',
            controller: 'SearchController',
            templateUrl: 'application/components/search/search.html'
        });
        $urlRouterProvider.otherwise('/category.html');
    }
]).run(['$state', '$rootScope', '$location', 'servQuantity',
    function ($state, $rootScope, $location, servQuantity) {
        $state.go('category');
        console.log('app loaded');

        $rootScope.addedProdCount = 0;
        $rootScope.addedWishCount = 0;
        //$rootScope.arrHoldProduct = [];
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