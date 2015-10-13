angular.module("app").factory("QuestionService", ["$q", "$stamplay", "algolia", function($q, $stamplay, algolia) {
    var question = $stamplay.Cobject("question").Model;
    var user = $stamplay.User().Model;
    var questionCollection = $stamplay.Cobject("question").Collection;
    var client = algolia.Client('7TMV8F22UN', 'b5e5aa05c764aa1718bc96b793078703');
    var index = client.initIndex('KBQUESTIONS');
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
        },
        searchQuestions : function(query) {
            var q = $q.defer();
            index.search(query)
                .then(function searchSuccess(content) {
                    q.resolve(content)
                }, function searchFailure(err) {
                    q.reject();
                });
                return q.promise;
        },
        getQuestionDetails : function(id) {
            var q = $q.defer();
            question.fetch(id).then(function() {
                user.fetch(question.instance.owner).then(function() {
                    question.instance.owner = user.instance;
                    q.resolve(question);
                })
            })
            return q.promise;
        }
    }
}]);
