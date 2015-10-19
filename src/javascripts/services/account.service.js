angular.module("app").factory("AccountService", ["$q", "$stamplay", function($q, $stamplay) {
    var user = $stamplay.User().Model;
    return {
        login : function() {
            var q = $q.defer();
            // SWITCH TO GITHUB
            user.login('github').then(function() {
                q.resolve(user.instance);
            })
            return q.promise;
        },
        logout : function() {
            var q = $q.defer();
            // SWITCH TO GITHUB
            user.logout('github');
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
