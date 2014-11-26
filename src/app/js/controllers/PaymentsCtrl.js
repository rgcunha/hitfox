angular.module('PaymentsCtrl', []).controller('PaymentsCtrl', function($scope, $stateParams, $ionicModal, Account) {

	$scope.accountId = $stateParams.account_id;
	$scope.payments = Account.getTransfers($scope.accountId);
	$scope.payees = Account.getPayees($scope.accountId);
	//$scope.selectedPayee ={};
	$scope.newPayment = {};

	/*angular.forEach($scope.payments, function(payment) {
		payment.payee = Account.getPayeeFromTransfer($scope.accountId, payment.id);
	});*/


	$ionicModal.fromTemplateUrl('new_payment.html', {
		scope: $scope,
		animation: 'slide-in-up',
		focusFirstInput: true
	}).then(function(modal) {
		$scope.newPaymentModal = modal;
	});

	$scope.makePayment = function() {
		//$scope.newPayment.payee = $scope.selectedPayee.id;
		Account.createTransfer($scope.accountId, $scope.newPayment);
		$scope.newPayment = {};
		$scope.payments = Account.getTransfers($scope.accountId);
		/*angular.forEach($scope.payments, function(payment) {
			payment.payee = Account.getPayeeFromTransfer($scope.accountId, payment.id);
		});*/
		$scope.newPaymentModal.hide();
	};

});
