angular.module("app", ["ui.router", "ngStamplay", "ngSanitize", "algoliasearch"])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("Home", {
            url: "/",
            templateUrl: "dist/templates/home.html",
            controller: "HomeController"
        })
        .state("New Request", {
            url: "/new",
            templateUrl: "dist/templates/new_question.html",
            controller: "QuestionController"
        })

    $urlRouterProvider.otherwise("/");
}])
.run(["$stamplay", "$rootScope", "AccountService", function($stamplay, $rootScope, AccountService) {
    Stamplay.init("stamplaykb");
    AccountService.currentUser().then(function(user) {
        if(user.isLogged()) {
            $rootScope.currentUser = user.instance;
        } else {
            $rootScope.currentUser = false;
        }
    });
}])
