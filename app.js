(function (ng) {
  'use strict';

  ng.module('infiniteScrollDemo', [
    'ngRoute',
    'ezInfiniteScroll',
    'infiniteScrollDemo.controllers'
  ]).config(['$routeProvider', '$compileProvider',
      function($routeProvider, $compileProvider) {
        $routeProvider.when('/', {templateUrl: 'view.html', controller: 'MainController'});
        $routeProvider.otherwise({redirectTo: '/'});
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
      }
  ]);

  function ItemGenerator() {
    var colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'lightblue'];
    var teams = ['Mets', 'Braves', 'Marlins', 'Nationals', 'Phillies',
        'Dodgers', 'Rockies', 'Giants', 'Diamondbacks', 'Brewers', 'Pirates'];
    var index = 0;
    this.copyColors = function() {
      return ng.copy(colors);
    };

    function next(randomizeColors) {
      var colorIndex = randomizeColors ? randomInt(colors.length) : index % colors.length;
      var item = {
        color: colors[colorIndex],
        index: index,
        team: teams[index % teams.length]
      };
      index++;
      return item;
    }
    this.next = next;
    function randomInt(min, max) {
      if (typeof min === 'undefined' && typeof max === 'undefined') {
          max = 9007199254740991;
          min = -max;
      }
      if (typeof max === 'undefined') {
          max = min;
          min = 0;
      }
      return Math.floor(Math.random() * (max - min)) + min;
    }

  }

  ng.module('infiniteScrollDemo.controllers', [])
    .controller('MainController', ['$scope', '$http', '$timeout',
      function($scope, $http, $timeout) {
          var generator = new ItemGenerator();
          $scope.colorOptions = generator.copyColors().map(function(color){
            return {
              'color': color,
              'selected': true
            };
          });
          $scope.pageSize = 5;
          $scope.items = [];
          $scope.generationDelay = 500;
          $scope.cap = 100;
          $scope.fetchNextItems = function() {
              var pageSize = $scope.pageSize;
              $timeout(function(){
                for (var i = 0; i < pageSize && $scope.items.length < $scope.cap; i++) {
                  $scope.items.push(generator.next($scope.randomizeColors));
                }
              }, $scope.generationDelay);
              $scope.noMoreItems = $scope.items.length >= $scope.cap;
          };
          $scope.filters = {
              byColor: function(item) {
                  for (var i in $scope.colorOptions) {
                    if (item.color === $scope.colorOptions[i].color) {
                      return $scope.colorOptions[i].selected;
                    }
                  }
                  console.warn(item.color + " not in options list");
              }
          };
      }
  ]);

})(angular);
