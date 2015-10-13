angular.module("app").factory("QuestionService", ["$q", "$stamplay", function($q, $stamplay) {
    var question = $stamplay.Cobject("question").Model;
    var questionCollection = $stamplay.Cobject("question").Collection;
    return {
        newQuestion : function(details) {
            var q = $q.defer();
            question.set("title", details.title);
            question.set("body", details.body);
            question.save().then(function() {
                q.resolve(question.instance);
            })
            return q.promise;
        },
        getQuestions : function() {
            var q = $q.defer();
            questionCollection.populateOwner().fetch().then(function() {
                q.resolve(questionCollection);
            })
            return q.promise;
        }
    }
}]);
