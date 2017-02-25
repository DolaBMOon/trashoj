"use strict"
var fs=require("fs")
module.exports=function read_db(){
	this.db=JSON.parse(fs.readFileSync("db.json").toString())
}
