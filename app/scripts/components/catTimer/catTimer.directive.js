angular.module('catTimer', ['timeDisplay'])
  .directive('catTimer', [function() {
    return {
      transclude: true,
      restrict: 'E',
      template: "<div ng-transclude></div>",
      scope: {},
      controller: [function() {}],
      controllerAs: 'ctc',
      link: function(scope, element, attrs, controller, transclude) {
        controller.duration = moment.duration(24, 'hours');
        setInterval(function() {
          controller.duration = controller.duration.subtract(1, 'second');
          setStyle();
          scope.$apply();
        }, 1000);

        var startBackgroundColor = {
          r: 0,
          g: 0,
          b: 0
        };

        var endBackgroundColor = {
          r: 255,
          g: 0,
          b: 0
        };

        var startTextColor = {
          r: 153,
          g: 153,
          b: 153
        };

        var endTextColor = {
          r: 255,
          g: 255,
          b: 255
        };

        var currentBackgroundColor = startBackgroundColor;
        var currentTextColor = startTextColor;

        var convertToHex = function(color) {
          return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
        };

        var setStyle = function() {
          if (controller.duration.asHours() < 1) {
            currentBackgroundColor = endBackgroundColor;
          } else {
            currentBackgroundColor = startBackgroundColor;
          }

          if (controller.duration.asHours() < 1) {
            currentTextColor = endTextColor;
          } else {
            currentTextColor = startTextColor;
          }

          element.css('background', convertToHex(currentBackgroundColor));
          element.css('color', convertToHex(currentTextColor));
        };

        scope.resetTimer = function() {
          controller.duration = moment.duration(24, 'hours');
        };

        window.setTime = function(newTime) {
          controller.duration = moment.duration(newTime);
        };

        var mc = new Hammer(element[0]);
        mc.on("tap press", function(ev) {
          scope.resetTimer();
        });
      }
    };
  }]);