"use strict"
var fs=require("fs")
var zlib=require("zlib")
exports.init=function init(){

delete this["static"]
this.trusty=this.trusty||{}
this.trusty["static"]=(function(req,rep,param){

var pn=param.pathname
if(!pn){
	rep.writeHead(302,{"Location":"/static?pathname=index.html"})
	rep.end()
}
else if(/^\w+(?:\.\w+)?$/.test(pn)){
	pn="static/"+pn
	fs.stat(pn,(function(err){
		if(err)
			fallback404.call(this,req,rep)
		else{
			var stm=fs.createReadStream(pn)
			var gzip=zlib.createGzip()
			var ext=/\.(.+?)$/.exec(pn)
			if(ext){
				var type=this.config.mime[ext[1]]||"application/octet-stream"
			}else{
				var type="application/octet-stream"
			}
			rep.writeHead(200,{"Content-Type":type,"Content-Encoding":"gzip"})
			stm.pipe(gzip).pipe(rep)
		}
	}).bind(this))
}else fallback403.call(this,req,rep)

}).bind(this)

}


function fallback404(req,rep){
	if(this.trusty.rep404)
		this.trusty.rep404(req,rep)
	else{
		rep.writeHead(404)
		rep.end()
	}
}
function fallback403(req,rep){
	if(this.trusty.rep403)
		this.trusty.rep403(req,rep)
	else{
		rep.writeHead(403)
		rep.end()
	}
}
