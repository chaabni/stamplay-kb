angular.module("app").factory("AccountService", ["$q", "$stamplay", function($q, $stamplay) {
    var user = $stamplay.User().Model;
    return {
        login : function() {
            // SWITCH TO GITHUB
            user.login('google')
        },
        logout : function() {
            // SWITCH TO GITHUB
            user.logout('google');
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
