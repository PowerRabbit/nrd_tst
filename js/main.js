(function () {

    'use strict';

    var homeScreen = angular.module('homeScreen', ['ngRoute']);

    homeScreen.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            .when('/appstore', {
                templateUrl : 'pages/store.html',
                controller  : 'storeController'
            })
    });

    homeScreen.controller('mainController', function($scope, $window) {
        var myApp = new $window.Framework7(),
            mySwiper,
            createParallax;

        createParallax = function () {
            var scene = document.querySelector('.page-content'),
                parallax = new $window.Parallax(scene);
        }

        mySwiper = myApp.swiper('.swiper-container', {
            pagination:'.swiper-pagination'
        })

        setTimeout(createParallax, 500);
    });

    homeScreen.controller('storeController', function($scope) {

    });

}());