angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: '/hitfoxapp/views/home.html'
        })

        .state('account', {
            url: '/account/:account_id',
            abstract: true,
            templateUrl: '/hitfoxapp/views/account.html'
        })

        .state('account.balance', {
            url: '/balance',
            views: {
              'balance-tab': {
                templateUrl: '/hitfoxapp/views/balance.html',
                controller: 'BalanceCtrl'
              }
            }
        })

        .state('account.payees', {
            url: '/payees',
            views: {
              'payees-tab': {
                templateUrl: '/hitfoxapp/views/payees.html',
                controller: 'PayeesCtrl'
              }
            }
        })

        .state('account.payments', {
            url: '/payments',
            views: {
              'payments-tab': {
                templateUrl: '/hitfoxapp/views/payments.html',
                controller: 'PaymentsCtrl'
              }
            }
        });

    $urlRouterProvider.otherwise('/');

}]);
