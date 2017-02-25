"use strict"
exports.init=function(){

delete this.add_problem
this.trusty=this.trusty||{}
this.trusty.add_problem=(function(req,rep,par){
	var prm={
		"username":par.username,
		"useremail":par.useremail,
		"title":par.title,
		"detail":par.detail,
		"inout":par.inout
	}
	if(!(/^\d+$/.test(par.pid))||this.db.problems[par.pid]&&(this.db.problems[par.pid].username!=prm.username||this.db.problems[par.pid].useremail!=prm.useremail)){
		rep.writeHead(403,{"Content-Type":"text/plain"})
		rep.end("Problem adding fail")
	}else{
		this.db.problems[par.pid]=prm
		rep.writeHead(200,{"Content-Type":"text/plain"})
		rep.end("Problem added successfully")
	}
}).bind(this)

}
