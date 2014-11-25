angular.module('CustomerService', []).factory('Customer', ['$window', function($window) {

  return {

    reset : function() {
      var customers = [
        { "id": "1", "name": "Bill Gates" },
        { "id": "2", "name": "Steve Jobs" },
        { "id": "3", "name": "Michael Jackson" }
      ]
      $window.localStorage['customers'] = JSON.stringify(customers);
    },

    get : function() {
      return JSON.parse($window.localStorage['customers'] || '[]');
    }
  };

}]);
