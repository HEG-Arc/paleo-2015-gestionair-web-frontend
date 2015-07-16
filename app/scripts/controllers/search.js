'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('SearchCtrl', function ($location, api) {
    var ctrl = this;
    ctrl.orderBy = 'start_time';
    ctrl.reverse = false;

    ctrl.fetchDate= function(date){
      api.fetchDate(date).success(function(data){
        ctrl.teams = data;
      });
    };

    ctrl.sort = function(field){
      if(field === ctrl.orderBy){
        ctrl.reverse = ! ctrl.reverse;
      }else{
        ctrl.orderBy = field;
      }
    };

    ctrl.showDetail = function(id){
      $location.path('/score/' + id);
    };

    //TODO dynamic start day?
    ctrl.fetchDate('2015-07-13');
  });
