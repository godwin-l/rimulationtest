

var message = {

    // sender info
    from: 'Bot <j.vinoth@virtualgodown.com>',

    // Comma separated list of recipients
    to: '"Vinoth" <j.vinoth@virtualgodown.com>,"Godwin" <l.godwin@virtualgodown.com>',

    // Subject of the message
    subject: 'Message from trade bot', //

    headers: {
        'X-Laziness-level': 1000
    },

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    html:'<p><b>Hello</b> mates'+
         '<p>Watch your account <br/></p>',

    // An array of attachments

};


exports.message = message;
