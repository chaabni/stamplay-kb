angular.module("app")
    .controller("HomeController", ["HomeService", function(HomeService){
        var test = HomeService.test;
        console.log(test);
    }])
