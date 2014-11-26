angular.module('AccountCtrl', []).controller('AccountCtrl', function($scope, $state) {
  $scope.exit = function() {
    $state.go('accounts');
  };
});
