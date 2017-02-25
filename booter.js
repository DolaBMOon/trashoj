"use strict"
var fs=require("fs")
var ths={}
var dir=fs.readdirSync("scripts")
var fn
var rst
for(fn of dir){
	rst=/^(.*)\.js$/.exec(fn)
	if(rst!==null){
		ths[rst[1]]=require("./scripts/"+fn)
		if(ths[rst[1]].init)
			ths[rst[1]].init.call(ths)
	}
}
ths.main()
