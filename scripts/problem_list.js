"use strict"
var zlib=require("zlib")
exports.init=function(){

delete this.problem_list
this.trusty=this.trusty||{}
this.trusty.problem_list=(function(req,rep){
	rep.writeHead(200,{"Content-Type":this.config.mime.html,"Content-Encoding":"gzip"})
	var gzip=zlib.createGzip()
	gzip.pipe(rep)
	gzip.write("<!doctype html><meta charset='UTF-8'/><ul>")
	var pid
	var prm
	for(pid in this.db.problems)
		if(this.db.problems.hasOwnProperty(pid)&&/\d+/.test(pid)){
			prm=this.db.problems[pid]
			pid=/(\d+)/.exec(pid)[1]
			gzip.write('<li><a href="/show_problem?pid='+pid+'">'+pid+':'+this.escapeHtml(prm.username)+':'+this.escapeHtml(prm.title)+'</a></li>')
		}
	gzip.end("</ul>")
}).bind(this)

}
