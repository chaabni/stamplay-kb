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
