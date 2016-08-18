'use strict';

/**
 * @ngdoc overview
 * @name gestionairApp
 * @description
 * # gestionairApp
 *
 * Main module of the application.
 */
angular
  .module('gestionairApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'angulartics',
    'angulartics.google.analytics',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.analytics'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/:playerId', {
        templateUrl: 'views/score.html',
        controller: 'ScoreCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($mdThemingProvider) {
$mdThemingProvider.definePalette('arc', {
    '50': '0098d8',
    '100': '0098d8',
    '200': '0098d8',
    '300': '0098d8',
    '400': '0098d8',
    '500': '0098d8',
    '600': '0098d8',
    '700': '0098d8',
    '800': '0098d8',
    '900': '0098d8',
    'A100': '0098d8',
    'A200': '0098d8',
    'A400': '0098d8',
    'A700': '0098d8',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': undefined,
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('default')
    .primaryPalette('arc')
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('green', {
      'default': '600' // use shade 200 for default, and keep all other shades the same
    });
});