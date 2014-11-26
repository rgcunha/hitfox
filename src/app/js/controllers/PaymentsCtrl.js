angular.module('PaymentsCtrl', []).controller('PaymentsCtrl', function($scope, $stateParams, $ionicModal, Account) {

	$scope.accountId = $stateParams.account_id;
	$scope.payments = Account.getTransfers($scope.accountId);
	$scope.payees = Account.getPayees($scope.accountId);
	$scope.newPayment = {};
	$scope.submitted = false;

	$ionicModal.fromTemplateUrl('new_payment.html', {
		scope: $scope,
		animation: 'slide-in-up',
		focusFirstInput: true
	}).then(function(modal) {
		$scope.newPaymentModal = modal;
	});

  $scope.submitForm = function(isValid) {
    $scope.submitted = true;
		if (isValid) {
			$scope.submitted = false;
      makePayment();
			$scope.newPaymentModal.hide();
		}
  };

	makePayment = function() {
		Account.createTransfer($scope.accountId, $scope.newPayment);
		$scope.newPayment = {};
		$scope.payments = Account.getTransfers($scope.accountId);
	};

	$scope.toggleDetails = function(payment) {
		if ($scope.isSelected(payment)) {
			$scope.selectedPayment = null;
		} else {
			$scope.selectedPayment = payment;
		}
	};

	$scope.isSelected = function(payment) {
		return $scope.selectedPayment === payment;
	};

});
