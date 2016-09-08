'use strict';

/**
 * @ngdoc directive
 * @name gestionairFrontendApp.directive:slideshow
 * @description
 * # slideshow
 */
angular.module('gestionairApp')
  .directive('slideshow', function ($timeout) {
    return {
      template: '<div class="slideshow"flex><img style="width:100%" ng-src="{{images[activeIndex]}}"/><div class="fade" layout-fill ng-repeat="src in images" ng-show="$index == activeIndex" style="background-image: url(\'{{src}}\')"></div></div>',
      replace: true,
      restrict: 'E',
      scope: {
        images: '=',
        duration: '='
      },
      link: function postLink(scope) {
        scope.activeIndex = 0;
        var slideshow = function () {
          scope.activeIndex = (scope.activeIndex + 1) % scope.images.length;
          $timeout(slideshow, scope.duration);
        };
        slideshow();

      }
    };
  });
