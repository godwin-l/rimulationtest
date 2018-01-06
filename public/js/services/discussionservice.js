'use strict';

vgApp.factory('discussionservice', ['$http', function($http) {

  var sdo = {
    getdiscussions: function() {
          var promise = $http({
            url: url + 'api/discussion/getdiscussions',
            method: "get",
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
        getdiscussion: function(Id) {
              var promise = $http({
                url: url + 'api/discussion/getdiscussion?discussionId='+Id,
                method: "get",
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
            addcomment: function(Id,data) {
                  var promise = $http({
                    url: url + 'api/secured/discussion/addcomment',
                    method: "post",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    data:{
                      discussionId:Id,
                      comment:data
                    }
                  }).then(function(data) {
                    return data;

                  }, function(data) {
                    return data;

                  });
                  return promise;
                },
    // Service for authenticating user
    adddiscussion: function(name,owner) {
      var promise = $http({
        url: url + 'api/secured/discussion/adddiscussion',
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "name": name,
          "owner": owner
        }

      }).then(function(data) {
        return data;

      }, function(err) {
        return err;

      });

      return promise;
    }
  }
  return sdo;
  }]);
