'use strict';

/**
 *@Author Rajasekar
 *
 * @Description Dashboard service
 */


vgApp.factory('dashboardService', ['$http', function($http) {

  var sdo = {
    isAuthenticated: function() {
      var promise = $http({
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'userId': localStorage.getItem('userId'),
          'access_token': localStorage.getItem('access_token')
        },
        url: domainURL + 'api/token/checktoken'
      }).then(function(data) {
        return data
      }, function(data) {
        return data;
      });
      return promise;
    },
    getUserDetails: function() {
      var promise = $http({
        url: domainURL + 'api/secured/users/getuser',
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(data) {

        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },
    geturl: function() {
      var promise = $http({
        url: domainURL + 'api/secured/users/geturl',
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
}]);
