vgApp.controller('signupcontroller', ['$scope', '$uibModalInstance','homeservice','$state','$rootScope','Notification','localStorageService','$uibModal', function($scope, $uibModalInstance,homeservice,$state,$rootScope,Notification,localStorageService,$uibModal) {
  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.login = function() {
  $state.go('login')

}
// Register user function calling here!
var accessToken = localStorage.getItem("access_token");
var userId = localStorage.getItem("userId");
if (accessToken !== null) {
  homeservice.isAuthenticated().then(function(data) {
  }, function(err) {})
}
$scope.validatepassword = function(password) {
  var re =   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return re.test(password);
}
$scope.viewTerms = function(data, tradeSourceId) {
  var dialogInst = $uibModal.open({
    templateUrl: url + '/html/terms.html',
    controller: 'termsController',
    size: 'lg'
    //windowClass: 'large-modal-terms'
  });
  dialogInst.result.then(function() {}, function() {});
}
$scope.namechange=function(){
if($scope.fullName == null){
  $scope.nameerror=true;
}else{
  $scope.nameerror=false;
}
}
$scope.passwordchange=function(){
if($scope.userPassword == null){
  $scope.passworderror=null;
}else if($scope.validatepassword($scope.userPassword)){
  $scope.passworderror=false;
}else{
  $scope.passworderror=true;
}
}
$scope.emailchange = function() {
  if ($scope.email == null || $scope.email.length == undefined) {
    $scope.emailstate = null;
  } else if ($scope.email.length > 6 && $scope.validateEmail($scope.email)) {
    homeservice.emailchange($scope.email).then(function(resp) {
      $scope.exist = resp.data.data.exist;
      if ($scope.exist == false) {
        $scope.emailstate = "exist";
      } else {
        $scope.emailstate = "Not exist!";
      }
    })
  } else if ($scope.email.length < 6 || $scope.email.length == 6 || !$scope.validateEmail($scope.email)) {
    $scope.emailstate = "Not exist!";
  }
}
$scope.validateEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


// $scope.viewPrivacy=function(data,tradeSourceId){
//   var dialogInst = $uibModal.open({
//                 templateUrl: '/views/dashboard/viewPrivacy.html',
//                 size: 'lg'
//                         });
//                 dialogInst.result.then(function() {
//                             }, function () {
//                             });
// }



$scope.fnRegisterUser = function() {
  $scope.namechange();
  $scope.passwordchange();
  $scope.data = {
    firstName: $scope.firstName,
    lastName: $scope.lastName,
    fullName: $scope.fullName,
    userName: $scope.email,
    password: $scope.userPassword
  };
  //$state.go("signUp2");
  if ($scope.emailstate == "exist" && $scope.fullName!==null && $scope.userPassword!==null && $scope.validatepassword($scope.userPassword)) {
    homeservice.registerUser($scope.data).then(function(result) {
      homeservice.authenticateUser($scope.email.toLowerCase(), $scope.userPassword).then(function(data) {
        localStorage.clear();
        localStorage.setItem("access_token", data.data.token);
        localStorage.setItem("userId", data.data.userId);
        homeservice.getUserDetails().then(function(result) {
          if (localStorageService.isSupported) {
            if (!data.data.token) {
              Notification.error('Invalid Username/Password');
            } else {

              $rootScope.fullName = result.data.data.fullName;
              $rootScope.profilePic = result.data.data.profilePic;
              $rootScope.userId = result.data.data._id;
              $rootScope.org = result.data.data.org;
              localStorage.setItem("orgId", result.data.data.org[0].organisationId._id);
              $rootScope.orgId = result.data.data.org[0].organisationId._id;
              $rootScope.orgname = $rootScope.org[0].organisationId.organisationId
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

      }, function(err) {
        Notification.error(err);
      });
    }, function(err) {
      Notification.error("Error! User Not added");
    });
  } else {

  }
};
}]);
vgApp.controller('termsController', ['$uibModalInstance', '$scope', function($uibModalInstance, $scope) {
  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
}]);
