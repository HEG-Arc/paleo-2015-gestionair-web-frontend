"use strict";angular.module("gestionairApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","angulartics","angulartics.google.analytics","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.analytics"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/:code",{templateUrl:"views/score.html",controller:"ScoreCtrl",controllerAs:"ctrl"}).otherwise({redirectTo:"/"})}]).config(["$mdThemingProvider",function(a){a.definePalette("arc",{50:"0098d8",100:"0098d8",200:"0098d8",300:"0098d8",400:"0098d8",500:"0098d8",600:"0098d8",700:"0098d8",800:"0098d8",900:"0098d8",A100:"0098d8",A200:"0098d8",A400:"0098d8",A700:"0098d8",contrastDefaultColor:"light",contrastDarkColors:void 0,contrastLightColors:void 0}),a.theme("default").primaryPalette("arc").accentPalette("green",{"default":"600"})}]),angular.module("gestionairApp").controller("MainCtrl",["$location","api",function(a,b){this.api=b,this.showCode=function(){this.code&&(a.hash(""),a.path("/score/"+this.code))}}]),angular.module("gestionairApp").controller("ScoreCtrl",["$scope","$http","api","$routeParams",function(a,b,c,d){var e=this;e.api=c,"sim"===d.code?a.player=JSON.parse('{"number":1,"name":"leanne","score":125,"answers":[{"sequence":1,"correct":0,"answer":2,"question":151,"code":"pt","duration":6.898289},{"sequence":2,"correct":null,"answer":5,"question":75,"code":"vn","duration":9.109963},{"sequence":3,"correct":1,"answer":7,"question":105,"code":"it","duration":10.391158},{"sequence":4,"correct":0,"answer":3,"question":132,"code":"ku","duration":10.418726},{"sequence":5,"correct":1,"answer":5,"question":25,"code":"it","duration":8.166047}]}'):c.getScore(d.code).then(function(b){a.player=b.data.json},function(){a.player={name:"ERROR 404"}})}]),angular.module("gestionairApp").service("api",["$http",function(a){var b=this;b.languages=[],b.departments=[];var c="/api";a.get(c+"/departments").success(function(a){b.departments=a}),a.get(c+"/languages").success(function(a){b.languages=a}),b.getEvents=function(){return a.get(c+"/events/upcoming")},b.getGame=function(b){return a.get(c+"/games/"+b)},b.getPlayer=function(b){return a.get(c+"/player/"+b)},b.getScore=function(b){return a.get(c+"/score/"+b)},b.fetchDate=function(b){return a.get(c+"/games?date="+b)},b.nextQuestion=function(b){return a.post(c+"/questions",b)},b.languageName=function(a){for(var c=0;c<b.languages.length;c++)if(b.languages[c].code===a)return b.languages[c].language},b.departmentName=function(a){for(var c=0;c<b.departments.length;c++)if(b.departments[c].number===a)return b.departments[c].name}}]),angular.module("gestionairApp").controller("SearchCtrl",["$location","api",function(a,b){var c=this;c.orderBy="start_time",c.reverse=!1,c.fetchDate=function(a){b.fetchDate(a).success(function(a){c.teams=a})},c.sort=function(a){a===c.orderBy?c.reverse=!c.reverse:c.orderBy=a},c.showDetail=function(b){a.path("/score/"+b)}}]),angular.module("gestionairApp").controller("AudioCtrl",["$timeout","api",function(a,b){var c=this;c.currentAudio="",c.currentQuestion={},c.done=[],c.correctCount=0,c.nextQuestion=function(){if(b.departments.forEach(function(a){a.answer=!1}),c.currentQuestion.translations){var a=c.currentQuestion.translations[Math.floor(Math.random()*c.currentQuestion.translations.length)];c.playQuestion(c.currentQuestion.number,a.language),c.done.push(c.currentQuestion.number),c.gameState="answering"}else c.answerQuestion().success(function(){c.nextQuestion()})},c.answerQuestion=function(a){return"play"===c.player.currentState&&c.player.stop(),c.gameState="evaluating",b.nextQuestion({answer:a,id:c.currentQuestion.number,done:c.done}).success(function(a){c.gameState="result",c.correct=a.correct,a.correct&&c.correctCount++,c.currentQuestion=a.next})},c.playQuestion=function(b,d){"play"===c.player.currentState&&c.player.stop();var e=b+"-"+d;c.config.plugins.analytics.label=e,c.currentAudio===e?c.currentAudio="":(c.currentAudio=b+"-"+d,c.config.sources=[{src:"sounds/questions/"+c.currentAudio+".m4a",type:"audio/mp4"}],a(function(){c.playing=!0,c.player.play()},100))},c.onPlayerReady=function(a){c.player=a},c.onCompletePlay=function(){c.playing=!1,c.currentAudio=""},c.config={sources:[],plugins:{analytics:{category:"Videogular",label:"Main",events:{ready:!1,play:!0,pause:!0,stop:!0,complete:!0,progress:10}}}}}]),angular.module("gestionairApp").controller("EventCtrl",["$scope","api",function(a,b){var c=this;c.events=[],b.getEvents().then(function(a){for(var b=0;b<a.data.length;b++){var d=a.data[b],e=new Date(d.start_date),f=e.getMonth()+1;if(d.end_date){var g=new Date(d.end_date),h=g.getMonth()+1;e.getFullYear()!==g.getFullYear()?d.dates=e.getDate()+"."+f+"."+e.getFullYear()+" - "+g.getDate()+"."+h+"."+g.getFullYear():(d.dates=e.getDate(),f===h?d.dates+="-"+g.getDate()+"."+h+"."+g.getFullYear():d.dates+="."+f+"-"+g.getDate()+"."+h+"."+g.getFullYear())}else d.dates=e.getDate()+"."+f+"."+e.getFullYear();c.events.push(d)}})}]),angular.module("gestionairApp").run(["$templateCache",function(a){a.put("views/main.html",'<h1>Jouer</h1> <p>Venez tester vos compétence de gestion et de langues le <strong>21.11.15 aux Portes-ouvertes de la HE-Arc Neuchâtel</strong></p> <h3>Entraînement</h3> <p>Ecouter un appel téléphonique et redirigez la personne vers le bon département.</p> <div layout="row" layout-align="space-around center"> <md-button analytics-on aria-label="jouer" ng-disabled="audio.gameState==\'answering\'" class="md-accent md-raised" ng-click="audio.nextQuestion()">Jouer</md-button> <span flex></span> <p class="answer correct" ng-show="audio.gameState==\'result\' && audio.correct">Correct Bravo!</p> <p class="answer wrong" ng-show="audio.gameState==\'result\' && !audio.correct">Désolé faux!</p> <span flex></span> <p>Score {{audio.correctCount}} / {{audio.done.length}}</p> </div> <md-list> <md-list-item analytics-on analytics-event="Answer" analytics-category="Game" analytics-label="{{dep.name}}" ng-disabled="audio.gameState!=\'answering\'" ng-repeat-start="dep in main.api.departments | orderBy: dep.number"> <md-checkbox aria-label="{{dep.name}}" ng-disabled="audio.gameState!=\'answering\'" ng-change="audio.answerQuestion(dep.number)" ng-model="dep.answer"></md-checkbox> {{dep.name}} </md-list-item> <md-divider ng-repeat-end ng-if="!$last"></md-divider> </md-list> <h1>Résultats</h1> <p>Si tu as participé à l\'activité Gestion\'air, retrouve tes résultats en scannant le QR-Code <md-icon md-svg-src="images/icons/qrcode.svg"></md-icon> de ton ticket!</p> <p style="text-align:center;padding-top: 2em"><img src="images/words.gif" alt="words" style="width: 50%"></p>'),a.put("views/score.html",'<div id="scoreboard"> <p>Reécoute les questions en cliquant dessus.</p> <table> <thead> <tr> <th class="text-left">Joueur</th> <th class="text-right">Score</th> </tr> </thead> <tbody> <tr> <td><h3>{{player.name}} #{{player.number}}</h3> <div> <span ng-click="audio.playQuestion(answer.question, answer.code)" ng-repeat="answer in player.answers" class="flag"> <md-tooltip md-direction="top"> {{ctrl.api.languageName(answer.code)}} {{answer.duration}}s </md-tooltip> <md-icon md-svg-src="images/icons/volume-high.svg"></md-icon> <span ng-class="{\'correct\': answer.correct, \'wrong\': answer.correct==0, \'unknown\': answer.correct==null}"></span><img ng-src="images/flags/{{answer.code}}.png"> </span> </div> </td> <td class="text-right"><h3>{{player.score||0}}</h3></td></tr> </tbody> </table> </div>'),a.put("views/search.html",'<md-card id="search-page"> <div> <md-toolbar> <div class="md-toolbar-tools"> <h2 class="md-toolbar-item">Résultats</h2> </div> </md-toolbar> <md-tabs> <md-tab label="LUNDI 20" md-on-select="ctrl.fetchDate(\'2015-07-20\')"></md-tab> <md-tab label="MARDI 21" md-on-select="ctrl.fetchDate(\'2015-07-21\')"></md-tab> <md-tab label="MERCREDI 22" md-on-select="ctrl.fetchDate(\'2015-07-22\')"></md-tab> <md-tab label="JEUDI 23" md-on-select="ctrl.fetchDate(\'2015-07-23\')"></md-tab> <md-tab label="VENDREDI 24" md-on-select="ctrl.fetchDate(\'2015-07-24\')"></md-tab> <md-tab label="SAMEDI 25" md-on-select="ctrl.fetchDate(\'2015-07-25\')"></md-tab> <md-tab label="DIMANCHE 26" md-on-select="ctrl.fetchDate(\'2015-07-26\')"></md-tab> </md-tabs> </div> <md-card-content ng-if="ctrl.teams.length > 0"> <md-input-container class="md-icon-float" flex> <label>Equipe</label> <md-icon md-svg-src="images/icons/magnify.svg"></md-icon> <input ng-model="ctrl.filter" type="text"> </md-input-container> <table id="teams"> <thead> <tr> <th class="text-left" ng-class="{\'sort-asc\': ctrl.orderBy == \'start_time\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'start_time\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'start_time\')">Heure</md-button></th> <th class="text-left" ng-class="{\'sort-asc\': ctrl.orderBy == \'team\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'team\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'team\')">Equipe</md-button></th> <th class="text-right" ng-class="{\'sort-asc\': ctrl.orderBy == \'num_players\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'num_players\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'num_players\')">Joueurs</md-button></th> <th class="text-right" ng-class="{\'sort-asc\': ctrl.orderBy == \'score_max\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'score_max\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'score_max\')">Score Totaux</md-button></th> <th class="text-right" ng-class="{\'sort-asc\': ctrl.orderBy == \'score_total\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'score_total\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'score_total\')">Score Max</md-button></th> </tr> </thead> <tbody> <tr ng-click="ctrl.showDetail(team.id)" ng-repeat="team in ctrl.teams | filter: {\'team\': ctrl.filter} | orderBy: (ctrl.reverse?\'-\':\'\') + ctrl.orderBy"> <td>{{team.start_time | date: \'HH:mm\'}}</td> <td>{{team.team}}</td> <td class="text-right">{{team.num_players}}</td> <td class="text-right">{{team.score_max}}</td> <td class="text-right">{{team.score_total}}</td> </tr> </tbody> <tfoot> <tr> <td colspan="5"><p>{{(ctrl.teams |filter: {\'team\': ctrl.filter}).length }} / {{ctrl.teams.length}} parties</p></td> </tr> </tfoot> </table> </md-card-content> <md-card-content ng-if="ctrl.teams.length == 0"> <h1 class="text-center">Aucune partie!</h1> </md-card-content> </md-card>')}]);