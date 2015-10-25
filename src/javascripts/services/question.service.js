angular.module("app").factory("QuestionService", ["$q", "$stamplay", "algolia", "$rootScope", function($q, $stamplay, algolia, $rootScope) {
    var client = algolia.Client('7TMV8F22UN', 'b5e5aa05c764aa1718bc96b793078703');
    var index = client.initIndex('KBQUESTIONS');
    return {
        newQuestion : function(details) {
            var question = $stamplay.Cobject("question").Model;
            var q = $q.defer();
            question.set("title", details.title);
            question.set("body", details.body);
            if(details.owner_email) {
                question.set("owner_email", details.owner_email);
            }
            question.save().then(function() {
                q.resolve(question.instance);
            })
            return q.promise;
        },
        getQuestions : function() {
            var questionCollection = $stamplay.Cobject("question").Collection;
            var q = $q.defer();
            questionCollection.populate().limit(25).populateOwner().fetch().then(function() {
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
            var question = $stamplay.Cobject("question").Collection;
            var solution_owner = $stamplay.User().Model;
            var q = $q.defer();
            question.equalTo("_id", id).populate().populateOwner().fetch().then(function() {
                var _question = question.instance[0];
                console.log(_question)

                if(question.instance[0].instance.solution_id) {

                    var _id = _question.instance.solution_id[0].owner;
                    solution_owner.fetch(_id).then(function() {
                        var solution = new $stamplay.Cobject("solution").Model;
                        solution.instance = _question.instance.solution_id[0];
                        _question.instance.solution_id = solution;
                        _question.instance.solution_id.instance.owner = solution_owner.instance;
                        console.log("resolves with solution")
                        q.resolve(_question);
                    }, function(err) { console.log(err) })
                } else {
                    console.log("resolves without solution")

                    q.resolve(question.instance[0]);
                }
            })
            return q.promise;
        },
        addSolution : function(description, id, owner_email) {
            var q = $q.defer();
            var solution = $stamplay.Cobject("solution").Model;
            var question = $stamplay.Cobject("question").Model;
            solution.set("description", description);
            if(owner_email) {
                solution.set("question_owner", owner_email);
            }
            solution.save().then(function() {
                question.fetch(id).then(function() {
                    question.set("solution_id", solution.instance._id);
                    question.save().then(function() {
                        solution.fetch(question.instance.solution_id[0]).then(function() {
                            q.resolve(solution);
                        })
                    })
                })
            })
            return q.promise;
        }
    }
}]);
