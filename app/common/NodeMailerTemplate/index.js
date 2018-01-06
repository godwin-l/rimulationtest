const mail=require('./mail/MailUtils.js');
const mailConfig=require('./mail/mailMessages.js');
//const handlebars=require('handlebars');


var transport =mail.transport;
var message = mailConfig.message;




mail.readHTMLFile(__dirname + '/templates/password.html', function(err, html) {
  //console.log("html++++++++++++++++"+html);
  //  var template = handlebars.compile(html);
  //  var replacements = {       username: "John Doe"  };
  //  var htmlToSend = template(replacements);
  //console.log("template++++++++++++"+template);
  message.html = html;
  transport.sendMail(message, function(error) {
    if (error) {
      console.log('Error occured');
      console.log(error.message);
      return;
    }
    console.log('Message sent successfully!');
    transport.close();
  });

});
