angular.module('PayeesCtrl', []).controller('PayeesCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, Account) {

	$scope.accountId = $stateParams.account_id;
	$scope.payees = Account.getPayees($scope.accountId)
	$scope.newPayee = {};

  $ionicModal.fromTemplateUrl('new_payee.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.newPayeeModal = modal;
  });

	$scope.createPayee = function() {
		Account.createPayee($scope.accountId, $scope.newPayee);
		$scope.newPayee = {};
		$scope.payees = Account.getPayees($scope.accountId)
		$scope.newPayeeModal.hide();
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
