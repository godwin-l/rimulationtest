var elasticsearch=require('elasticsearch');


/*var client = new elasticsearch.Client( {
  host: [
      {
  host:'localhost',
  auth: 'user:password'
}
]
});

*/
var client = new elasticsearch.Client( {
  host: [
      {
  host:'birch-4139331.us-east-1.bonsai.io',
  log:'trace',
  auth: 'sf7q7egm:r6re113vm5w5rzns'
}
]
});
client.ping({
  requestTimeout: 30000
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log("elasticsearch connected");
  }
});
module.exports = client;
