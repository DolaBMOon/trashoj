"use strict"
var zlib=require("zlib")
exports.init=function(){

delete this.show_problem
this.trusty=this.trusty||{}
this.trusty.show_problem=(function(req,rep,par){
	var gzip=zlib.createGzip()
	rep.writeHead(200,{"Content-Type":"text/plain","Content-Encoding":"gzip"})
	gzip.pipe(rep)
	gzip.end(this.db.problems[par.pid].detail+"")
}).bind(this)

}
