angular.module("app")
    .controller("QuestionDetailsController", ["QuestionService", "$scope", "$rootScope", "$state", "$stateParams", "$stamplay", function(QuestionService, $scope, $rootScope, $state, $stateParams, $stamplay) {

    if(!$stateParams.id) $state.go("Home");
    QuestionService.getQuestionDetails($stateParams.id).then(function(question) {
        $scope.question = question;
        $scope.comments = question.instance.actions.comments;
        $scope.voteTotal = question.instance.actions.votes.users_upvote.length - question.instance.actions.votes.users_downvote.length;

    })

    $scope.addSolution = function(solution, id) {
        QuestionService.addSolution(solution, id).then(function(res) {
            $scope.question = res;
            $scope.solution_form = false;
            Materialize.toast("Solution has been added.", 2000)
        });
    }

    $scope.upvoteSolution = function(question) {
        var vote = question.instance.actions.votes.users.indexOf($rootScope.currentUser._id);
        if(vote > -1) {
            Materialize.toast("You already voted!", 1000)
        } else {
            question.upVote().then(function() {
                Materialize.toast("You found this helpful huh? Great!", 2000)
                $scope.voteTotal = $scope.voteTotal + 1;
                $scope.$apply();
            })
        }
    }

    $scope.downvoteSolution = function(question) {
        var vote = question.instance.actions.votes.users.indexOf($rootScope.currentUser._id);
        if(vote > -1) {
            Materialize.toast("You already voted!", 1000)
        } else {
            question.downVote().then(function() {
                Materialize.toast("This wasn't helpful, we are sorry to hear that?", 2000)
                $scope.voteTotal = $scope.voteTotal - 1;
                $scope.$apply();
            })
        }

    }

    $scope.addComment = function(question, comment) {
        var question_model = new $stamplay.Cobject("question").Model;
        question.comment(comment);
        question_model.fetch($scope.question.instance._id).then(function(){
            $scope.comments = question_model.getComments();
            $scope.$apply();
            Materialize.toast("Comment Posted.", 1000)
        });
    }

    $scope.tinymceOptions = {
          plugins : 'advlist autolink link image lists charmap print preview',
          theme: "modern",
          skin: 'light',
          min_height: 300
    };



}])
