angular.module('AccountService', []).factory('Account', ['$window', function($window) {

	return {

		// Returns highest Id from array of elements
		getHighestId : function(arr) {
			var highest = 0;
			angular.forEach(arr, function(e) {
				if (e.id > highest)
					highest = e.id;
			});
			return highest;
		},

		// ACCOUNTS
		//************

		// Initial data
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

		// Get all accounts from LocalStorage
		get : function() {
			return JSON.parse($window.localStorage['accounts'] || '[]');
		},

		// Get specific account by ID
		getById : function(id) {
			var self = this;
			var accounts = self.get();
			for (i=0;i<accounts.length;i++) {
				if (accounts[i].id == id) {
					return accounts[i];
				}
			}
			return {};
		},

		// Add new account to LocalStorage
		create : function(accountData) {
			var self = this;
			var accounts = self.get();
			accounts.push(customerData);
			$window.localStorage['accounts'] = JSON.stringify(accounts);
		},

		// Update new account in LocalStorage
		update : function(id, accountData) {
			var self = this;
			var accounts = self.get();
			for (i=0;i<accounts.length;i++) {
				if (accounts[i].id == id) {
					accounts[i] = accountData;
					$window.localStorage['accounts'] = JSON.stringify(accounts);
				}
			}
		},


		// PAYEES
		//********

		// Get all payees from selected account
		getPayees : function(id) {
			var self = this;
			var account = self.getById(id);
			return account.payees || [];
		},

		// Get specific payee by id from selected account
		getPayeeById : function(id, payeeId) {
			var self = this;
			var payees = self.getPayees(id);
			for (i=0;i<payees.length;i++) {
				if (payees[i].id == payeeId) {
					return payees[i];
				}
			}
			return {};
		},

		// Add new payee to selected account
		createPayee : function(id, payeeData) {
			var self = this;
			var account = self.getById(id);
			payeeData.id = self.getHighestId(account.payees) + 1;
			account.payees.push(payeeData);
			self.update(id, account);
		},

		// Delete existing payee from selected account
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

		// TRANSFERS
		//************

		// Get all transfers for selected account
		getTransfers : function(id) {
			var self = this;
			var account = self.getById(id);
			angular.forEach(account.transfers, function(transfer) {
				transfer.payee = self.getPayeeById(id, transfer.payee);
			});
			return account.transfers || [];
		},

		//Get specific transfer for selected account
		getTransferById : function(id, transferId) {
			var self = this;
			var transfers = self.getTransfers(i);
			for (i=0;i<transfers.length;i++) {
				if (transfers[i].id == transferId) {
					return transfers[i];
				}
			}
			return {};
		},

		// Add new transfer to selected account
		createTransfer : function(id, transferData) {
			var self = this;
			var account = self.getById(id);
			transferData.id = self.getHighestId(account.transfers) + 1;
			account.balance = account.balance - transferData.amount;
			account.transfers.push(transferData);
			self.update(id, account);
		}

	};

}]);
