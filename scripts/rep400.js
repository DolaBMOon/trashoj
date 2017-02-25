"use strict"
exports.init=function init(){

delete this.rep400
this.trusty=this.trusty||{}
this.trusty.rep400=(function rep400(req,rep){
	rep.writeHead(400,{"Content-Type":this.config.mime.html})
	rep.end("<!doctype html><h1>400</h1>")
}).bind(this)

}
