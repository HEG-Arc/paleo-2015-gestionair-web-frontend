'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('MainCtrl', function ($location) {
    this.showCode = function(){
      if(this.code){
        $location.hash('');
        $location.path('/score/' + this.code);
      }
    };
  });
