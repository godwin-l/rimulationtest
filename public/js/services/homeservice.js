'use strict';

vgApp.factory('homeservice', ['$http', function($http) {

  var sdo = {
    logout: function(userId, access_token) {
          var promise = $http({
            url: url + 'api/secured/token/logout',
            method: "get",
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              "userId": userId,
              "access_token": access_token
            }
          }).then(function(data) {
            return data;

          }, function(data) {
            return data;

          });
          return promise;
        },
    // Service for authenticating user
    authenticateUser: function(userName, password) {
      var promise = $http({
        url: url + 'api/token/login',
        method: "post",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          "username": userName,
          "password": password,
          "client_id": "$vgodown1",
          "client_secret": "grnklnio576543hyjvbk",
          "grant_type": "password"
        }

      }).then(function(data) {
        return data;

      }, function(err) {
        return err;

      });

      return promise;
    },
    geturl: function() {
      var promise = $http({
        url: url + 'api/secured/users/geturl',
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
      registerUser: function(data) {
      var promise = $http({
        url: url + 'api/users/adduser',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },
    subscribe:function(email){
         var promise = $http({
      url: url + 'api/users/subscribe',
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email:email
      }
    }).then(function(data) {
      return data;

    }, function(data) {
      return data;

    });
    return promise;
  },
    forgotPassword: function(data) {
      var promise = $http({
        url: url + 'api/users/forgetPassword',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "username":data
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },
    verifyToken: function(data) {
      var promise = $http({
        url: url + 'api/users/validatetoken',
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          "token":data
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },
    resetpassword: function(token,data) {
      var promise = $http({
        url: url + 'api/users/resetpassword',
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "token":token,
          "newPassword":data
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },
    validatetoken: function(data) {
      var promise = $http({
        url: url + 'api/users/validatetoken',
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "token": data
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },

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
        url: url + 'api/token/checktoken'
      }).then(function(data) {
        return data
      }, function(data) {
        return data;
      });
      return promise;
    },
    updatePassword: function(data) {
      var promise = $http({
        url: url + 'api/secured/users/updatePassword',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },
    checkname: function(name) {
      var promise = $http({
        url: url + 'api/secured/authorize/stockarea/checkstockarea',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "term": name
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },
    codes: function() {
      var promise = $http({
        url: url + 'api/secured/users/getcodes',
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
    forgetpassword: function(data) {
      var promise = $http({
        url: url + 'api/users/forgetPassword',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          "username": data
}
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },

    deleteuser: function(password) {
      var promise = $http({
        url: url + 'api/secured/users/deleteuser',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "password": password
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },

    getUserDetails: function() {
      var promise = $http({
        url: url + 'api/secured/users/getuser',
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
    emailchange: function(email) {
      var promise = $http({
        url: url + 'api/users/checkemail?term='+email,
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "term": email
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    },
    profilepic: function(img) {
      var promise = $http({
        url: url + 'api/secured/users/updateprofilepic',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "img": img
        }
      }).then(function(data) {
        return data;

      }, function(data) {
        return data;

      });
      return promise;
    }
  };
  return sdo;
  }]);
