angular.module("app").controller("AccountController", ["AccountService", "$scope", "$rootScope", "$stateParams", function(AccountService, $scope, $rootScope, $stateParams) {

    $scope.login = function() {
        AccountService.login();
    }

    $scope.logout = function() {
        AccountService.logout();
    }
}])
