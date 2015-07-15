'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:ScoreCtrl
 * @description
 * # ScoreCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('ScoreCtrl', function () {
    //need question_id and lang lookup
    this.scores = JSON.parse('[{"name":"Alice","score":3,"languages":[{"lang":"vn","correct":1},{"lang":"vn","correct":0},{"lang":"de","correct":1},{"lang":"ku","correct":1}]},{"name":"Charles","score":2,"languages":[{"lang":"ku","correct":0},{"lang":"vn","correct":1},{"lang":"ro","correct":1},{"lang":"ku","correct":0}]},{"name":"Felicitas","score":1,"languages":[{"lang":"es","correct":0},{"lang":"vn","correct":1},{"lang":"ru","correct":0},{"lang":"ru","correct":0}]},{"name":"Bertrand","score":0,"languages":[{"lang":"es","correct":0},{"lang":"ku","correct":0},{"lang":"ku","correct":0},{"lang":"ch","correct":0}]},{"name":"Delphine","score":0,"languages":[{"lang":"es","correct":0},{"lang":"hu","correct":0},{"lang":"es","correct":0},{"lang":"vn","correct":0}]},{"name":"Elisabeth","score":0,"languages":[{"lang":"es","correct":0},{"lang":"ne","correct":0},{"lang":"es","correct":0}]}]');

  });
