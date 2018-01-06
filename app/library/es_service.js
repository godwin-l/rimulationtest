var client  = require('../elastic/elastic_config');

function initIndex(req, res) {
      return client.indices.create({
          index:'virtualgodown',
          body: {

           }
      },function (error, response) {
           if(error){ console.log(error);  }
           client.close();
           console.log(response);
      });
  }
  exports.initIndex = initIndex;

  function closeIndex(req, res) {
        return client.indices.close({
            index:'virtualgodown'
            },function (error, response) {
             if(error){ console.log(error);  }
             console.log(response);
        });
    }
    exports.closeIndex = closeIndex;

    function openIndex(req, res) {
          return client.indices.open({
              index:'virtualgodown'
              },function (error, response) {
               if(error){ console.log(error);  }
               console.log(response);
          });
      }
      exports.openIndex = openIndex;

exports.analyzer= function(req,res) {
  return client.indices.putSettings(
    { index: 'virtualgodown',
      type: req.body.type,
      body: {
        "settings": {
          "analysis": {
              "analyzer": {
                  "my_analyzer": {
                      "type": "custom",
                      "tokenizer": "lowercase",
                      "filter": [
                          "my_stopwords","edgeNGram_filter"
                      ]
                  }
              },
              "filter": {
                  "edgeNGram_filter": {
                      "type": "edgeNGram",
                      "min_gram": 1,
                      "max_gram": 6
                  },
                  "my_stopwords": {
                      "type": "stop",
                      "stopwords": ["and","or","are","the"] ,
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

exports.product_mapping= function(req,res) {
client.indices.putMapping({
            index: 'virtualgodown',
            type: 'products',
            body: {
                'products': {
                    properties: {
                      productName : { type :'string',analyzer: 'my_analyzer'},
                      PStatus:{ type :'string', index:'not_analyzed'},
                    productId:{ type :'string', index:'not_analyzed'},
           productNames:{
             properties: {
          realName:{ type :'string', analyzer: 'my_analyzer'},
        otherName:{ type :'string', analyzer: 'my_analyzer'}
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


        function add_product_document(obj) {
              return client.index({
                  index:'virtualgodown',
                  type: 'products',
                  id:obj.productId,
                  body: {
                 productName:obj.productName,
                 PStatus    :obj.PStatus,
                 productId  :obj.productId,
                 productNames:{
                 realName    :obj.realName,
                 otherName   :obj.otherName
               },
               isFollowing:false,
                 productDescription:obj.productDescription
                   }
              });
          }
          exports.add_document_product = add_product_document;



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
                     id:obj.productId,
                     body: {
                       doc:{
                    imgSrc:obj.imgSrc
                  }}
                     });
                   }
     exports.update_imgsrc = update_imgsrc;

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
         },
         sort: {
           noOfFollowers: {
               order: "desc",
               mode:  "max"
           }
       }
       }
     });
   };

        exports.delete_elastic= function(req,res)
        {
        client.delete({
          index: 'virtualgodown',
          type:req.body.type ,
          id: obj.productId
        }, function (error, response) {
          if(error){ console.log(error);  }
          console.log(response);
        });
      }

/* Portfolio */
exports.Portfolio_mapping= function(req,res) {
client.indices.putMapping({
            index: 'virtualgodown',
            type: 'portfolio',
            body: {
              portfolio : {
    properties: {
      route : {
        type:   "string",
         analyzer: "my_analyzer"
      },
      sublocalitylevel1 : {
        type:   "string",
         analyzer: "my_analyzer"
      },
      sublocalitylevel2 : {
        type:   "string",
         analyzer: "my_analyzer"
      },
      administrativearealevel3 : {
        type:   "string",
         analyzer: "my_analyzer"
      },
      locality : {
        type:   "string",
         analyzer: "my_analyzer"
      },
      postalcode : {
        type:   "string",
         analyzer: "my_analyzer"
      },
      city:{
        type:   "string",
         analyzer: "my_analyzer"},
      state:{
        type :   "string",
         analyzer: "my_analyzer"},
         country:{
           type :   "string",
            analyzer: "my_analyzer"},
      type: {
        type:   "string",
        index:"not_analyzed"
      },
      price : {
        properties: {
        price:{
        type:   "integer",
        index:"not_analyzed"
      },
      from:{
      type:   "integer",
      index:"not_analyzed"
    },
    to:{
    type:   "integer",
    index:"not_analyzed"
  },
  unit:{
  type:   "string",
  index:"not_analyzed"
  },
 currency:{
 type:   "string",
 index:"not_analyzed"
  }
}
      },
      Quantity:{
        properties:{
      unit:{
      type:   "string",
      index:"not_analyzed"
      },
      Quantity:{
        type:   "integer",
        index:"not_analyzed"
      }
    }
    },
    minQuantity:{
      properties:{
    unit:{
    type:   "string",
    index:"not_analyzed"
    },
    minQuantity:{
      type:   "string",
      index:"not_analyzed"
    }
    }
    },
      location:{ "type" :"geo_point"}
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


          function add_portfolio_document(obj) {
                return client.index({
                    index:'virtualgodown',
                    type: 'portfolio',
                    id:obj._id,
                    body: {
                   locationName:obj.location.locationName,
                   city    :obj.location.city,
                   id  :obj._id,
                   route:obj.location.route,
                   neighborhood:obj.location.neighborhood,
                   sublocalitylevel2:obj.location.sublocalitylevel2,
                   sublocalitylevel1:obj.location.sublocalitylevel1,
                   administrativearealevel3:obj.location.administrativearealevel3,
                   locality:obj.location.locality,
                   productId:obj.productId,
                   state:obj.location.state,
                   country:obj.location.country,
                   type:obj.type,
                   price:{
                     price:obj.price.price,
                     unit:obj.price.unit,
                     currency:obj.price.currency,
                     from:obj.price.from,
                     to:obj.price.to
                   },
                   Quantity:{
                   Quantity:obj.Quantity.Quantity,
                   unit:obj.Quantity.unit
                   },
                   minQuantity:{
                   minQuantity:obj.minQuantity.minQuantity,
                   unit:obj.minQuantity.unit
                   },
                    location:
                    {
                   lat:obj.location.lat,
                    lon:obj.location.log// format------> [ lon,lat ]
                  }

                   }
                });
            }
            exports.add_portfolio_document = add_portfolio_document;

            exports.search_portfolio= function(req, res)
            {
            if(req.body.type!="" && req.body.locationName == "" && req.body.lat==null)
            {
            exports.portfolio_filter_without_geo(req,res);
            }
            else if (req.body.type!="" && req.body.from == null ) {
              exports.portfolio_filter_without_range(req,res);
            }
            else if (req.body.type!="" && req.body.from == null&& req.body.locationName == ""&&req.body.lat) {
              exports.portfolio_filter_without_range_and_geo(req,res);
            }
            else if (req.body.type==""&&req.body.locationName == "" && req.body.lat==null) {
               exports.portfolio_filter_without_type_and_geo(req,res);
            }
            else if (req.body.type==""&&req.body.from == null) {
              exports.portfolio_filter_without_type_and_range(req,res);

            }
            else if (req.body.type==""&&req.body.from==null &&req.body.locationName == "" && req.body.lat==null) {
            exports.portfolio_filter_without_type_range_and_geo(req,res);
            }
            else if (req.body.type==""&&req.body.from!=null &&req.body.locationName != "" && req.body.lat!=null) {
            exports.portfolio_filter_without_type(req,res);
            }
            else {
              exports.portfolio_filter_with_type(req,res);
            }
            }





            exports.portfolio_filter_with_type= function(req, res)
            {
          return  client.search({
             index: 'virtualgodown',
              type: 'portfolio',
              body: {
                query: {
                bool: {
                  must: [
                   { match: {productId: req.query.productId}},
                   { match: { type: req.query.type}}
                  ],
                  filter: {
                    bool: {
                        should: [
                          {
                            geo_distance: {
                     location: {
                        lon: req.query.long,
                        lat: req.query.lat
                     },
                     distance: "20km",
                     distance_type: "sloppy_arc"
                  }
                          }

                        ],
                      /*  filter: {
                          bool: {
                        should: [
                          {
                            multi_match: {
                                 query: req.query.locationName,
                         fields: ["locationName","state","city"]
                            }
                          }

                        ],*/
                        filter :{
                            range: {
                            cost : {
                               from : req.query.from,
                               to:   req.query.to
                                    }
                               }
                        }
                    //  }
                      //  }
                      }
                  }
                }
              },sort: {
                          cost: {
                    order: "asc",
                    mode:  "min"
                }
                        }
            }
          });
        };

            exports.portfolio_filter_without_geo= function(req,res)
            {
            return client.search({
             index: 'virtualgodown',
              type: 'portfolio',
              body: {
                "query": {
                "bool": {
                  "must": [
                   { "match": {
                      "productId": req.query.productId
                    }},
                    { "match": {
                      "type": req.query.type
                    }}
                  ],
                  "filter": {
                    "bool": {
                       "should": [
                           { "range" : {
                            "cost" : {
                               "from" : req.query.from,
                               "to" :  req.query.to
                                    }
                               }}
                         ]
                    }
                  }
                }
              },"sort": {
                          "cost": {
                    "order": 'asc',
                    "mode":  'min'
                }
                        }
            }
            });
          };

            exports.portfolio_filter_without_range= function(req,res)
            {
          return client.search({
             index: 'virtualgodown',
              type: 'portfolio',
              body: {
                "query": {
                  "bool": {
                    "must": [
                     { "match": {
                        "productId": req.query.productId
                      }},
                      { "match": {
                        "type": req.query.type
                      }}
                    ],
                    "filter": {
                      "bool": {
                         "should": [
                            {
                              "geo_distance": {
                       "location": {
                          "lon": req.query.long,
                          "lat": req.query.lat
                       },
                       "distance": "20km",
                       "distance_type": "sloppy_arc"
                    }
                            }

                           ],
                      /*    "filter": {
                            "bool": {
                          "should": [
                            {
                              "multi_match": {
                                   "query": req.query.locationName,
                           "fields": ["locationName","state","city"]
                              }
                            }

                          ]
                            }
                          }*/

                      }
                    }
                  }
                },"sort": {
                            "cost": {
                      "order": "asc",
                      "mode":  "min"
                  }
                          }
            }
          });
          };

            exports.portfolio_filter_without_range_and_geo= function(req,res)
            {
            return client.search({
             index: 'virtualgodown',
              type: 'portfolio',
              body: {
                "query": {
                   "bool": {
                     "must": [
                      { "match": {
                         "productId": req.query.productId
                       }},
                       { "match": {
                         "type": req.query.type
                       }}
                     ]
                   }

                 },"sort": {
                             "cost": {
                       "order": "asc",
                       "mode":  "min"
                   }
                           }

            }
            });
          };


            /*without type*/

            exports.portfolio_filter_without_type= function(req, res)
            {
          return  client.search({
             index: 'virtualgodown',
              type: 'portfolio',
              body: {
                query: {
                bool: {
                  must: [
                   { match: {productId: req.query.productId}}
                  ],
                  filter: {
                    bool: {
                        should: [
                          {
                            geo_distance: {
                     location: {
                        lon: req.query.long,
                        lat: req.query.lat
                     },
                     distance: "20km",
                     distance_type: "sloppy_arc"
                  }
                          }

                        ],
                      /*  filter: {
                          bool: {
                        should: [
                          {
                            multi_match: {
                                 query: req.query.locationName,
                         fields: ["locationName","state","city"]
                            }
                          }

                        ],*/
                        filter :{
                            range: {
                            cost : {
                               from : req.query.from,
                               to:   req.query.to
                                    }
                               }
                        }
                    //  }
                    //    }
                      }
                  }
                }
              },sort: {
                          cost: {
                    order: "asc",
                    mode:  "min"
                }
                        }
            }
            });
          };


            exports.portfolio_filter_without_type_and_geo= function(req,res)
            {
            return client.search({
             index: 'virtualgodown',
              type: 'portfolio',
              body: {
                "query": {
                "bool": {
                  "must": [
                   { "match": {
                      "productId": req.query.productId
                    }}
                  ],
                  "filter": {
                    "bool": {
                       "should": [
                           { "range" : {
                            "cost" : {
                               "from" : req.query.from,
                               "to" :  req.query.to
                                    }
                               }}
                         ]
                    }
                  }
                }
              },"sort": {
                          "cost": {
                    "order": 'asc',
                    "mode":  'min'
                }
                        }
            }
            });
          };

            exports.portfolio_filter_without_type_and_range= function(req,res)
            {
            return client.search({
             index: 'virtualgodown',
              type: 'portfolio',
              body: {
                "query": {
                  "bool": {
                    "must": [
                     { "match": {
                        "productId": req.query.productId
                      }}
                    ],
                    "filter": {
                      "bool": {
                         "should": [
                            {
                              "geo_distance": {
                       "location": {
                          "lon": req.query.long,
                          "lat": req.query.lat
                       },
                       "distance": "20km",
                       "distance_type": "sloppy_arc"
                    }
                            }

                           ],
                        /*  "filter": {
                            "bool": {
                          "should": [
                            {
                              "multi_match": {
                                   "query": req.query.locationName,
                           "fields": ["locationName","state","city"]
                              }
                            }

                          ]
                            }
                          }*/

                      }
                    }
                  }
                },"sort": {
                            "cost": {
                      "order": "asc",
                      "mode":  "min"
                  }
                          }
            }
            });
          };

            exports.portfolio_filter_without_type_range_and_geo= function(req,res)
            {
            return client.search({
             index: 'virtualgodown',
              type: 'portfolio',
              body: {
                "query": {
                   "bool": {
                     "must": [
                      { "match": {
                         "productId": req.query.productId
                       }}
                     ]
                   }

                 },"sort": {
                             "cost": {
                       "order": "asc",
                       "mode":  "min"
                   }
                           }

            }
          });
          };
