"use strict"
exports.init=function(){

delete this.hello_world
this.trusty=this.trusty||{}
this.trusty.hello_world=(function(req,rep,par){

rep.writeHead(200,{"Content-Type":this.config.mime.html})
rep.write("<!doctype html><meta charset='UTF-8'/><h1>Hello ")
rep.write(this.escapeHtml(par.name?par.name:"World"))
rep.write("!</h1>")
rep.write("<form method='post' action='/hello_world'><input name='name' type='text'/><button type='submit'>Talk</button></form>")
rep.end()

}).bind(this)

}
