angular.module('PaymentsCtrl', []).controller('PaymentsCtrl', function($scope, $stateParams, $ionicModal, Account) {

	$scope.accountId = $stateParams.account_id;
	$scope.payments = Account.getTransfers($scope.accountId)
	$scope.newPayment = {};

	$ionicModal.fromTemplateUrl('new_payment.html', {
		scope: $scope,
		animation: 'slide-in-up',
		focusFirstInput: true
	}).then(function(modal) {
		$scope.newPaymentModal = modal;
	});

	$scope.makePayment = function() {
		Account.createTransfer($scope.accountId, $scope.newPayment);
		$scope.newPayment = {};
		$scope.payments = Account.getTransfers($scope.accountId);
		$scope.newPaymentModal.hide();
	};

});
