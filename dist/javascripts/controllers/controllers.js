angular.module("app").controller("AccountController", ["AccountService", "$scope", "$rootScope", function(AccountService, $scope, $rootScope) {

    $scope.login = function() {
        AccountService.login();
    }

    $scope.logout = function() {
        AccountService.logout();
    }

}])

angular.module("app").controller("QuestionController", ["QuestionService", "$scope", "$rootScope", function(SolutionRequestService, $scope, $rootScope) {

    $scope.newQuestion = function() {
        SolutionRequestService.newQuestion($scope.question);
    }


}])
