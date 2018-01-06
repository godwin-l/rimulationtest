var client  = require('../elastic/elastic_config');


  exports.indexExists = function(obj) {
    return client.indices.exists({
        index: obj.indexName
    },function (error, response) {
         if(error){ console.log(error);  }
         console.log(response);
    });
}

function initIndex() {
      return client.indices.create({
          index:'virtualgodown',
          type: 'products',
          body: {

           }
      },function (error, response) {
           if(error){ console.log(error);  }
           client.close();
           console.log(response);
      });
  }
  exports.initIndex = initIndex;

  function closeIndex() {
        return client.indices.close({
            index:'virtualgodown'
            },function (error, response) {
             if(error){ console.log(error);  }
             console.log(response);
        });
    }
    exports.closeIndex = closeIndex;


exports.ngramanalyzer= function() {
  return client.indices.putSettings(
    { index: 'virtualgodown',
      type: 'products',
      body: {
      "settings" : {
                "analysis" : {
                    "analyzer" : {
                        "autocomplete" : {
                            "tokenizer" : "my_ngram_tokenizer"
                        }
                    },
                    "tokenizer" : {
                        "my_ngram_tokenizer" : {
                            "type" : "nGram",
                            "min_gram" : "2",
                            "max_gram" : "4",
                            "token_chars": [ "letter", "digit" ]
                        }
                    }
                  }
                }
              }
            },
                function (error, response) {
                  if(error){ console.log(error);  }
                   console.log(response);
    });
}

exports.putmapping= function() {
client.indices.putMapping({
            index: 'virtualgodown',
            type: 'products',
            body: {
                'products': {
                    properties: {
                      productName : { type :'string',analyzer: 'autocomplete'},
                      PStatus:{ type :'string', index:'not_analyzed'},
                    productId:{ type :'string', index:'not_analyzed'},
           productNames:{
             properties: {
          realName:{ type :'string', analyzer: 'autocomplete'},
        otherName:{ type :'string', analyzer: 'autocomplete'}
      }
       },
       productDescription:{ type :'string'}

                  }
                }
              }
            },
            function (error, response) {
                 if(error){ console.log(error);  }
                 console.log(response);
                // res.send("<h1>mappings is created</h1>");
            });
          }


        function add_document_product(obj,callback) {
              return client.index({
                  index:'virtualgodown',
                  type: 'products',
                  id:obj.productId,
                  body: {
                 productName:obj.productName,
                 PStatus    :obj.PStatus,
                 productId  :obj.productId,
                 productNames:{
                 realName    :obj.productNames.realName,
                 otherName   :obj.productNames.otherName
               },
               isFollowing:false,
                 productDescription:obj.productDescription
               }
             });
    }
          exports.add_document_product = add_document_product;


          exports.search_elastic= function(obj)
          {
return client.search({
            index: 'virtualgodown',
            type: 'products',
            body: {
              query: {
                match: {
                  productName: obj
                }
              }
            }
})
}
function update_no_of_followers(obj) {
                      return client.update({
                            index:'virtualgodown',
                            type: 'products',
                            id:obj.productId,
                            body: {
                              doc:{
                             noOfFollowers:obj.followers.noOfFollowers
                         }
                             }
                        });
                    }
                    exports.update_no_of_followers = update_no_of_followers;

            function update_imgsrc(obj) {
                   return client.update({
                     index:'virtualgodown',
                     type: 'products',
                     id:obj._id,
                     body: {
                       doc:{
                    imgSrc:obj.imgSrc
                  }}
                })
                   }
     exports.update_imgsrc = update_imgsrc;
