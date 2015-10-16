angular.module("app").controller("CreateQuestionController", ["QuestionService", "$scope", "$rootScope", "$state", function(QuestionService, $scope, $rootScope, $state) {
    $scope.newQuestion = function() {
        $scope.question.owner_email = $rootScope.currentUser.email;
        QuestionService.newQuestion($scope.question).then(function(question) {
            Materialize.toast("Your question has been submitted successfully.", 5000);
            $state.go("Home");
        })
    }
    $scope.tinymceOptions = {
        plugins : 'advlist autolink link image lists charmap print preview',
        theme: "modern",
        skin: 'light',
        min_height: 200
    };
}])
