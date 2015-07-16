'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:ScoreCtrl
 * @description
 * # ScoreCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('ScoreCtrl', function ($http) {
    //need question_id and lang lookup
    //french question text?
    var controller = this;
    controller.scores = JSON.parse('[{"name":"Alice","score":3,"languages":[{"lang":"vn","correct":1},{"lang":"vn","correct":0},{"lang":"de","correct":1},{"lang":"ku","correct":1}]},{"name":"Charles","score":2,"languages":[{"lang":"ku","correct":0},{"lang":"vn","correct":1},{"lang":"ro","correct":1},{"lang":"ku","correct":0}]},{"name":"Felicitas","score":1,"languages":[{"lang":"es","correct":0},{"lang":"vn","correct":1},{"lang":"ru","correct":0},{"lang":"ru","correct":0}]},{"name":"Bertrand","score":0,"languages":[{"lang":"es","correct":0},{"lang":"ku","correct":0},{"lang":"ku","correct":0},{"lang":"ch","correct":0}]},{"name":"Delphine","score":0,"languages":[{"lang":"es","correct":0},{"lang":"hu","correct":0},{"lang":"es","correct":0},{"lang":"vn","correct":0}]},{"name":"Elisabeth","score":0,"languages":[{"lang":"es","correct":0},{"lang":"ne","correct":0},{"lang":"es","correct":0}]}]');

    controller.onPlayerReady = function(API) {
                controller.API = API;
            };

            controller.onCompleteVideo = function() {
                controller.isCompleted = true;

                controller.currentVideo++;

                if (controller.currentVideo >= controller.videos.length) {
                  controller.currentVideo = 0;
                }

                controller.setVideo(controller.currentVideo);
            };


    $http.get('http://192.168.59.103:8081/api/games/10')
    .success(function(data){
      controller.scores = data;
    });

          controller.config = {
            sources: [
              {src: 'http://static.videogular.com/assets/audios/videogular.mp3', type: "audio/mpeg"},
              {src: 'http://static.videogular.com/assets/audios/videogular.ogg', type: "audio/ogg"}
          ],
                theme: {
          url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
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
