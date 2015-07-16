"use strict";angular.module("gestionairApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","angulartics","angulartics.google.analytics","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.analytics"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/score/:code",{templateUrl:"views/score.html",controller:"ScoreCtrl",controllerAs:"ctrl"}).when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl",controllerAs:"ctrl"}).otherwise({redirectTo:"/"})}]).config(["$mdThemingProvider",function(a){a.definePalette("arc",{50:"0098d8",100:"0098d8",200:"0098d8",300:"0098d8",400:"0098d8",500:"0098d8",600:"0098d8",700:"0098d8",800:"0098d8",900:"0098d8",A100:"0098d8",A200:"0098d8",A400:"0098d8",A700:"0098d8",contrastDefaultColor:"light",contrastDarkColors:void 0,contrastLightColors:void 0}),a.theme("default").primaryPalette("arc").accentPalette("green",{"default":"600"})}]).run(["$rootScope","$location","$timeout",function(a,b,c){a.$on("$routeChangeSuccess",function(){c(function(){b.hash()&&jQuery.smoothScroll({scrollTarget:"#"+b.hash(),scrollElement:jQuery("#scrollparent")})})})}]),angular.module("gestionairApp").controller("MainCtrl",["$location","api",function(a,b){this.api=b,this.showCode=function(){this.code&&(a.hash(""),a.path("/score/"+this.code))}}]),angular.module("gestionairApp").controller("ScoreCtrl",["$http","api",function(a,b){var c=this;c.api=b,b.getGame(10).success(function(a){c.game=a})}]),angular.module("gestionairApp").service("api",["$http",function(a){var b=this;b.languages=[],b.departments=[];var c="/api";a.get(c+"/departments").success(function(a){b.departments=a}),a.get(c+"/languages").success(function(a){b.languages=a}),b.getGame=function(b){return a.get(c+"/games/"+b)},b.fetchDate=function(b){return a.get(c+"/games?date="+b)},b.nextQuestion=function(b){return a.post(c+"/questions",b)},b.languageName=function(a){for(var c=0;c<b.languages.length;c++)if(b.languages[c].code===a)return b.languages[c].language},b.departmentName=function(a){for(var c=0;c<b.departments.length;c++)if(b.departments[c].number===a)return b.departments[c].name}}]),angular.module("gestionairApp").controller("SearchCtrl",["$location","api",function(a,b){var c=this;c.orderBy="start_time",c.reverse=!1,c.fetchDate=function(a){b.fetchDate(a).success(function(a){c.teams=a})},c.sort=function(a){a===c.orderBy?c.reverse=!c.reverse:c.orderBy=a},c.showDetail=function(b){a.path("/score/"+b)},c.fetchDate("2015-07-13")}]),angular.module("gestionairApp").controller("AudioCtrl",["$timeout","api",function(a,b){var c=this;c.currentAudio="",c.currentQuestion={},c.done=[],c.correctCount=0,c.nextQuestion=function(){if(b.departments.forEach(function(a){a.answer=!1}),c.currentQuestion.translations){var a=c.currentQuestion.translations[Math.floor(Math.random()*c.currentQuestion.translations.length)];c.playQuestion(c.currentQuestion.number,a.language),c.done.push(c.currentQuestion.number),c.gameState="answering"}else c.answerQuestion().success(function(){c.nextQuestion()})},c.answerQuestion=function(a){return c.player.stop(),c.gameState="evaluating",b.nextQuestion({answer:a,id:c.currentQuestion.number,done:c.done}).success(function(a){c.gameState="result",c.correct=a.correct,a.correct&&c.correctCount++,c.currentQuestion=a.next})},c.playQuestion=function(b,d){c.player.stop();var e=b+"-"+d;c.currentAudio===e?c.currentAudio="":(c.currentAudio=b+"-"+d,c.config.sources=[{src:"sounds/questions/"+c.currentAudio+".mp3",type:"audio/mpeg"}],a(function(){c.playing=!0,c.player.play()},100))},c.onPlayerReady=function(a){c.player=a},c.onCompletePlay=function(){c.playing=!1},c.config={sources:[],analytics:{category:"Videogular",label:"Main",events:{ready:!0,play:!0,pause:!0,stop:!0,complete:!0,progress:10}}}}]),angular.module("gestionairApp").run(["$templateCache",function(a){a.put("views/main.html",'<md-card id="play"> <img src="images/plan.1f870e17.gif" alt="plan"> <md-card-content> <h1>Jouer</h1> <p>Venez tester vos compétence de gestion et de langues du <strong>20 au 26 juillet 2015 @ PALÉO</strong></p> <h3>Entraînement</h3> <p>Ecouter un appel téléphonique et redirigez la personne vers le bon département.</p> <div layout="row" layout-align="space-around center"> <md-button aria-label="jouer" ng-disabled="audio.gameState==\'answering\'" class="md-accent md-raised" ng-click="audio.nextQuestion()">Jouer</md-button> <span flex></span> <p class="answer correct" ng-show="audio.gameState==\'result\' && audio.correct">Correct Bravo!</p> <p class="answer wrong" ng-show="audio.gameState==\'result\' && !audio.correct">Désolé faux!</p> <span flex></span> <p>Score {{audio.correctCount}} / {{audio.done.length}}</p> </div> <md-list> <md-list-item ng-disabled="audio.gameState!=\'answering\'" ng-repeat-start="dep in main.api.departments | orderBy: dep.number"> <md-checkbox aria-label="{{dep.name}}" ng-disabled="audio.gameState!=\'answering\'" ng-change="audio.answerQuestion(dep.number)" ng-model="dep.answer"></md-checkbox> {{dep.name}} </md-list-item> <md-divider ng-repeat-end ng-if="!$last"></md-divider> </md-list> </md-card-content> </md-card> <md-card id="score"> <img src="images/words.774a9baf.gif" alt="words"> <md-card-content> <h1>Résultats</h1> <p>Si tu as participé à l\'activité Gestion\'air durant le Paléo 2015, retrouve tes résultats en entrant le code figurant sur ton étiquette ou en scannant le QR-Code!</p> <form layout="row" ng-submit="main.showCode()"> <md-input-container class="md-icon-float" flex> <!-- Use floating label instead of placeholder --> <label>Code</label> <md-icon md-svg-src="images/icons/qrcode.831435b7.svg"></md-icon> <input ng-model="main.code" type="number"> </md-input-container> <md-button aria-label="afficher code" class="md-fab" aria-label="Eat cake"> <md-icon md-svg-src="images/icons/magnify.6cdd9cc8.svg"></md-icon> </md-button> </form> <p>Pas de code? Consulte <md-button aria-label="tableau des résultats" href="#/search" class="md-primary">le tableau de résultats</md-button></p> </md-card-content> </md-card> <md-card id="about"> <img src="images/team.480a68f8.png" alt="team"> <md-card-content> <h1>A propos</h1> <h2>Equipe</h2> <p>L\'équipe du projet est composée d\'étudiant-e-s des trois filières de la HEG Arc (business law [BL], économie d\'entreprise [EE] et informatique de gestion [IG]). Elle est accompagnée d\'un professeur et d\'un assistant.</p> <ul> <li>Boiziau Charlotte (étudiante EE, <em>scénographie</em>)</li> <li>Botha Julie (étudiante BL, <em>call center</em>)</li> <li>Cornu Jonathan (étudiant BL, <em>scénographie</em>)</li> <li>Dubois Mathieu (étudiant IG, <em>IT</em>)</li> <li>Duperret Kevin (étudiant EE, <em>scénographie</em>)</li> <li>Fernandes Vanessa (étudiante BL, <em>call center</em>)</li> <li>Gaspoz Cédric (professeur, <em>encadrement</em>)</li> <li>Herrera Alexis (étudiant EE, <em>call center</em>)</li> <li>Maliki Zana (étudiante EE, <em>call center</em>)</li> <li>Rosselet Antoine (assistant de recherche IG, <em>coordinateur</em>)</li> <li>Vuille Benoît (étudiant IG, <em>IT</em>)</li> </ul> <h2>Traducteurs / narrateurs</h2> <p>Les questions du call center sont traduites dans 10 langues. Les questions en allemand et anglais ont été créées dans le cadre des cours de langue de la HEG. Les autres langues ont été traduites et enregistrées par des étudiant-e-s bilingues de notre école.</p> <ul> <li>Barbosa Patricia (étudiant, <em>portugais</em>)</li> <li>Bashutkina Maria (adjointe scientifique, <em>russe</em>)</li> <li>Chaudhary Satya (étudiant, <em>népalais</em>)</li> <li>David Roxana (assistante de recherche, <em>roumain</em>)</li> <li>De Santo Alessio (adjoint scientifique, <em>italien</em>)</li> <li>Gualandris Aurea (étudiante, <em>italien</em>)</li> <li>Herrera Alexis (étudiant, <em>espagnol</em>)</li> <li>Ioudina Ksenia (étudiante, <em>russe</em>)</li> <li>Saadoon Havar (étudiant, <em>kurde</em>)</li> <li>Stojak Nikolina (étudiante, <em>croate</em>)</li> </ul> <h2>Musique originale</h2> <p>Toutes les musiques de Gestion\'air ont été créées spécialement pour l\'occasion par des professeurs et étudiants de l\'école.</p> <ul> <li>Ulysse Rosselet (professeur, <em>compositeur, paroles, chant</em>)</li> <li>Equipe de projet (<em>chant</em>)</li> </ul> <h2>Collaborations</h2> <p>Le projet a pu se réaliser grâce à la collaboration de nombreuses personnes qui nous ont accompagné durant tout ou partie du processus.</p> <ul> <li>Barbier Gérard (intendant, <em>encadrement construction du stand</em>)</li> <li>Ellis Sarah Main (professeure, <em>anglais</em>)</li> <li>Fritscher Boris (professeur, <em>développement simulateur & trouble-shooter</em>)</li> <li>Hug Priska (professeure, <em>allemand</em>)</li> <li>Staudacher Karin (professeure, <em>allemand</em>)</li> <li>Zadory Bertrand (professeur, <em>anglais</em>)</li> </ul> </md-card-content> </md-card>'),a.put("views/score.html",'<md-card id="scoreboard"> <md-toolbar> <div class="md-toolbar-tools"> <h2 class="md-toolbar-item"> Equipe: {{ctrl.game.team}} @ {{ctrl.game.start_time | date: \'yyyy-MM-dd HH:mm\'}} </h2> </div> </md-toolbar> <md-card-content> <p>Reécoute les questions en cliquant dessus.</p> <table> <thead> <tr> <th class="text-left">Rang</th> <th class="text-left">Joueur</th> <th class="text-right">Score</th> </tr> </thead> <tbody> <tr ng-repeat="player in ctrl.game.players | orderBy: \'-score\'"> <td><h3>{{$index +1}}</h3> </td> <td><h3>{{player.name}} ({{player.number}})</h3> <div> <span ng-click="audio.playQuestion(answer.question, answer.code)" ng-repeat="answer in player.answers" class="flag"> <md-tooltip md-direction="top"> {{ctrl.api.languageName(answer.code)}} {{answer.duration}}s </md-tooltip> <md-icon md-svg-src="images/icons/volume-high.0394b254.svg"></md-icon> <span ng-class="{\'correct\': answer.correct, \'wrong\': answer.correct==0}"></span><img ng-src="images/flags/{{answer.code}}.png"> </span> </div> </td> <td class="text-right"><h3>{{player.score||0}}</h3></td></tr> </tbody> </table> </md-card-content> </md-card>'),a.put("views/search.html",'<md-card id="search-page"> <div> <md-toolbar> <div class="md-toolbar-tools"> <h2 class="md-toolbar-item">Résultats</h2> </div> </md-toolbar> <md-tabs> <md-tab label="LUNDI 20" md-on-select="ctrl.fetchDate(\'2015-07-10\')"></md-tab> <md-tab label="MARDI 21" md-on-select="ctrl.fetchDate(\'2015-07-13\')"></md-tab> <md-tab label="MERCREDI 22" md-on-select="ctrl.fetchDate(\'2015-07-14\')"></md-tab> <md-tab label="JEUDI 23" md-on-select="ctrl.fetchDate(\'2015-07-15\')"></md-tab> <md-tab label="VENDREDI 24" md-on-select="ctrl.fetchDate(\'2015-07-16\')"></md-tab> <md-tab label="SAMEDI 25" md-on-select="ctrl.fetchDate(\'2015-07-17\')"></md-tab> <md-tab label="DIMANCHE 26" md-on-select="ctrl.fetchDate(\'2015-07-18\')"></md-tab> </md-tabs> </div> <md-card-content ng-if="ctrl.teams.length > 0"> <md-input-container class="md-icon-float" flex> <label>Equipe</label> <md-icon md-svg-src="images/icons/magnify.6cdd9cc8.svg"></md-icon> <input ng-model="ctrl.filter" type="text"> </md-input-container> <table id="teams"> <thead> <tr> <th class="text-left" ng-class="{\'sort-asc\': ctrl.orderBy == \'start_time\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'start_time\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'start_time\')">Heure</md-button></th> <th class="text-left" ng-class="{\'sort-asc\': ctrl.orderBy == \'team\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'team\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'team\')">Equipe</md-button></th> <th class="text-right" ng-class="{\'sort-asc\': ctrl.orderBy == \'num_players\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'num_players\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'num_players\')">Joueurs</md-button></th> <th class="text-right" ng-class="{\'sort-asc\': ctrl.orderBy == \'score_max\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'score_max\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'score_max\')">Score Totaux</md-button></th> <th class="text-right" ng-class="{\'sort-asc\': ctrl.orderBy == \'score_total\' && !ctrl.reverse, \'sort-desc\': ctrl.orderBy == \'score_total\' && ctrl.reverse}"><md-button ng-click="ctrl.sort(\'score_total\')">Score Max</md-button></th> </tr> </thead> <tbody> <tr ng-click="ctrl.showDetail(team.id)" ng-repeat="team in ctrl.teams | filter: {\'team\': ctrl.filter} | orderBy: (ctrl.reverse?\'-\':\'\') + ctrl.orderBy"> <td>{{team.start_time | date: \'HH:mm\'}}</td> <td>{{team.team}}</td> <td class="text-right">{{team.num_players}}</td> <td class="text-right">{{team.score_max}}</td> <td class="text-right">{{team.score_total}}</td> </tr> </tbody> </table> </md-card-content> <md-card-content ng-if="ctrl.teams.length == 0"> <h1 class="text-center">Aucune partie!</h1> </md-card-content> </md-card>')}]);