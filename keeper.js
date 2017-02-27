"use strict"
var cp=require("child_process")
;(function spawn(){
	var p=cp.fork("./booter.js")
	p.on("exit",spawn)
})()
