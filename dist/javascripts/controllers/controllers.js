angular.module("app").controller("AccountController", ["AccountService", "$scope", "$rootScope", "$stateParams", function(AccountService, $scope, $rootScope, $stateParams) {

    $scope.login = function() {
        AccountService.login();
    }

    $scope.logout = function() {
        AccountService.logout();
    }
}])

angular.module("app").controller("CreateQuestionController", ["QuestionService", "$scope", "$rootScope", "$state", function(QuestionService, $scope, $rootScope, $state) {
    $scope.newQuestion = function() {
        if($rootScope.currentUser.email) {
            $scope.question.owner_email = $rootScope.currentUser.email;
        }
        QuestionService.newQuestion($scope.question).then(function(question) {
            Materialize.toast("Your question has been submitted successfully.", 5000);
            $state.go("Home");
        })
    }
    $scope.tinymceOptions = {
        plugins : 'advlist autolink link image lists charmap print preview',
        theme: "modern",
        skin: 'light',
        min_height: 200,
        cleanup : true,
        format: "html"
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

    $scope.htmlToPlaintext = function(text) {
        // Remove html, & html entities from hits
        return text ? String(text).replace(/<[^>]+>/gm, '').replace(/&[^\s]*;/gm, ' ') : '';
    }

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
