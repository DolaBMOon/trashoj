"use strict"
exports.init=function init(){

delete this.request_fallback
this.trusty=this.trusty||{}
function rep(code,req,rep){
	rep.writeHead(code,{"Content-Type":this.config.mime.html})
	rep.end("<!doctype html><h1>"+code+"</h1>")
}
this.trusty.rep400=rep.bind(this,400)
this.trusty.rep403=rep.bind(this,403)
this.trusty.rep404=rep.bind(this,404)

}
