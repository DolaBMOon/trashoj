"use strict"
module.exports=function run_save_cron(){
	setTimeout(save.bind(this),this.config.save_cron.interval)
}
var fs=require("fs")
function save(){
	setTimeout(save.bind(this),this.config.save_cron.interval)
	fs.writeFile("config.json",JSON.stringify(this.config),function(){})
	fs.writeFile("db.json",JSON.stringify(this.db),function(){})
}
