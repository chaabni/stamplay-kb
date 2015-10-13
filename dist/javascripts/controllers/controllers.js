angular.module("app").controller("AccountController", ["AccountService", "$scope", "$rootScope", function(AccountService, $scope, $rootScope) {

    $scope.login = function() {
        AccountService.login();
    }

    $scope.logout = function() {
        AccountService.logout();
    }

}])

angular.module("app").controller("CreateQuestionController", ["QuestionService", "$scope", "$rootScope", "$state", function(QuestionService, $scope, $rootScope, $state) {
    $scope.newQuestion = function() {
        QuestionService.newQuestion($scope.question).then(function(question) {
            Materialize.toast("Your question has been submitted successfully.", 5000);
            $state.go("Home");
        })
    }
}])

angular.module("app").controller("HomeController", ["$scope", "$state", "QuestionService", function($scope, $state, QuestionService) {
    QuestionService.getQuestions().then(function(questions) {
        // console.log(questions.instance);
        $scope.questionCollection = questions.instance;
    })

    $scope.searchQuestions = function() {
        QuestionService.searchQuestions($scope.question_query).then(function(questions) {
            $scope.searchResults = questions.hits;
            // console.log(questions);
        })
    }

}]);

angular.module("app").controller("QuestionDetailsController", ["QuestionService", "$scope", "$rootScope", "$state", "$stateParams", function(QuestionService, $scope, $rootScope, $state, $stateParams) {
    if(!$stateParams.id) $state.go("Home");
    QuestionService.getQuestionDetails($stateParams.id).then(function(question) {
        $scope.questionDetails = question;
    })
}])
