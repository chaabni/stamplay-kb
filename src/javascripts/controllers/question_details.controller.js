angular.module("app").controller("QuestionDetailsController", ["QuestionService", "$scope", "$rootScope", "$state", "$stateParams", function(QuestionService, $scope, $rootScope, $state, $stateParams) {
    if(!$stateParams.id) $state.go("Home");
    QuestionService.getQuestionDetails($stateParams.id).then(function(question) {
        $scope.question = question;
    })
}])
