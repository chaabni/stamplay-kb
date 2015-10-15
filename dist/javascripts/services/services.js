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

angular.module("app").factory("QuestionService", ["$q", "$stamplay", "algolia", function($q, $stamplay, algolia) {
    var client = algolia.Client('7TMV8F22UN', 'b5e5aa05c764aa1718bc96b793078703');
    var index = client.initIndex('KBQUESTIONS');
    return {
        newQuestion : function(details) {
            var question = $stamplay.Cobject("question").Model;
            var q = $q.defer();
            question.set("title", details.title);
            question.set("body", details.body);
            question.save().then(function() {
                q.resolve(question.instance);
            })
            return q.promise;
        },
        getQuestions : function() {
            var questionCollection = $stamplay.Cobject("question").Collection;
            var q = $q.defer();
            questionCollection.populateOwner().limit(25).fetch().then(function() {
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
            var question = $stamplay.Cobject("question").Model;
            var user = $stamplay.User().Model;
            var q = $q.defer();
            question.fetch(id).then(function() {
                user.fetch(question.instance.owner).then(function() {
                    question.instance.owner = user.instance;
                    q.resolve(question);
                })
            })
            return q.promise;
        },
        addSolution : function(solution, id) {
            var question = $stamplay.Cobject("question").Model;
            var q = $q.defer();
            question.fetch(id).then(function() {
                question.set("solution", solution);
                question.save().then(function(){
                    console.log(question.instance);
                    q.resolve(question);
                }, function(err) {
                    console.log(err);
                })
            })
            return q.promise;
        }
    }
}]);
