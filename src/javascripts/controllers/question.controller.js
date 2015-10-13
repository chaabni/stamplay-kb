angular.module("app").controller("QuestionController", ["QuestionService", "$scope", "$rootScope", "$state", function(SolutionRequestService, $scope, $rootScope, $state) {

    $scope.newQuestion = function() {
        SolutionRequestService.newQuestion($scope.question).then(function(question) {
            Materialize.toast("Your question has been submitted successfully.", 5000);
            $state.go("Home");
        })
    }


}])
