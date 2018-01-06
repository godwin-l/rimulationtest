
  exports.adduser=function(req,res){
    var info=false;
    if( req.body.userName!==null && req.body.userName!==undefined && req.body.fullName!==null && req.body.fullName!==undefined && req.body.password!==null && req.body.password!==undefined){
      info=true;
  }
  return info;
};
exports.subscribe=function(req,res){
  var info=false;
  if( req.body.email!==null && req.body.email!==undefined){
    info=true;
}
return info;
};
exports.updateprofilepic=function(req,res){
  var info=false;
  if(req.body.img!==null && req.body.img!==undefined){
    info=true;
  }
  return info;
};
exports.forgetpassword=function(req,res){
  var info=false;
  if( req.body.username!==null && req.body.username!==undefined){
info=true;
}
return info;
};
exports.resetpassword=function(req,res){
  var info=false;
  if( req.body.token!==null && req.body.token!==undefined && req.body.newPassword!==null && req.body.newPassword!==undefined){
info=true;
}
return info;
};
exports.validatetoken=function(req,res){
  var info=false;
  if( req.body.token!==null && req.body.token!==undefined){
info=true;
}
return info;
};
exports.adddiscussion=function(req,res){
  var info=false;
  if( req.body.name!==null && req.body.name!==undefined  && req.body.owner!==null && req.body.owner!==undefined){
    info=true;
}
console.log(info);
return info;
};
exports.getdiscussion=function(req,res){
  var info=false;
  if( req.query.discussionId!==null && req.query.discussionId!==undefined){
info=true;
}
return info;
};
exports.addcomment=function(req,res){
  var info=false;
if( req.body.discussionId!==null && req.body.discussionId!==undefined  && req.body.comment!==null && req.body.comment!==undefined){
info=true;
}
return info;
};
