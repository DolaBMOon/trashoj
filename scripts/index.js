"use strict"
exports.init=function init(){

delete this.index
this.trusty=this.trusty||{}
this.trusty[""]=(function(req,rep){
	rep.writeHead(302,{"Location":"/index"})
	rep.end()
}).bind(this)
this.trusty.index=(function(req,rep){
	rep.writeHead(302,{"Location":"/static"})
	rep.end()
}).bind(this)

}
