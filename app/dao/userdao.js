/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
var users = require('../models/users.js');
module.exports = {
  /**
   *
   * @param req
   * @param res
   * @description Service for deleteuser
   */
    deleteuser: function(req, res) {
      try{
        log.debug("{'userId':"+req.headers['userid']+",'Message':' in deleteuser'"+",'Url':"+req.originalUrl+"}");
        users.update({
            _id: req.headers['userid']
        }, {
            $set: {
                "status": "n"
            }
        }, {
            upsert: true
        }, function(err, user) {
            if (err) {
              log.error("{'userId':"+req.headers['userid']+",'Message':'error in deleteuser'"+",'Url':"+req.originalUrl+"}");
        commonService.error(res,"Something went Wrong Try again",500);
            } else
                userbasic.delete(req, res);
        });
      }
      catch(err){
        log.error("{'userId':"+req.headers['userid']+",'Message':'error in deleteuser'"+",'Url':"+req.originalUrl+"}");
        commonService.error(res,"Something went Wrong Try again",500);

      }
    },

  updateprofilepic: function(req,res,userid,url,sr,name) {
   users.update({userId:userid},{$set:{profilePic:url}},{upsert:true},function(err,data){
        if(err){
          commonService.error(res,"Something went Wrong Try again");
        }
        else{
          res.json({
              signed_request: sr,
              url: url,
              name:name
          });
        }
      })

    },
    revokeuser : function(userid){
        try{
          console.log("sell");
          return sell.update({userId:userid},{$set:{status:'active'}},{multi:true},function(err,data){
              if(err){
                console.log(err);
                //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
    return err;
              }
              else{
                console.log("in ps");
                try{
                  console.log("productstock");
                return productstock.update({userId:userid},{$set:{status:'active'}},{multi:true},function(err,data){
                      if(err){
                        //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
    return err;                  }
                      else{
                        try{
                          console.log("stockarea");
                    return stockarea.update({userId:userid},{$set:{status:'active'}},{multi:true},function(err,data){
                              if(err){
                                //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
    return err;
                             }
                              else{
                                try{
                                  console.log("user");
                            return users.update({userId:userid},{$set:{status:'active'}},{upsert:true},function(err,data){
                                      if(err){
                                        //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
    return err;                                  }
                                      else{
                                        console.log("success return");
                                        return data;

                                  }
                                })
                                  }catch(err){

                                    //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
    return err;
                                  }

                          }
                        })

                          }catch(err){

                            //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
    return err;
                          }

                  }
                })

                  }catch(err){

                    //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
    return err;
                  }
          }
        })
          }catch(err){

            //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
    return err;
          }
      }

};
