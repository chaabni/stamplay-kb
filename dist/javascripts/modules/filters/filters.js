angular.module("app").filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        console.log(text);
        return $sce.trustAsHtml(text);
    };
}]);
