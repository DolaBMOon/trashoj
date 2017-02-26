"use strict"
exports.init=function init(){

delete this.submit
this.trusty=this.trusty||{}
this.trusty.submit=(function(req,rep,par){
	this.judger(par.pid,par.lang,par.prog).then(function(rst){
		rep.writeHead(200,{"Content-Type":"text/plain"})
		rep.end(rst.toString())
	}).catch(function(){
		rep.writeHead(500,{"Content-Type":"text/plain"})
		rep.end("Something goes wrong")
	})
}).bind(this)

}
