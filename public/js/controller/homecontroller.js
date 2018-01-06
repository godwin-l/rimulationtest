angular.module('vgApp')
.controller('homecontroller', [
    '$scope','$state','localStorageService','$location','homeservice','localStorageService','$window','$rootScope','Notification',
    function($scope,$state,localStorageService,$location,homeservice,localStorageService,$window,$rootScope,Notification) {
      $scope.whitepaper= function() {
          $window.open('/whitepaper.pdf', "whitepaper");
      }
      $scope.rimuletoken=function(){
        $state.go('tokensale');
      };
      $scope.save=function(){

        if($scope.mail!==null && $scope.validateEmail($scope.mail)){
        homeservice.subscribe($scope.mail).then(function(resp){
          Notification.success("subscribed successfully");
        },function(err){
          Notification.error("error occured please trye again later");
        })
      }else if($scope.mail==null){
        $scope.emailstate = null;
      }
      }
      $scope.mailchange=function(){
        if ($scope.mail == null || $scope.mail.length==0) {
          $scope.emailstate = null;
        } else if ($scope.mail.length > 6 && $scope.validateEmail($scope.mail)) {
          homeservice.emailchange($scope.mail).then(function(resp) {
            $scope.exist = resp.data.data.exist;
            if ($scope.exist == false) {
              $scope.emailstate = "exist";
            } else {
              $scope.emailstate = "Not exist!";
            }
          })
        } else if ($scope.mail.length < 6 || $scope.mail.length == 6 || !$scope.validateEmail($scope.mail)) {
          $scope.emailstate = "Not exist!";
        }
      }
      $scope.validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
      $scope.events = [{
        badgeClass: 'success',
        badgeIconClass: 'fa-check',
        title: 'Pre ICO Activities',
        content1: 'Registered organisation as legal entity in 2015 - November',
        content2: 'Concept of Rimulation is drafted into four patents and filed in India and PCT',
        content3: 'Implementation of Virtualgodown -  platform to connect all inventories in the world through stockarea creation, logical inventory formation.',
        content4: 'Contract development for complete pre-sale and ICO ',
        content5: '',
        content6: '',
        content7: '',
        side:'left'
      },{
         badgeClass: 'danger',
         badgeIconClass: 'fa-exclamation',
         title: 'ICO Presale 1',
         content1: 'Rim Wallet - Wallet to securely hold rimules and cryptos.',
         content2: 'S-D - an AI based algorithm to map maker, taker and mover in rimulation. An algorithm that acts as a catalyst in V-tube.',
         content3: 'Rim Wallet - enhancement to store rimorders, leveraged value and other crypto assets',
         content4: 'Product chain - Network for self evolving product creation that can be tracked till root',
         content5: 'V-tube -  POC blockchain for digital orders in the rimulation',
         content6: 'Rimescrow - escrow mechanism to make rimulation sustainable.',
         content7: 'Integrating these concepts in virtualgodown platform.',
         side:'left'
       },{
          badgeClass: 'danger',
          badgeIconClass: 'fa-exclamation',
          title: 'ICO Presale 2',
          content1: 'Product chain extension to add more leaf nodes in the network.',
          content2: 'V-tube -  Private blockchain for digital orders in the rimulation. I',
          content3: 'Pool of collaborators - mechanism to collaborate an order to bring it to reality.',
          content4: 'Rimescrow - escrow mechanism enhanced to support leverage mechanism.',
          content5: '',
          content6: '',
          content7: '',
          side:'left'
        },{
           badgeClass: 'danger',
           badgeIconClass: 'fa-exclamation',
           title: 'ICO Presale 3',
           content1: 'Scaling rimulation and implementing rimulator across material flows.',
           content2: 'Implementing product manufacturing in rimulation',
           content3: 'Making stockarea programmable',
           content4: 'Make ICO tokens tradable in Exchanges.',
           content5: 'Licensing Rimulation interface to build rimulator. ',
           content6: '',
           content7: '',
           side:'left'
         },{
            badgeClass: 'danger',
            badgeIconClass: 'fa-exclamation',
            title: 'ICO',
            content1: 'Kick starting mega construction projects and space projects in rimulation.',
            content2: 'Enhancing the platform to simulate projects in rimulation. ',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            side:'left'
          }];
       $scope.animation = {};
       	$scope.animation.current = 'fadeInLeft';
       	$scope.animation.previous = $scope.animation.current;

       	$scope.animateElementIn = function($el) {
       		$el.removeClass('not-visible');
       		$el.addClass('animated ' + $scope.animation.current);
       	};

       	$scope.animateElementOut = function($el) {
       		$el.addClass('not-visible');
       		$el.removeClass('animated ' + $scope.animation.current);
       	};
  $rootScope.loading=false;
      if(window.innerHeight<window.innerWidth){
      document.getElementById("front-home-page").style.height = window.innerHeight + 'px';
      document.getElementById("front-home-page").style.width = window.innerWidth + 'px';
      document.getElementById("front-home-page").style.backgroundImage  = "url('/images/bg.jpg')";
      document.getElementById("front-home-page").style.backgroundSize   = "100% 100%";
      document.getElementById("front-home-font").style.fontSize   = "xx-large";
      $rootScope.widthinfo="normal";
    }else{
      document.getElementById("front-home-page").style.height = window.innerHeight + 'px';
      document.getElementById("front-home-page").style.width = window.innerWidth + 'px';
      document.getElementById("front-home-page").style.backgroundImage  = "url('/images/bg1.jpg')";
      document.getElementById("front-home-page").style.backgroundSize   = "100% 100%";
      document.getElementById("front-home-font").style.fontSize   = "large";
      $rootScope.widthinfo="small";
    }
    $rootScope.loading=false;
  }]);
