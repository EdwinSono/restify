var Servers = require('../models/ServersModel');
//var language = require('../languages/EN');

module.exports = {
  findById: function(params, language, callback) {
    var language = require('../languages/' + language);
    var response = {status:403,message:language.found_unsuccessfull,data:[]};
    try {
      Servers.findById(params.id, function(err, data){
        if(!err) {
          response = {
            status  : 200,
            message : language.found_successfull,
            data    : data
          };
        }
        callback(response);
      });
    } catch (err) {
      response = {
        status  : 500,
        message : err
      };
      callback(response);
    }
  },
  findOneByJson: function(params, language, callback){
    var language = require('../languages/' + language);
    var response = {status:403,message:language.found_unsuccessfull,data:[]};
    try {
      Servers.findOne(params, function(err, data){
        response.data = err;
        if(!err && data) {
          response = {
            status  : 200,
            message : language.found_successfull,
            data    : data
          };
        }
        callback(response);
      });
    } catch (err) {
      response = {
        status  : 500,
        message : err
      };
      callback(response);
    }
  },
  findByJson: function(params, language, callback){
    var language = require('../languages/' + language);
    var response = {status:403,message:language.found_unsuccessfull,data:[]};
    try {
      Servers.find(params, function(err, data){
        response.data = err;
        if(!err && data) {
          response = {
            status  : 200,
            message : language.found_successfull,
            data    : data
          };
        }
        callback(response);
      });
    } catch (err) {
      response = {
        status  : 500,
        message : err
      };
      callback(response);
    }
  },
  save: function(params, language, callback) {
    var language = require('../languages/' + language);
    var response = {status:403,message:language.saved_unsuccessfull,data:[]};
    try {
      var servers  = new Servers(params);
      servers.save(function(err) {
        response.data = err;
        if(!err) {
          response = {
            status  : 200,
            message : language.saved_successfull,
            data    : params
          };
        }
        callback(response);
      });
    } catch (err) {
      response = {
        status  : 500,
        message : err,
      };
      callback(response);
    }
  },
      
  update: function(params, language, callback) {
    var language = require('../languages/' + language);
    var response = {status:403,message:language.saved_unsuccessfull,data:[]};
    try {
      Servers.findOneAndUpdate({ server:params.server, port:params.port }, {$set:params}, {new: true}, function(err,data) {
        response.data = err;
        if(!err && data) {
          response = {
            status  : 200,
            message : language.saved_successfull,
            data    : data
          };
        }
        callback(response);
      })
    } catch (err) {
      response = {
        status  : 500,
        message : err
      };
      callback(response);
    }
  },

  delete: function(params, language, callback){
    var language = require('../languages/' + language);
    var response = {status:403,message:language.removed_unsuccessfull,data:[]};
    try {
      Servers.findOneAndRemove({ server:params.server, port:params.port }, function(err,data) {
        response.data = err;
        if(!err) {
          response = {
            status  : 200,
            message : language.removed_successfull,
            data    : data
          };
        }
        callback(response);
      })
    } catch (err) {
      response = {
        status  : 500,
        message : err
      };
      callback(response);
    }
  }

};