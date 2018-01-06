/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var Users = new Schema({
  _id: String,
  userId: {
    type: String
  },
  access_token: {
    type: String
  },
  profilePic: {
    type: String,
    default: 'https://s3-us-west-2.amazonaws.com/virtualgodown/avatar.png'
  },
  primaryMobile: {
    type: String
  },
  profilePicThumbnail: {
    type: String
  },
  mobile: [{
    mobile: {
      type: String
    },
    code: {
      type: String
    },
    status: {
      type: String,
      default: 'unverified'
    },
    type: {
      type: String,
      default: 1,
      ref: 'statuscode'
    }
  }],
  dob: {
    type: Date
  },
  company: {
    type: String
  },
  org: [{
    organisationId: {
      type: String,
      ref: 'organisation'
    },
    role: {
      type: String
    },
    createdOn: {
      type: Date,
      default: Date.now
    }
  }],
  userName: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String
    },
  hashedPassword: {
    type: String
    },
  address: {
    type: String
  },
  salt: {
    type: String
  },
  email: [{
    email: {
      type: String
    },
    status: {
      type: String,
      default: 'unverified'
    },
    type: {
      type: String,
      default: 1,
      ref: 'statuscode'
    }
  }],
  secondaryEmail: {
    type: String
  },
  phone: {
    type: Number
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  pincode: {
    type: Number
  },
  organisation: [{
    _id: {
      type: String
    },
    name: {
      type: String
    },
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    as: {
      type: String
    }
  }],
  createdOn: {
    type: Date,
    "default": Date.now
  },
  updatedOn: {
    type: Date,
    "default": Date.now
  },
  status: {
    type: Number,
    "default": 200,
  }
});

Users.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('hex');
};

/*Users.virtual('userId').get(function () {
    return this.id;
});*/

Users.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = crypto.randomBytes(32).toString('hex');
    //more secure - this.salt = crypto.randomBytes(128).toString('hex');
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._plainPassword;
  });


Users.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};
module.exports = mongoose.model('Users', Users);
