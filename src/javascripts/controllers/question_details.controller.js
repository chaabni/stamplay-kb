angular.module("app")
    .controller("QuestionDetailsController", ["QuestionService", "$scope", "$rootScope", "$state", "$stateParams", "$stamplay", function(QuestionService, $scope, $rootScope, $state, $stateParams, $stamplay) {

    jQuery('ul.tabs').tabs();

    if(!$stateParams.id) $state.go("Home");
    QuestionService.getQuestionDetails($stateParams.id).then(function(question) {
        $scope.question = question;
        $scope.comments = $scope.question.instance.actions.comments;
        if(question.instance.solution_id && question.instance.solution_id.instance){
            console.log("THinks there is a solution")
            $scope.question_solution = question.instance.solution_id;
            $scope.voteTotal = $scope.question_solution.instance.actions.votes.users_upvote.length - $scope.question_solution.instance.actions.votes.users_downvote.length;
        } else {
            console.log("doesnt")
        }
    })

    $scope.addSolution = function(solution, id) {
        $scope.processing_solution = true;
        QuestionService.addSolution(solution, id, $scope.question.instance.owner.email).then(function(res) {
            $scope.question_solution = res;
            $scope.voteTotal = $scope.question_solution.instance.actions.votes.users_upvote.length - $scope.question_solution.instance.actions.votes.users_downvote.length;
            $scope.solution_form = false;
            $scope.processing_solution = false;
            Materialize.toast("Solution has been added.", 2000)
        });
    }

    $scope.upvoteSolution = function(question) {
        if($rootScope.currentUser) {
            $scope.question_solution.upVote().then(function() {
                Materialize.toast("You found this helpful huh? Great!", 2000)
                $scope.voteTotal = $scope.question_solution.instance.actions.votes.users_upvote.length - $scope.question_solution.instance.actions.votes.users_downvote.length;
                $scope.$apply();
            }, function() {
                Materialize.toast("Sorry, only one vote per solution.", 2000)
            })
        } else {
            Materialize.toast("Please login to vote.", 2000)
        }
    }

    $scope.downvoteSolution = function(question) {
        if($rootScope.currentUser) {
            $scope.question_solution.downVote().then(function() {
                Materialize.toast("This wasn't helpful? We are sorry to hear that.", 2000)
                $scope.voteTotal = $scope.question_solution.instance.actions.votes.users_upvote.length - $scope.question_solution.instance.actions.votes.users_downvote.length;
                $scope.$apply();
            }, function() {
                Materialize.toast("Sorry, only one vote per solution.", 2000)
            })
        } else {
            Materialize.toast("Please login to vote.", 2000)
        }
    }

    $scope.addComment = function(question, comment) {
        var question_model = new $stamplay.Cobject("question").Model;
        question.comment(comment);
        question_model.fetch($scope.question.instance._id).then(function(){
            $scope.comments = question_model.getComments();
            $scope.new_comment = "";
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
