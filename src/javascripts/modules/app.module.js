angular.module("app", ["ui.router","ngAnimate", "angular-velocity", "ngStamplay", "ngSanitize",  "algoliasearch", "ui.tinymce"])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("Home", {
            url: "/",
            templateUrl: "dist/templates/home.html",
            controller: "HomeController"
        })
        .state("New Request", {
            url: "/question/new",
            templateUrl: "dist/templates/new_question.html",
            controller: "CreateQuestionController"
        })
        .state("Question Details", {
            url: "/question/details/:id",
            templateUrl: "dist/templates/question_details.html",
            controller: "QuestionDetailsController"
        })
    $urlRouterProvider.otherwise("/");
}])
.run(["$stamplay", "$rootScope", "AccountService", function($stamplay, $rootScope, AccountService) {

  if(window.location.search.substring(1).split("=")[1]) {
    window.localStorage.setItem("testing", window.location.search.substring(1).split("=")[1]);
    history.pushState({ title : ""}, "Home", "#/")
  }

    AccountService.currentUser().then(function(user) {
        if(user.isLogged()) {
            $rootScope.currentUser = user.instance;
            // console.log(user)
        } else {
            $rootScope.currentUser = false;
            // console.log(false)
        }

    });
    $(".button-collapse").sideNav();

}])
