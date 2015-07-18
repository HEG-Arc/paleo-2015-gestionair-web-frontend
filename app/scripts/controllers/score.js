'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:ScoreCtrl
 * @description
 * # ScoreCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('ScoreCtrl', function ($http, api, $routeParams) {
    //need question_id and lang lookup
    //french question text?
    var ctrl = this;
    ctrl.api = api;
    api.getGame($routeParams.code).success(function(data){
      ctrl.game = data;
    });
  });
