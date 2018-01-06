vgApp.controller('logincontroller', ['$scope', '$uibModalInstance','homeservice','$state','$rootScope','Notification','localStorageService', function($scope, $uibModalInstance,homeservice,$state,$rootScope,Notification,localStorageService) {
  $scope.exit = function() {
    console.log("close");
    $uibModalInstance.dismiss('cancel');
  };
  $rootScope.loading=false;
  $scope.forgetpassword="false";
  $scope.namechange=function(){
  if($scope.email == null){
    $scope.nameerror=true;
  }else{
    $scope.nameerror=false;
  }
  }
  $scope.mailchange=function(){
  if($scope.mail == null){
    $scope.mailerror=true;
  }else{
    $scope.mailerror=false;
  }
  }
  $scope.emailchange=function(){
  if($scope.email == null){
    $scope.emailerror=true;
  }else{
    $scope.emailerror=false;
  }
  }
  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.login=function(){
    $scope.forgetpassword=false;
  }
  $scope.signup=function(){
    $uibModalInstance.dismiss('signup');
  }
  $scope.passwordchange=function(){
  if($scope.password == null){
    $scope.passworderror=true;
  }else{
    $scope.passworderror=false;
  }
  }
  var accessToken = localStorage.getItem("access_token");
  var userId = localStorage.getItem("userId");
  $scope.init = function() {
    if (localStorage.getItem('userId') == null || localStorage.getItem('orgId') == undefined || localStorage.getItem('userId') == undefined || localStorage.getItem('access_token') == undefined || localStorage.getItem('access_token') == null) {} else {
      $http({
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'userId': userId,
          'access_token': accessToken
        },
        url:url + 'api/token/checktoken'
      }).then(function(data) {
        $rootScope.info = null;
        $state.go('home');
        $rootScope.loading=false;
      }, function(xhr, status, err) {});
    }
    if ($rootScope.error == 404) {
      $scope.errormessage = "Requested URL is not available";
    } else if ($rootScope.error > 500) {
      $scope.errormessage = "Error occured in Server please try again after some time";
    }
  };
  $scope.forgetPassword=function(){
    $scope.forgetpassword="true";
  }
  $scope.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  $scope.validatepassword = function(password) {
    var re =   /^[A-Za-z]\w{7,14}$/;
    return re.test(password);
  }
$scope.sendotp=function(){
  $scope.emailchange();
  if($scope.email!==null && $scope.validateEmail($scope.email) ){
  homeservice.forgetpassword($scope.email).then(function(response){
    if(response.data.code!=='200'){
      $scope.emailerror=true;
    }else{
      $scope.forgetpassword="otp";
      $scope.emailerror=false;
    }
  },function(err){
    Notification.error("Cannot able to send otp");
  })
}else{
  $scope.emailerror=true;
}
}
$scope.verifyotp=function(){
  if($scope.otp!==null){
  homeservice.verifyToken($scope.otp).then(function(response){
    if(response.data.data.valid==true){
    $scope.forgetpassword="password";
    $scope.otperror=false;
  }else{
    $scope.otperror=true;
  }
  },function(err){
    $scope.otperror=true;
  })}
}
$scope.changepassword=function(){
  if($scope.password!==null && $scope.validatepassword($scope.password)){
    if($scope.password===$scope.conformpassword){
      $scope.mismatch=true;
    }else{
  homeservice.resetpassword($scope.otp,$scope.password).then(function(response){
    $scope.forgetpassword="false";
    $scope.mismatch=false;
  },function(err){
$scope.mismatch=true;
  })
}
}
}
  $scope.close = function() {
    $rootScope.errormessage = null;
  };
  $scope.page = false;

  $scope.fnAuthenticateUser = function() {
    $scope.namechange();
    $scope.passwordchange();
    if($scope.email!==null || $scope.password!==null){
    // Calling authentication Service here with userName and Password
    $rootScope.loading=false;
    homeservice.authenticateUser($scope.email.toLowerCase(), $scope.password).then(function(data) {
      localStorage.setItem("access_token", data.data.token);
      localStorage.setItem("userId", data.data.userId);
      homeservice.getUserDetails().then(function(result) {
        if (localStorageService.isSupported) {
          if (!data.data.token) {
            $rootScope.loading=false;
            Notification.error('Invalid Username/Password');
          } else {
            $rootScope.loading=false;
            $rootScope.fullName = result.data.data.fullName;
            $rootScope.profilePic = result.data.data.profilePic;
            $rootScope.userId = result.data.data._id;
            $rootScope.org = result.data.data.org;
            localStorage.setItem("orgId", result.data.data.org[0].organisationId._id);
            $rootScope.orgId = result.data.data.org[0].organisationId._id;
            $rootScope.orgname = $rootScope.org[0].organisationId.organisationId;
            $rootScope.orgstatus = $rootScope.org[0].organisationId.status;
            $uibModalInstance.dismiss('success');
          }
        } else {
          Notification.error('Invalid Username/Password');
        }
        if (result.data.data.status == "pendingstock") {
          $rootScope.userstatus = "pending";
        }
      }, function(err) {
        $scope.access = false;
        $scope.loading = false;
      });

    }).catch(function(error) {
      Notification.error('Invalid Username/Password');

    });
  };
}
}]);
