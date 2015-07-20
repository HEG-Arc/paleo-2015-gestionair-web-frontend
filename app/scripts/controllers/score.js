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
    if($routeParams.code === 'sim'){
      ctrl.game = JSON.parse('{"id":76,"players":[{"number":1,"name":"leanne","score":125,"answers":[{"sequence":1,"correct":0,"answer":2,"question":151,"code":"pt","duration":6.898289},{"sequence":2,"correct":null,"answer":5,"question":75,"code":"vn","duration":9.109963},{"sequence":3,"correct":1,"answer":7,"question":105,"code":"it","duration":10.391158},{"sequence":4,"correct":0,"answer":3,"question":132,"code":"ku","duration":10.418726},{"sequence":5,"correct":1,"answer":5,"question":25,"code":"it","duration":8.166047}]},{"number":2,"name":"Raphaël","score":0,"answers":[]},{"number":3,"name":"yann","score":0,"answers":[{"sequence":1,"correct":null,"answer":8,"question":47,"code":"hr","duration":14.003728},{"sequence":2,"correct":0,"answer":2,"question":160,"code":"de","duration":13.341294},{"sequence":3,"correct":0,"answer":8,"question":181,"code":"pt","duration":8.971468}]},{"number":4,"name":"Nicolas","score":0,"answers":[]}],"code":"3B","team":"pepe","start_time":"2015-07-17T16:51:56.045276Z","end_time":"2015-07-17T16:55:37.076340Z","canceled":true,"initialized":true}');
    }else{
      api.getGame($routeParams.code).success(function(data){
        ctrl.game = data;
      });
    }
  });
