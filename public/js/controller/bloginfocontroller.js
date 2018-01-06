angular.module('vgApp')
.controller('bloginfocontroller', [
    '$scope','localStorageService','$stateParams','blogservice','$state','$rootScope',
    function($scope,localStorageService,$stateParams,blogservice,$state,$rootScope) {
      $rootScope.loading=false;
      blogservice.getblog($stateParams.Id).then(function(response){
          $scope.name=$stateParams.Id,
          $scope.Id=response.data.data._id;
          $scope.createdOn=response.data.data.createdOn;
          $scope.content=response.data.data.content;
          $scope.owner=response.data.data.owner;
          $scope.comments=response.data.data.comments;
          $rootScope.loading=false;
        })
        $scope.parsedate=function(dtstr) {

          // replace anything but numbers by spaces
          dtstr = dtstr.replace(/\D/g," ");

          // trim any hanging white space
          dtstr = dtstr.replace(/\s+$/,"");

          // split on space
          var dtcomps = dtstr.split(" ");

          // not all ISO 8601 dates can convert, as is
          // unless month and date specified, invalid
          if (dtcomps.length < 3) return "invalid date";
          // if time not provided, set to zero
          if (dtcomps.length < 4) {
            dtcomps[3] = 0;
            dtcomps[4] = 0;
            dtcomps[5] = 0;
          }

          // modify month between 1 based ISO 8601 and zero based Date
          dtcomps[1]--;

          var convdt = new
        Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));

          return convdt.toUTCString();
        }


              $scope.addblog=function(){
        blogservice.addblog($scope.content,$scope.shortdesc,$scope.name).then(function(response){
        $state.reload();
        })
              }
  $scope.addcomment=function(comment){
    if(comment!==null){
   blogservice.addcomment($scope.Id,comment).then(function(response){
    $state.reload();
})
}
  }

  $scope.diffDate = function(date2){
    var date1 = new Date()
    var timeDiff = Math.abs(new Date(date2).getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var info=diffDays+" days"
    return info;
};
}
]);
