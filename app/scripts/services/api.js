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
    _this.languages = [];
    _this.departments = [];
    var API_URL = '/api';

    $http.get(API_URL + '/departments').success(function(data){
      _this.departments = data;
    });

    $http.get(API_URL + '/languages').success(function(data){
      _this.languages = data;
    });

    _this.getEvents = function() {
      return $http.get(API_URL + '/events/upcoming');
    };

    _this.getGame = function(id){
      return $http.get(API_URL + '/games/' + id);
    };

    _this.getPlayer = function(id){
      return $http.get(API_URL + '/player/' + id);
    };

    _this.getScore = function(id){
      return $http.get(API_URL + '/score/' + id);
    };

    _this.fetchDate = function(date){
      return $http.get(API_URL + '/games?date=' + date);
    };

    _this.nextQuestion = function(data){
      return $http.post(API_URL + '/questions', data);
    };

    _this.languageName = function(code){
      for(var i=0; i < _this.languages.length; i++){
        if(_this.languages[i].code === code){
          return _this.languages[i].language;
        }
      }
    };

    _this.departmentName = function(number){
      for(var i=0; i < _this.departments.length; i++){
        if(_this.departments[i].number === number){
          return _this.departments[i].name;
        }
      }
    };

  });
