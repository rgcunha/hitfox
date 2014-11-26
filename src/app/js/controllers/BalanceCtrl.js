angular.module('BalanceCtrl', []).controller('BalanceCtrl', function($scope, $stateParams, Account) {
		var accountId = $stateParams.account_id;
		$scope.balance = Account.getById(accountId).balance;
});
