var restify = require('restify');
var path = require('path')
var fs = require('fs');

var Servers = require('./controllers/ServersController');

var options = {
	name: 'winso',
	version: '1.0.0',
};
var server = restify.createServer(options);

server.use(restify.bodyParser());

var type = path.basename(__filename).slice(0, -3)

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});

//C++
function execCplus(req, res, next) {

    var execFile = require('child_process').execFile
    var program = "cpp/standalone_stdio/build/Release/standalone";


    var under = 461; //parseInt(req.body.under) ||
    var child = execFile(program, [under],
      function (error, stdout, stderr) {
        var primes  = stdout.split("\n")
        			             .slice(0, -3)
                           .map(function (line) {
                            return parseInt(line);
                      });
        console.log("Primes generated from " + type);
        res.send(200, {
          results: primes
        } );
        next();
    });
}

//Routers
function respond_save(req, res, next) {
	var params = req.body;
  if(params.hasOwnProperty("ip") && params.hasOwnProperty("port") ){		
		Servers.update(params, "ES", function(data){
			if ( data.status === 403 ) {
				Servers.save(params, "ES", function(data){
					res.send(data.status, data );
					next();
				})				
			} else {
				res.send(data.status, data );
				next();
			}
		})
  }else{
  	res.send(403,'Error con los parametros');
  }
  
}

function respond_join(req, res, next) {
	 var query = { $query: {active:true}, $orderby: { users : 1 } };
	Servers.findOneByJson(query, "ES", function(data){
		res.send(data.status, data );
		next();
	})  
}

function respond_all(req, res, next) {
	Servers.findByJson({}, "ES", function(data){
		res.send(data.status, data );
		next();
	})  
}

server.post('/save', respond_save);
server.get('/join', respond_join);
server.get('/all', respond_all);
server.get('/exec', execCplus);



/*API
#headers
Content-Type: application/json
#body
{"ip":"192.168.0.3",
 "port":"7800",
 "users":999,
}
#response
#-Update
{
  "status": 200,
  "message": "Guardado éxitoso.",
  "data": {
    "_id": "5755e53ed0bf31b632d3220b",
    "ip": "192.168.0.3",
    "port": "7800",
    "users": 999,
    "__v": 0,
    "active": true
  }
}
#-save
{
  "status": 200,
  "message": "Guardado éxitoso.",
  "data": {
    "ip": "192.168.0.9",
    "port": "7997",
    "users": 498
  }
}
#-err
{
  "status": 403,
  "message": "Guardado sin éxitoso.",
  "data": {Err:... }
}
*/


/***
Servers.save(																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																{
	name		: "beach",
	ip			: "192.168.0.3",
	port		: "8999",
	users		: 256
}, "ES", function(data){
	console.log(data);
})
/*
Servers.findByJson({
	ip			: "192.168.0.1",
	port		: "3000",	 
}, "ES", function(data){
	console.log(data);
})

Servers.findById({
	id : "5752b31a419f1e3a18a51d70"
}, "ES", function(data){
	console.log(data);
})
*/
/*
Servers.update({
	ip			: "192.168.0.24",
	port		: "8181",
	users		: 951
}, "ES", function(data){
	console.log(data);
})
/*
Servers.findByJson({}, "ES", function(data){
	console.log(data);
})
/*
Servers.update({
	ip		: "192.168.0.1",
	port	: "3000"
}, "ES", function(data){
	console.log(data);
})
/**/
