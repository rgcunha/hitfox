angular.module('MainCtrl', []).controller('MainCtrl', function($scope, $state, Account) {

  Account.init();
  $scope.accounts = Account.get();

  $scope.accountDetails = function(id) {
      $state.go('account.balance', {account_id: id});
  };

  $scope.exit = function() {
		$state.go('home');
	};

});
