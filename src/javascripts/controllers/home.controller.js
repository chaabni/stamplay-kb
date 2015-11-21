angular.module("app")
    .controller("HomeController", ["$scope", "$state", "$sce", "$stamplay", "QuestionService", function($scope, $state, $sce, $stamplay, QuestionService) {

    QuestionService.getQuestions().then(function(questions) {
        if(questions.instance.length) {
            $scope.noResults = false;
            $scope.questionCollection = questions.instance;
        } else {
            $scope.questionCollection = [];
            $scope.noResults = true;
        }
    })

    $scope.searchQuestions = function() {
        QuestionService.searchQuestions($scope.question_query).then(function(questions) {
            if(questions.hits.length) {
               questions.hits.forEach(function(item, index, arr) {
                  QuestionService.getOwner(item.owner).then(function(owner) {
                     $scope.searchResults[index].owner = owner;
                  })
               })
             $scope.noSearchResults = false;
             $scope.searchResults = [];
             var refresh = setTimeout(function() {
                 $scope.searchResults = questions.hits;
             }, 100)
            } else {
                $scope.noSearchResults = true;
                $scope.searchResults = [];
            }

        })
    }


   $scope.removeHTMLTags = function(html){
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      var htmltext = tmp.innerText;
      var text = htmltext.replace(/<[^>]*>/g, ' ')
      return text;

   }

}]);
