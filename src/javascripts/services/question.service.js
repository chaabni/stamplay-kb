angular.module("app").factory("QuestionService", ["$q", "$stamplay", function($q, $stamplay) {
    var question = $stamplay.Cobject("question").Model;
    return {
        newQuestion : function(details) {
            var q = $q.defer();
            question.set("title", details.title);
            question.set("body", details.body);
            question.save().then(function() {
                console.log(question.instance);
            })
        }
    }
}]);
