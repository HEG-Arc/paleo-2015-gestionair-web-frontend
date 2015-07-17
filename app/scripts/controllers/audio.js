'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:AudioCtrl
 * @description
 * # AudioCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('AudioCtrl', function ($timeout, api) {
    var ctrl = this;
    ctrl.currentAudio = '';

    ctrl.currentQuestion = {};
    ctrl.done = [];
    ctrl.correctCount = 0;

    ctrl.nextQuestion = function(){
      api.departments.forEach(function(dep){
        dep.answer = false;
      });
      if(ctrl.currentQuestion.translations){
        var translation = ctrl.currentQuestion.translations[Math.floor(Math.random() * ctrl.currentQuestion.translations.length)];
        ctrl.playQuestion(ctrl.currentQuestion.number, translation.language);
        ctrl.done.push(ctrl.currentQuestion.number);
        ctrl.gameState = 'answering';
      }else{
        ctrl.answerQuestion().success(function(){
          ctrl.nextQuestion();
        });
      }
    };

    ctrl.answerQuestion = function(answer){
      if(ctrl.player.currentState==='play'){
        ctrl.player.stop();
      }
      ctrl.gameState = 'evaluating';
      return api.nextQuestion({answer: answer, id: ctrl.currentQuestion.number, done: ctrl.done})
      .success(function(data){
        ctrl.gameState = 'result';
        ctrl.correct = data.correct;
        if(data.correct){
          ctrl.correctCount++;
        }
        ctrl.currentQuestion = data.next;
      });
    };

    ctrl.playQuestion = function(question, code){
      if(ctrl.player.currentState==='play'){
        ctrl.player.stop();
      }
      var newAudio = question + '-' + code;
      ctrl.config.plugins.analytics.label = newAudio;
      if(ctrl.currentAudio === newAudio ){
        ctrl.currentAudio = '';
      }else{
        ctrl.currentAudio = question + '-' + code;
        ctrl.config.sources = [{src: 'sounds/questions/' + ctrl.currentAudio + '.m4a', type: "audio/mp4"}];
        $timeout(function(){
          ctrl.playing = true;
          ctrl.player.play();
        }, 100);
      }
    };

    ctrl.onPlayerReady = function(player){
      ctrl.player = player;
    };

    ctrl.onCompletePlay = function(){
      ctrl.playing = false;
      ctrl.currentAudio = '';
    };

    ctrl.config = {
      sources: [],
      plugins: {
        analytics: {
          category: "Videogular",
          label: "Main",
          events: {
            ready: false,
            play: true,
            pause: true,
            stop: true,
            complete: true,
            progress: 10
          }
        }
      }
    };
  });
