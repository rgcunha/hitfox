angular.module('BalanceCtrl', []).controller('BalanceCtrl', function($scope, $stateParams) {
		var accountId = $stateParams.account_id;
		$scope.balance = $scope.accounts[accountId - 1].balance;
});
