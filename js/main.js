(function () {

    'use strict';

    var homeScreen = angular.module('homeScreen', ['ngRoute']),
        document = window.document,
    
        LANDSCAPE = 'landscape',
        PORTRAIT = 'portrait',
        APPS_PER_SCREEN = 20,
        DOWN_EVENT_NAME = 'mousedown',
        UP_EVENT_NAME = 'mouseup',
        STORAGE_NAME = 'homeScreen',
        
        wobbling = false,
        action_first = false,
        getOrientation,
        setAppData,
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
    
    setAppData = function (data) {
        localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
    };
    
    getAppData = function () {
        var app_data = JSON.parse(localStorage.getItem(STORAGE_NAME));

        if (!app_data) {
            app_data = [{img:'images/icons/airplane.svg',title:'Application #1'},{img:'images/icons/bank.svg',title:'Application #2'},{img:'images/icons/beacon.svg',title:'Application #3'},{img:'images/icons/beats.svg',title:'Application #4'},{img:'images/icons/bell.svg',title:'Application #5'},{img:'images/icons/bicycle.svg',title:'Application #6'},{img:'images/icons/box.svg',title:'Application #7'},{img:'images/icons/browser.svg',title:'Application #8'},{img:'images/icons/bulb.svg',title:'Application #9'},{img:'images/icons/casino.svg',title:'Application #10'},{img:'images/icons/chair.svg',title:'Application #11'},{img:'images/icons/config.svg',title:'Application #12'},{img:'images/icons/cup.svg',title:'Application #13'},{img:'images/icons/folder.svg',title:'Application #14'},{img:'images/icons/football.svg',title:'Application #15'},{img:'images/icons/headphones.svg',title:'Application #16'},{img:'images/icons/heart.svg',title:'Application #17'},{img:'images/icons/laptop.svg',title:'Application #18'},{img:'images/icons/letter.svg',title:'Application #19'},{img:'images/icons/like.svg',title:'Application #20'},{img:'images/icons/map.svg',title:'Application #21'},{img:'images/icons/medal.svg',title:'Application #22'},{img:'images/icons/mic.svg',title:'Application #23'},{img:'images/icons/milk.svg',title:'Application #24'},{img:'images/icons/pencil.svg',title:'Application #25'},{img:'images/icons/picture.svg',title:'Application #26'},{img:'images/icons/polaroid.svg',title:'Application #27'},{img:'images/icons/printer.svg',title:'Application #28'},{img:'images/icons/search.svg',title:'Application #29'},{img:'images/icons/shopping_bag.svg',title:'Application #30'},{img:'images/icons/speed.svg',title:'Application #31'},{img:'images/icons/stopwatch.svg',title:'Application #32'},{img:'images/icons/tactics.svg',title:'Application #33'},{img:'images/icons/tweet.svg',title:'Application #34'},{img:'images/icons/watch.svg',title:'Application #35'}];
        }
        
        
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

    homeScreen.controller('mainController', ['$scope','$route','$window', function($scope, $route, $window) {
        var myApp = new $window.Framework7(),        
            prepareData,
            bindEventsOnIcons,
        
            mySwiper,
            decorationsAndEvents;

        bindEventsOnIcons = function () {
            var timeout;
            
            $scope.swiper_wrapper.addEventListener(DOWN_EVENT_NAME, function (e) {
                var target = e.target;

                if (!wobbling) {                
                    while (target !== $scope.swiper_wrapper) {
                        if (target.className === 'img_wrapper') {
                            action_first = true;
                            timeout = setTimeout(function () {                            
                                $scope.swiper_wrapper.className += ' wobble';
                                wobbling = true;
                            }, 1500);
                            return;
                        }
                        target = target.parentNode;
                    }
                }
            }, false);
            $scope.swiper_wrapper.addEventListener(UP_EVENT_NAME, function (e) {
                var target = e.target;
                setTimeout(function () {
                    action_first = false;
                }, 50);
                clearTimeout(timeout);
            }, false);
        };
            
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
            
        $scope.decorationsAndEvents = function () {
            var scene = document.querySelector('.page-content'),
                parallax = new $window.Parallax(scene);
                
            mySwiper = myApp.swiper('.swiper-container', {
                pagination:'.swiper-pagination'
            });
            
            $scope.swiper_wrapper = document.querySelector('.swiper-wrapper');
            bindEventsOnIcons();
        };
        
        $scope.saveApps = function () {
            var new_data = [];
            
            $scope.reserved_data.apps.forEach(function (item) {
                item.forEach(function (app) {
                    if (app.img && app.title) {
                        new_data.push(app);
                    }
                });                
            });
            setAppData(new_data);
        };

        $scope.$route = $route;
        $scope.data = prepareData();
        $scope.reserved_data = JSON.parse(JSON.stringify($scope.data));

        if (!$scope.is_init) {
            setTimeout($scope.decorationsAndEvents, 500);
            $scope.is_init = true;
        }
    }]);

    homeScreen.controller('storeController', function($scope) {

    });
    
    homeScreen.directive('removeOnClick', function() {
        return {
            link: function($scope, elt, attrs) {
                var app;
                $scope.remove = function() {

                    if (wobbling && !action_first) {
                        app = this.app;

                        $scope.data.apps.forEach(function (item, key) {
                            item.forEach(function (el, k) {
                                if (app.$$hashKey === el.$$hashKey) {
                                    delete $scope.reserved_data.apps[key][k];
                                    $scope.saveApps();
                                }
                            });
                        });                        
                        elt.html('');
                    }
                };
            }
        }
    });
    
    homeScreen.directive('restoreOnClick', function() {
        return {
            link: function($scope, elt, attrs) {
                var position,
                    new_class;
                $scope.restore_state = function() {
                    if (wobbling) {
                        position = $scope.swiper_wrapper.className.indexOf(' wobble');
                        new_class = $scope.swiper_wrapper.className.substr(0, position);
                        $scope.swiper_wrapper.className = new_class;
                        wobbling = false;
                        $scope.$route.reload();
                        setTimeout($scope.decorationsAndEvents, 500); 
                    }
                };
            }
        }
    });

}());