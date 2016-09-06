'use strict';

/**
 * @ngdoc function
 * @name gestionairApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gestionairApp
 */
angular.module('gestionairApp')
  .controller('EventCtrl', function ($scope, api, $rootScope) {
    var $ctrl = this;
    $ctrl.events = [];
    api.getEvents().then(function(res){
        for (var i=0; i < res.data.length; i++) {
            var e = res.data[i];
            var start_date = new Date(e.start_date);
            var smonth = start_date.getMonth() + 1;
            if (e.end_date) {
                var end_date = new Date(e.end_date);
                var emonth = end_date.getMonth() + 1;
                if (start_date.getFullYear() !== end_date.getFullYear()) {
                    e.dates = start_date.getDate() + '.' + smonth + '.' + start_date.getFullYear() + ' - ' + end_date.getDate() + '.' + emonth + '.' + end_date.getFullYear();
                } else {
                  e.dates = start_date.getDate();
                  if (smonth === emonth) {
                    e.dates += '-' + end_date.getDate() + '.' + emonth + '.' + end_date.getFullYear();
                  } else {
                    e.dates += '.' + smonth + '-' + end_date.getDate() + '.' + emonth + '.' + end_date.getFullYear();
                  }
                }
            } else {
                e.dates = start_date.getDate() + '.' + smonth + '.' + start_date.getFullYear();
            }
            $ctrl.events.push(e);
            //quick hack to display next event on main
            if (i === 0) {
              $rootScope.nextEvent = e;
            }
        }
    });
  });
