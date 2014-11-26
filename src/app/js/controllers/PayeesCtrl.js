angular.module('PayeesCtrl', []).controller('PayeesCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, Account) {

	$scope.accountId = $stateParams.account_id;
	$scope.payees = Account.getPayees($scope.accountId)
	$scope.newPayee = {};
	$scope.submitted = false;

  $ionicModal.fromTemplateUrl('new_payee.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.newPayeeModal = modal;
  });

	$scope.submitForm = function(isValid) {
		$scope.submitted = true;
		if (isValid) {
			$scope.submitted = false;
			createPayee();
			$scope.newPayeeModal.hide();
		}
	};

	createPayee = function() {
		Account.createPayee($scope.accountId, $scope.newPayee);
		$scope.newPayee = {};
		$scope.payees = Account.getPayees($scope.accountId)
	};

  $scope.deletePayee = function(id) {
    var dropConfirmationPopup = $ionicPopup.confirm({
      title: 'Confirmation',
      template: '<p>Are you sure you want to delete this payee?</p>'
    });
    dropConfirmationPopup.then(function(res) {
      if (res) {
        Account.deletePayee($scope.accountId, id);
        $scope.payees = Account.getPayees($scope.accountId);
      }
    });
	};

});
