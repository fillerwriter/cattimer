angular.module('timeDisplay', [])
  .directive('timeDisplay', [function() {
    return {
      restrict: 'E',
      scope: {
        duration: '='
      },
      bindToController: {
        duration: "="
      },
      controller: function($scope, $attrs) {
        var ctl = this;
        //this.duration = $scope.$eval($attrs.duration);
      },
      controllerAs: "tda",
      templateUrl: 'scripts/components/timeDisplay/time-display.html',
      link: function(scope, element, attrs, controller) {
        scope.$watch(function(theScope) {
          return theScope.duration.valueOf();
        }, function(newVal, oldVal) {
          var minutes = Math.abs(scope.duration.minutes());
          if (minutes < 10) {
            minutes = "0" + minutes;
          }

          var seconds = Math.abs(scope.duration.seconds());
          if (seconds < 10) {
            seconds = "0" + seconds;
          }

          var hours = scope.duration.hours();

          scope.display = hours + ":" + minutes + "." + seconds;
        });
      }
    };
  }]);