angular.module("app").controller("SlackInviteController", ["$scope", "$stamplay", function($scope, $stamplay) {
    var invite = new $stamplay.Cobject('invite').Model;
    $scope.request_invite = function() {
        invite.set("email", $scope.email);
        invite.save().then(function (response) {
            Materialize.toast("We will send an invite to, " + $scope.email + " shortly, thank you.", 3000)
        }, function(err){
            Materialize.toast(err, 2000)
        });
    }
}])
