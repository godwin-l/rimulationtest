/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
module.exports = {
  error: function(res, data, err) {
    res.status(err.code).send({
      "status": "error",
      "message": data || {},
      "code": err.code
    });
  },
  getEmpty: function(req, res, componentName, url, data) {
    try {
      var requserids = [];
      userBasic.findOne({
        userId: req.headers['userid']
      }, function(err, userbasicdata) {
        if (err) {

          self.error(res, "unauthorized", 401);
        } else {
          var requser = userbasicdata.connections.connections;
          var reqproduct = userbasicdata.products.products;
          async.each(requser, function(userids, callback) {
            userBasic.findOne({
              _id: userids
            }, function(err, users) {
              requserids.push(users.userId);
              callback();
            })
          }, function(err) {
            var convertedJSON = JSON.parse(JSON.stringify(data));
            convertedJSON.connectedUserIds = requserids;
            requserids.push(req.headers['userid']);
            convertedJSON.followingProductIds = reqproduct;
            return res.json({
              status: 'success',
              componentName: componentName,
              serviceRequested: url,
              isService: "success",
              data: data || {}
            })
          })

        };
      })
    } catch (err) {
      res.error({
        "status": "error",
        "data": "something went wrong please try again"
      });
    }
  }
};
