"use strict"
var zlib=require("zlib")
exports.init=function init(){

delete this.talk
this.trusty=this.trusty||{}
this.trusty.show_talk=(function show_talk(req,rep,par){
	rep.writeHead(200,{"Content-Type":"application/json","Content-Encoding":"gzip"})
	var gzip=zlib.createGzip()
	gzip.pipe(rep)
	gzip.end(JSON.stringify({talk:this.db.talk}))
}).bind(this)
this.trusty.add_talk=(function add_talk(req,rep,par){
	this.db.talk.push(par)
	rep.writeHead(302,{"Location":"/static?pathname=talk.html"});
	rep.end()
}).bind(this)

}
