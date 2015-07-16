'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:ScoreCtrl
 * @description
 * # ScoreCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('ScoreCtrl', function ($http, $timeout, api) {
    //need question_id and lang lookup
    //french question text?
    var ctrl = this;
    ctrl.api = api;
    api.getGame(10).success(function(data){
      ctrl.game = data;
    });
    ctrl.currentAudio = '';

    ctrl.playQuestion = function(question, code){
      ctrl.player.stop();
      var newAudio = question + '-' + code;
      if(ctrl.currentAudio === newAudio ){
        ctrl.currentAudio = '';
      }else{
        ctrl.currentAudio = question + '-' + code;
        ctrl.config.sources = [{src: 'sounds/questions/' + ctrl.currentAudio + '.mp3', type: "audio/mpeg"}];
        $timeout(ctrl.player.play.bind(ctrl.player), 100);
      }
    };

    ctrl.onPlayerReady = function(player){
      ctrl.player = player;
    };

    ctrl.onCompletePlay = function(){

    };

    ctrl.config = {
      sources: [],
      analytics: {
        category: "Videogular",
        label: "Main",
        events: {
          ready: true,
          play: true,
          pause: true,
          stop: true,
          complete: true,
          progress: 10
        }
      }
    };
  });
