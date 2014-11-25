angular.module('AccountService', []).factory('Account', ['$window', function($window) {

	return {

		init : function() {
			var accounts = [
				{ 'id': 1, 'name': 'Bill Gates', 'IBAN': 'CH93 0076 2011 6238 5295 7', 'balance': 1000,
					'payees': [],
					'transfers': []
				},
				{
					'id': 2, 'name': 'Steve Jobs', 'IBAN': 'CH93 0076 2011 6238 5295 8', 'balance': 5000,
					'payees': [],
					'transfers': []
				}];
			$window.localStorage['accounts'] = JSON.stringify(accounts);
		},

		get : function() {
			return JSON.parse($window.localStorage['accounts'] || '[]');
		},

		create : function(accountData) {
			var self = this;
			var accounts = self.get();
			accounts.push(customerData);
			$window.localStorage['accounts'] = JSON.stringify(accounts);
		},

		getPayees : function(id) {
			var accounts = JSON.parse($window.localStorage['accounts'] || '[]');
			for (i=0;i<accounts.length;i++) {
				if (accounts[i].id == id) {
					return accounts[i].payees;
				}
			}
			return [];
		},

		createPayee : function(id, payeeData) {
			var self = this;
			var accounts = self.get();
			for (i=0;i<accounts.length;i++) {
				if (accounts[i].id == id) {
					accounts[i].payees.push(payeeData);
					$window.localStorage['accounts'] = JSON.stringify(accounts);
					break;
				}
			}
		},

		deletePayee : function(id, payeeId) {
			var self = this;
			var accounts = self.get();
			for (i=0;i<accounts.length;i++) {
				if (accounts[i].id == id) {
					for (j=0;j<accounts[i].payees.length;j++) {
						if (accounts[i].payees[j].id == payeeId) {
          		accounts[i].payees.splice(j, 1);
							$window.localStorage['accounts'] = JSON.stringify(accounts);
							break;
						}
					}
					break;
				}
			}
		},

		getTransfers : function(id) {
			var accounts = JSON.parse($window.localStorage['accounts'] || '[]');
			for (i=0;i<accounts.length;i++) {
				if (accounts[i].id == id) {
					return accounts[i].transfers;
				}
			}
			return [];
		},

		createTransfer : function(id, transferData) {
			var self = this;
			var accounts = self.get();
			for (i=0;i<accounts.length;i++) {
				if (accounts[i].id == id) {
					accounts[i].transfers.push(transferData);
					$window.localStorage['accounts'] = JSON.stringify(accounts);
					break;
				}
			}
		},

	};

}]);
