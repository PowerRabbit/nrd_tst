(function () {

    'use strict';

    var homeScreen = angular.module('homeScreen', ['ngRoute']),
    
        LANDSCAPE = 'landscape',
        PORTRAIT = 'portrait',
        APPS_PER_SCREEN = 20,
        
        getOrientation,
        getAppData,
        app_data;

    
    

    getOrientation = function () {
        var orientation = window.orientation || 90,
            result;
        
        if (orientation === -90 || orientation === 90) {
            result = LANDSCAPE;
        } else {
            result = PORTRAIT;
        }
        
        return result;
    };
    
    getAppData = function () {
        var app_data = [];
        app_data = [{img:'images/icons/airplane.svg',title:'Application #1'},{img:'images/icons/bank.svg',title:'Application #2'},{img:'images/icons/beacon.svg',title:'Application #3'},{img:'images/icons/beats.svg',title:'Application #4'},{img:'images/icons/bell.svg',title:'Application #5'},{img:'images/icons/bicycle.svg',title:'Application #6'},{img:'images/icons/box.svg',title:'Application #7'},{img:'images/icons/browser.svg',title:'Application #8'},{img:'images/icons/bulb.svg',title:'Application #9'},{img:'images/icons/casino.svg',title:'Application #10'},{img:'images/icons/chair.svg',title:'Application #11'},{img:'images/icons/config.svg',title:'Application #12'},{img:'images/icons/cup.svg',title:'Application #13'},{img:'images/icons/folder.svg',title:'Application #14'},{img:'images/icons/football.svg',title:'Application #15'},{img:'images/icons/headphones.svg',title:'Application #16'},{img:'images/icons/heart.svg',title:'Application #17'},{img:'images/icons/laptop.svg',title:'Application #18'},{img:'images/icons/letter.svg',title:'Application #19'},{img:'images/icons/like.svg',title:'Application #20'},{img:'images/icons/map.svg',title:'Application #21'},{img:'images/icons/medal.svg',title:'Application #22'},{img:'images/icons/mic.svg',title:'Application #23'},{img:'images/icons/milk.svg',title:'Application #24'},{img:'images/icons/pencil.svg',title:'Application #25'},{img:'images/icons/picture.svg',title:'Application #26'},{img:'images/icons/polaroid.svg',title:'Application #27'},{img:'images/icons/printer.svg',title:'Application #28'},{img:'images/icons/search.svg',title:'Application #29'},{img:'images/icons/shopping_bag.svg',title:'Application #30'},{img:'images/icons/speed.svg',title:'Application #31'},{img:'images/icons/stopwatch.svg',title:'Application #32'},{img:'images/icons/tactics.svg',title:'Application #33'},{img:'images/icons/tweet.svg',title:'Application #34'},{img:'images/icons/watch.svg',title:'Application #35'}];
        
        return app_data;
    };
    
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
            prepareData,            
        
            mySwiper,
            createParallax;

        prepareData = function () {
            var data = {},
                temp_apps = getAppData(),
                apps = [],
                aux_array = [],
                aux_array_length,
                i = 0;
            
            temp_apps.forEach(function (item) {
                if (i < APPS_PER_SCREEN) {
                    aux_array.push(item);
                    i += 1;
                } else {
                    apps.push(aux_array);
                    aux_array = [];
                    i = 0;
                }
            });
            aux_array_length = aux_array.length;
            
            for (aux_array_length; aux_array_length < APPS_PER_SCREEN; aux_array_length += 1) {
                aux_array.push({
                    img: '',
                    title: ''
                });
            }
            apps.push(aux_array);
            
            if (getOrientation() === LANDSCAPE) {
                data.col = 20;
            } else {
                data.col = 25;
            }
            
            data.apps = apps;

            return data;
        };
            
        createParallax = function () {
            var scene = document.querySelector('.page-content'),
                parallax = new $window.Parallax(scene);
                
                
            mySwiper = myApp.swiper('.swiper-container', {
                pagination:'.swiper-pagination'
            });
        };
        
        $scope.data = prepareData();

        setTimeout(createParallax, 500);
    });

    homeScreen.controller('storeController', function($scope) {

    });

}());