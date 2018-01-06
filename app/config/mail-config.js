var environment = 'development';
var config = {
  development: {
    mailer: {
      from: 'karthickeswar@virtualgodown.com',
      host: 'smtp.gmail.com', // hostname
      secureConnection: false, // use SSL
      port: 25, // port for secure SMTP
      transportMethod: 'SMTP',
      requiresAuth: true,
      domains: 'gmail.com',
      auth: {
        user: 'karthickeswar@virtualgodown.com',
        pass: 'Rukp@1995'
      }
    }
  }
};

exports = module.exports = config[environment];
