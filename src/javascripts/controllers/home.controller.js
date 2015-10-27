angular.module("app")
    .controller("HomeController", ["$scope", "$state", "$sce", "QuestionService", function($scope, $state, $sce, QuestionService) {

    QuestionService.getQuestions().then(function(questions) {
        if(questions.instance.length) {
            $scope.noResults = false;
            $scope.questionCollection = questions.instance;
        } else {
            $scope.questionCollection = [];
            $scope.noResults = true;
        }
    })

    $scope.searchQuestions = function() {
        QuestionService.searchQuestions($scope.question_query).then(function(questions) {
            if(questions.hits.length) {
                $scope.noSearchResults = false;
                $scope.searchResults = [];
                var refresh = setTimeout(function() {
                    $scope.searchResults = questions.hits;
                }, 100)
            } else {
                $scope.noSearchResults = true;
                $scope.searchResults = [];
            }

        })
    }

    $scope.htmlToPlaintext = function(text) {
        // Remove html, & html entities from hits
        return text ? String(text).replace(/<[^>]+>/gm, '').replace(/&[^\s]*;/gm, ' ') : '';
    }

}]);
