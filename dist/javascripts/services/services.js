angular.module("app").factory("AccountService", ["$q", "$stamplay", function($q, $stamplay) {
    var user = $stamplay.User().Model;
    return {
        login : function() {
            var q = $q.defer();
            // SWITCH TO GITHUB
            user.login('facebook').then(function() {
                q.resolve(user.instance);
            })
            return q.promise;
        },
        logout : function() {
            var q = $q.defer();
            // SWITCH TO GITHUB
            user.logout('facebook');
            return q.promise;
        },
        currentUser : function() {
            var q = $q.defer();
            user.currentUser().then(function() {
                q.resolve(user);
            })
            return q.promise;
        }
    }
}])

angular.module("app")
    .factory("HomeService", [function() {
        return {
            test : "Hello!"
        }
}])

angular.module("app").factory("QuestionService", ["$q", "$stamplay", "algolia", function($q, $stamplay, algolia) {
    var question = $stamplay.Cobject("question").Model;
    var questionCollection = $stamplay.Cobject("question").Collection;
    var client = algolia.Client('7TMV8F22UN', 'b5e5aa05c764aa1718bc96b793078703');
    var index = client.initIndex('KBQUESTIONS');
    index.clearIndex(function(err, content) {
      console.log(content);
    });
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
        }
    }
}]);
