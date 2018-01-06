'use strict';

vgApp.factory('blogservice', ['$http', function($http) {

  var sdo = {
    getblogs: function() {
          var promise = $http({
            url: url + 'api/blog/getblogs',
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
        getblog: function(Id) {
              var promise = $http({
                url: url + 'api/blog/getblog?blogId='+Id,
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
                    url: url + 'api/secured/blog/addcomment',
                    method: "post",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    data:{
                      blogId:Id,
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
    addblog: function(content,shortdesc,name) {
      var promise = $http({
        url: url + 'api/secured/blog/addblog',
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "content": content,
          "shortdesc": shortdesc,
          "name":name
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
