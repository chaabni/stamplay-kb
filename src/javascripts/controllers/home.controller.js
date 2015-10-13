angular.module("app").controller("HomeController", ["$scope", "$state", "QuestionService", function($scope, $state, QuestionService) {
    QuestionService.getQuestions().then(function(questions) {
        console.log(questions.instance);
        $scope.questionCollection = questions.instance;
    })
}]);
