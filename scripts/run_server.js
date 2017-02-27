"use strict"
var http=require("http")
var url=require("url")
var qs=require("querystring")
module.exports=function run_server(){

this.trusty=this.trusty||{}

http.createServer((function(req,rep){
var ul=url.parse(req.url,true)
var fn=ul.pathname.slice(1)
var fx=this.trusty[fn]
if(!fx)
	fallback.call(this,req,rep)
else if(req.method=="POST"){
	var dataarr=[]
	req.addListener("data",function(pt){
		dataarr.push(pt)
	})
	req.addListener("end",function(){
		var param=qs.parse(dataarr.join(''))
		try{fx(req,rep,param)}catch(err){}
	})
}else if(req.method=="GET"){
	try{fx(req,rep,ul.query)}catch(err){}
}else fallback.call(this.req,rep)

}).bind(this)).listen(this.config.server.port)

}

function fallback(req,rep){
	if(this.trusty.rep400)
		this.trusty.rep400(req,rep)
	else{
		rep.writeHead(400)
		rep.end()
	}
}
