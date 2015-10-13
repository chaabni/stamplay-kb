angular.module("app").controller("AccountController", ["AccountService", "$scope", "$rootScope", function(AccountService, $scope, $rootScope) {

    $scope.login = function() {
        AccountService.login();
    }

    $scope.logout = function() {
        AccountService.logout();
    }

}])

angular.module("app").controller("HomeController", ["$scope", "$state", "QuestionService", function($scope, $state, QuestionService) {
    QuestionService.getQuestions().then(function(questions) {
        console.log(questions.instance);
        $scope.questionCollection = questions.instance;
    })
}]);

angular.module("app").controller("QuestionController", ["QuestionService", "$scope", "$rootScope", "$state", function(SolutionRequestService, $scope, $rootScope, $state) {

    $scope.newQuestion = function() {
        SolutionRequestService.newQuestion($scope.question).then(function(question) {
            Materialize.toast("Your question has been submitted successfully.", 5000);
            $state.go("Home");
        })
    }


}])
