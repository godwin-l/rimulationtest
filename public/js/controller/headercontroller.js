angular.module('vgApp')
.controller('headercontroller', [
    '$scope','$state','localStorageService','$location','$uibModal','homeservice','$rootScope','Notification',
    function($scope,$state,localStorageService,$location,$uibModal,homeservice,$rootScope,Notification) {
      $scope.godiscussion=function(){

        $state.go('discussion');
      }
      $scope.home=function(){
$state.go('home');
 }
      $scope.goblog=function(){

        $state.go('blog');
      }
      $scope.gopeople=function(){

        $state.go('people');
      }
      $scope.logout = function() {
          //$state.go("signUp2");

          homeservice.logout(localStorage.getItem("userId"), localStorage.getItem("access_token")).then(function(result) {
            $rootScope.orgId = null;
            localStorage.clear();
            window.location.reload();
          });
        };
$scope.uploadimg = function() {
  homeservice.geturl().then(function(data) {
              $scope.logo= data.data.url
              console.log($scope.myCroppedImage);
  $scope.urltoFile($scope.myCroppedImage, data.data.name + '.jpg', 'image/jpeg')
    .then(function(file) {
      var buf = file;
      $.ajax({
        type: "PUT",
        data: buf,
        url: data.data.signed_request,
        processData: false,
        contentType: 'image/jpeg',
        success: function(data1) {
homeservice.profilepic($scope.logo).then(function(resp){
Notification.success("profile picture updated successfully");
window.location.reload();
})
        }.bind(this),
        error: function(xhr, status, err) {
          Notification.error("profile picture upload failed");
          $scope.newup = false;
        }.bind(this)
      });
    })
  return true;
})
}
$scope.myCroppedImage = '';
$scope.myFile = '';
$('#fileInput').change(function() {
  $scope.newup = true;
});
$scope.uploadnewprofile = function() {
  $scope.newup = true;
}

$scope.uploadFile = function(file) {
  if (file) {
    // ng-img-crop
    var imageReader = new FileReader();
    imageReader.onload = function(image) {
      $scope.$apply(function($scope) {
        $scope.myImage = image.target.result;
      });
    };
    $scope.newup = true;
    imageReader.readAsDataURL(file);
  }
};
$scope.urltoFile = function(url, filename, mimeType) {
  return (fetch(url)
    .then(function(res) {
      return res.arrayBuffer();
    })
    .then(function(buf) {
      return new File([buf], filename, {
        type: mimeType
      });
    })
  );
}

$scope.signup = function() {
    var dialogInst = $uibModal.open({
      templateUrl: url + 'html/signup.html',
      controller: 'signupcontroller',
      size: 'sm',
      resolve: {
      }
    });
    dialogInst.result.then(function(info) {
      window.location.reload();
    }, function(data) {
      if (data == 'cancel') {
      } else {
        window.location.reload();
      }
    });
}
$scope.login = function() {
    var dialogInst = $uibModal.open({
      templateUrl: url + 'html/login.html',
      controller: 'logincontroller',
      size: 'sm',
      resolve: {
      }
    });
    dialogInst.result.then(function(info) {
      window.location.reload();
    }, function(data) {
      if (data == 'cancel') {
      } else if(data == 'signup'){
        $scope.signup();
      }else{
window.location.reload();
      }
    });
}
$rootScope.login = function(info) {
    $rootScope.err=info;
    var dialogInst = $uibModal.open({
      templateUrl: url + 'html/login.html',
      controller: 'logincontroller',
      size: 'sm',
      resolve: {
      }
    });
    dialogInst.result.then(function(info) {
      $rootScope.err='';
      window.location.reload();
    }, function(data) {
      $rootScope.err='';
      if (data == 'cancel') {
      } else if(data == 'signup'){
        $scope.signup();
      }else{
window.location.reload();
      }
    });
}

    }]);
