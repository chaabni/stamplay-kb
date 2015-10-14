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
        $scope.question = question;
    })

    $scope.addSolution = function(solution, id) {
        console.log(id);
        QuestionService.addSolution(solution, id).then(function(res) {
            console.log(res);
        });
    }

    $scope.upvoteSolution = function(question) {
        question.upVote().then(function() {
            $scope.question.instance.actions.votes.total = question.instance.actions.votes.total
        })
    }

    $scope.downvoteSolution = function(question) {
        question.downVote().then(function() {
            console.log($scope.question.instance.actions.votes.total);
            console.log(question.instance.actions.votes.total)
        })
    }

}])
