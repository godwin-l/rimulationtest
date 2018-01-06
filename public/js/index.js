
var vgApp=angular.module('vgApp', [
    'ui.router','ui.bootstrap','LocalStorageModule','datatables','ui-notification','ngImgCrop','textAngular','ngSanitize','angularjs-autogrow','alexjoffroy.angular-loaders','chart.js','angular-timeline','angular-scroll-animate'
]);
vgApp.config(
    function($stateProvider,$urlRouterProvider,$locationProvider) {
  $stateProvider
   .state('home', {
     url:'/',
     templateUrl: 'html/home.html',
     controller: 'homecontroller'
   }).state('discussion', {
     url:'/discussion',
     templateUrl: 'html/discussion.html',
     controller: 'discussioncontroller'
   }).state('tokensale', {
     url:'/rimules',
     templateUrl: 'html/tokensale.html',
     controller: 'tokensalecontroller'
   }).state('forum', {
     url:'/discussion/:Id',
     templateUrl: 'html/forum.html',
     controller: 'forumcontroller'
   }).state('blog', {
     url:'/blog',
     templateUrl: 'html/blog.html',
     controller: 'blogcontroller'
   }).state('people', {
     url:'/people',
     templateUrl: 'html/people.html',
     controller: 'peoplecontroller'
   }).state('bloginfo', {
     url:'/blog/:Id',
     templateUrl: 'html/bloginfo.html',
     controller: 'bloginfocontroller'
   });
   $urlRouterProvider
       .otherwise('/');

    $locationProvider.html5Mode({
    enabled: true
    });
});

vgApp.run(['$rootScope', '$state', 'homeservice', '$q', '$location', function($rootScope, $state, homeservice, $q, $location) {
  $rootScope.url = url;
  $rootScope.$on('$stateChangeStart',function(){
    $rootScope.stateIsLoading = true;
});
$rootScope.$on('$stateChangeSuccess',function(){
    $rootScope.stateIsLoading = false;
});
  if (localStorage.getItem('userId') == null || localStorage.getItem('userId') == undefined || localStorage.getItem('access_token') == undefined || localStorage.getItem('access_token') == null) {

  } else {
    homeservice.isAuthenticated().then(function(data) {
      if(data.data.code=="200"){
        $rootScope.user=true;
      homeservice.getUserDetails().then(function(result) {
        $rootScope.isAdmin = true;
        $rootScope.fullName = result.data.data.fullName;
        $rootScope.profilePic = result.data.data.profilePic;
        $rootScope.userId = result.data.data._id;
      }, function(err) {
        $state.go('home');
      });
    }else{
      $rootScope.user=false;
    }
    }, function(err) {
      $state.go('home');
    });
  }
}]);
vgApp.config(['NotificationProvider', function(NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 2000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'left',
    positionY: 'top'
  });
}]);
vgApp.config(['ChartJsProvider',function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
}]);
vgApp.config(['$urlRouterProvider', '$httpProvider', function($urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push(['$injector', '$state', '$q', '$rootScope', function($injector, $state, $q, $rootScope) {


    return {
      request: function(config) {
        var canceler = $q.defer();
        config.timeout = canceler.promise;
        $rootScope.er = false
        if (config.url.indexOf('api/') > -1) {
          if (config.url.indexOf('oauth/token') > -1 || config.url.indexOf('users/adduser') > -1 || config.url.indexOf('users/forgetPassword') > -1 || config.url.indexOf('users/resetPassword') > -1 || config.url.indexOf('token/checktoken') > -1) {
            //config.url = systemService.getCurrentInstance().authServiceName + config.url;
            config.url = config.url;

          } else {
            var access_token = localStorage.getItem('access_token');
            var userId = localStorage.getItem('userId');
            if (access_token == null) {
              //canceler.resolve();
            } else {
              //config.url = systemService.getCurrentInstance().serviceName + config.url;
              config.url = config.url;
              config.headers.Authorization = "Bearer " + access_token;
            }
          }
        }

        return config;
      },
      responseError: function(response) {
        if (response) {}

        return $q.reject(response);
      }
    }

  }]);
}]);

var url = window.location.origin + "/";
