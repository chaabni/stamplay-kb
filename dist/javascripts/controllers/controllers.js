angular.module("app").controller("AccountController", ["AccountService", "$scope", "$rootScope", function(AccountService, $scope, $rootScope) {

    $scope.login = function() {
        AccountService.login();
    }

    $scope.logout = function() {
        AccountService.logout();
    }

}])

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
                $scope.searchResults = questions.hits;
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

angular.module("app")
    .controller("QuestionDetailsController", ["QuestionService", "$scope", "$rootScope", "$state", "$stateParams", "$stamplay", function(QuestionService, $scope, $rootScope, $state, $stateParams, $stamplay) {

    if(!$stateParams.id) $state.go("Home");
    QuestionService.getQuestionDetails($stateParams.id).then(function(question) {
        $scope.question = question;
        $scope.comments = question.instance.actions.comments;
        $scope.voteTotal = question.instance.actions.votes.total - question.instance.actions.votes.users_downvote.length;

    })

    $scope.addSolution = function(solution, id) {
        QuestionService.addSolution(solution, id).then(function(res) {
            $scope.question = res;
            $scope.solution_form = false;
            Materialize.toast("Solution has been added.", 2000)
        });
    }

    $scope.upvoteSolution = function(question) {
        if($rootScope.currentUser) {
            question.upVote().then(function() {
                Materialize.toast("You found this helpful huh? Great!", 2000)
                $scope.voteTotal = question.instance.actions.votes.total - question.instance.actions.votes.users_downvote.length;                $scope.$apply();
            }, function() {
                Materialize.toast("Sorry, only one vote per solution.", 2000)
            })
        } else {
            Materialize.toast("Please login to vote.", 2000)
        }
    }

    $scope.downvoteSolution = function(question) {
        if($rootScope.currentUser) {
            question.downVote().then(function() {
                Materialize.toast("This wasn't helpful? We are sorry to hear that.", 2000)
                $scope.voteTotal = question.instance.actions.votes.total - question.instance.actions.votes.users_downvote.length;
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

angular.module("app").controller("SlackInviteController", ["$scope", "$stamplay", function($scope, $stamplay) {
    var invite = new $stamplay.Cobject('invite').Model;
    $scope.request_invite = function() {
        invite.set("email", $scope.email);
        invite.save().then(function (response) {
            Materialize.toast("We will send an invite to, " + $scope.email + " shortly, thank you.", 3000)
        }, function(err){
            Materialize.toast(err, 2000)
        });
    }
}])
