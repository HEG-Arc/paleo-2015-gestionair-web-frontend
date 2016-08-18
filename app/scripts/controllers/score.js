'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:ScoreCtrl
 * @description
 * # ScoreCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('ScoreCtrl', function ($scope, $http, api, $routeParams) {
    //need question_id and lang lookup
    //french question text?
    var ctrl = this;
    ctrl.api = api;
    if ($routeParams.code === 'sim') {
      $scope.player = JSON.parse('{"number":1,"name":"leanne","score":125,"answers":[{"sequence":1,"correct":0,"answer":2,"question":151,"code":"pt","duration":6.898289},{"sequence":2,"correct":null,"answer":5,"question":75,"code":"vn","duration":9.109963},{"sequence":3,"correct":1,"answer":7,"question":105,"code":"it","duration":10.391158},{"sequence":4,"correct":0,"answer":3,"question":132,"code":"ku","duration":10.418726},{"sequence":5,"correct":1,"answer":5,"question":25,"code":"it","duration":8.166047}]}');
    } else {
      api.getScore($routeParams.code).then(function(result){
        $scope.player = result.data.json;
      }, function(){
        $scope.player = {
          'name': 'ERROR 404'
        }
      });
    }
  });
