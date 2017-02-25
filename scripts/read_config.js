"use strict"
var fs=require("fs")
module.exports=function read_config(){
	this.config=JSON.parse(fs.readFileSync("config.json").toString())
}
