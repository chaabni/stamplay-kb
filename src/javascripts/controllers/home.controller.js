angular.module("app").controller("HomeController", ["$scope", "$state", "QuestionService", function($scope, $state, QuestionService) {
    QuestionService.getQuestions().then(function(questions) {
        console.log(questions.instance);
        $scope.questionCollection = questions.instance;
    })

    $scope.searchQuestions = function() {
        QuestionService.searchQuestions($scope.question_query).then(function(questions) {
            $scope.searchResults = questions.hits;
            console.log(questions);
        })
    }

}]);
