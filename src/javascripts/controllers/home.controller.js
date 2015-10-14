angular.module("app")
    .controller("HomeController", ["$scope", "$state", "$sce", "QuestionService", function($scope, $state, $sce, QuestionService) {

    QuestionService.getQuestions().then(function(questions) {
        $scope.questionCollection = questions.instance;
    })

    $scope.searchQuestions = function() {
        QuestionService.searchQuestions($scope.question_query).then(function(questions) {
            $scope.searchResults = questions.hits;
        })
    }

    $scope.htmlToPlaintext = function(text) {
        // Remove html, & html entities from hits
        return text ? String(text).replace(/<[^>]+>/gm, '').replace(/&[^\s]*;/gm, ' ') : '';
    }

}]);
