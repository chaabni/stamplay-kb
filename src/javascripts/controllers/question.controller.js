angular.module("app").controller("QuestionController", ["QuestionService", "$scope", "$rootScope", function(SolutionRequestService, $scope, $rootScope) {

    $scope.newQuestion = function() {
        SolutionRequestService.newQuestion($scope.question);
    }


}])
