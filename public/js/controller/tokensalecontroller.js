angular.module('vgApp')
.controller('tokensalecontroller', [
    '$scope','$state','localStorageService','$location','homeservice','localStorageService','$window','$rootScope',
    function($scope,$state,localStorageService,$location,homeservice,localStorageService,$window,$rootScope) {
      $scope.whitepaper= function() {
          $window.open('/pdf/whitepaper.pdf', "whitepaper");
      }
      $scope.alllabels = ["To kick start rimulation", "pre-sale 1", "pre-sale 2", "pre-sale 3"];
        $scope.alldata = [350, 50, 50, 50];
        $scope.allcolors=['#4c81bf',"#000","#FFF","#ffffff"];
        $scope.phase1labels = ["Development", "Marketing", "Legal"];
            $scope.phase1data = [70, 20, 10];
            $scope.phase1colors=["#000","#FFF","#ffffff"];
            $scope.phase2labels = ["Not decided"];
                $scope.phase2data = [100];
                $scope.phase2colors=["#4c81bf"];
                $scope.phase3labels = ["Not decided"];
                    $scope.phase3data = [100];
                    $scope.phase3colors=["#4c81bf"];
        $scope.alloptions = {
    legend: {
      display: true,
      position: 'bottom',
      labels:{
        fontColor: '#000'
      }
    }
  }
  $scope.phase1options = {
legend: {
display: true,
position: 'bottom',
labels:{
  fontColor: '#ffffff'
}
}
}
$scope.phase2options = {
legend: {
display: true,
position: 'bottom',
labels:{
  fontColor: '#4c81bf'
}
}
}
$scope.phase3options = {
legend: {
display: true,
position: 'bottom',
labels:{
  fontColor: '#ffffff'
}
}
}
      $rootScope.loading=false;
      if(window.innerHeight<window.innerWidth){
      document.getElementById("front-home-page").style.height = window.innerHeight/1.5 + 'px';
      document.getElementById("front-home-page").style.width = window.innerWidth + 'px';
      document.getElementById("front-home-page").style.backgroundImage  = "url('/images/cover1.png')";
      document.getElementById("front-home-page").style.backgroundSize   = "100% 100%";
      document.getElementById("front-home-font").style.fontSize   = "xx-large";
      $rootScope.widthinfo="normal";
    }else{
      document.getElementById("front-home-page").style.height = window.innerHeight + 'px';
      document.getElementById("front-home-page").style.width = window.innerWidth + 'px';
      document.getElementById("front-home-page").style.backgroundImage  = "url('/images/post-R.jpg')";
      document.getElementById("front-home-page").style.backgroundSize   = "100% 100%";
      document.getElementById("front-home-font").style.fontSize   = "large";
      $rootScope.widthinfo="small";
    }
    $rootScope.loading=false;
  }]);
