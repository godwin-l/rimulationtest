angular.module('vgApp')
.controller('discussioncontroller', [
    '$scope','localStorageService','$state','$location','localStorageService','discussionservice','$uibModal','$rootScope','Notification',
    function($scope,localStorageService,$state,$location,localStorageService,discussionservice,$uibModal,$rootScope,Notification) {
      $rootScope.loading=false;
/*      if($rootScope.widthinfo=='small' || window.innerHeight>window.innerWidth){
        document.getElementById("dis").style.marginRight = -100 + 'px';
        $('input[type=search]').style.marginRight = 200 + 'px';
      }*/
      $scope.init=function(){
        document.getElementById("discussionctrl").style.height = window.innerHeight + 'px';
        discussionservice.getdiscussions().then(function(response){
          $scope.topics=response.data.data
          $rootScope.loading=false;
             })
      }

      $scope.diffDate = function(date2){
        var date1 = new Date()
        var timeDiff = Math.abs(new Date(date2).getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var info=diffDays+" days"
        return info;
  };

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
      $scope.adddiscussion=function(){
        if($rootScope.user==true){
        var dialogInst = $uibModal.open({
          templateUrl: url + 'html/adddiscussion.html',
          controller: 'adddiscussioncontroller',
          size: 'md',
          resolve: {
          }
        });
        dialogInst.result.then(function(info) {
          window.location.reload();
        }, function(data) {
          if (data == 'cancel') {
          }else{
    $state.reload();
          }
        });
      }else{
        $rootScope.login("err");
      }
    }
  $scope.selectforum=function(id){
$state.go('forum',{Id:id});
  }
}
]);
