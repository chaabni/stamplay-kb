angular.module("app", ["ui.router"])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("Home", {
            url: "/",
            templateUrl: "dist/templates/home.html",
            controller: "HomeController"
        })

    $urlRouterProvider.otherwise("/");
}])
