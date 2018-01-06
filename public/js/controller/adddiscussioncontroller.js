vgApp.controller('adddiscussioncontroller', ['$scope', '$uibModalInstance','discussionservice','$state','$rootScope','Notification','localStorageService', function($scope, $uibModalInstance,discussionservice,$state,$rootScope,Notification,localStorageService) {
  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.adddiscussion=function(discussion){
   discussionservice.adddiscussion(discussion,localStorage.getItem("userId")).then(function(response){
     $uibModalInstance.dismiss('success');
})
}
$scope.autoExpand = function(e) {
    var element = typeof e === 'object' ? e.target : document.getElementById(e);
    var scrollHeight = element.scrollHeight ; // replace 60 by the sum of padding-top and padding-bottom
    element.style.height = scrollHeight + "px";
  };

}]);
