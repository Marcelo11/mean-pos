angular.module('PosApp')
.directive('angularautofocus', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.focus();
      }
    };
  });