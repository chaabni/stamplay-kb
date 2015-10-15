angular.module("app").controller("SlackInviteController", ["$scope", "$stamplay", function($scope, $stamplay) {
    var slack_invite_hook = new Stamplay.Webhook('slack invite requests');
    $scope.request_invite = function() {
        slack_invite_hook.post({ email : $scope.email}).then(function (response) {
            Materialize.toast("We will send an invite to, " + $scope.email + " shortly, thank you.", 3000)
        }, function(err){
            Materialize.toast(err, 2000)
        });
    }
}])
