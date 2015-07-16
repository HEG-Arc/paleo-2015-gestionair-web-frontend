'use strict';

/**
 * @ngdoc service
 * @name gestionairApp.api
 * @description
 * # api
 * Service in the gestionairApp.
 */
angular.module('gestionairApp')
  .service('api', function ($http) {
    var _this = this;
    var API_URL = 'http://192.168.59.103:8081/api';
    $http.get(API_URL + '/departments').success(function(data){
      _this.departments = data;
    });
    $http.get(API_URL + '/languages').success(function(data){
      _this.languages = data;
    });

    _this.fetchDate = function(date){
      return $http.get(API_URL + '/games?date=' + date);
    };
  });
