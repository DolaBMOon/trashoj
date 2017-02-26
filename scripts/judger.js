"use strict"
var cp=require("child_process")

module.exports=function judger(pid,lang,prog){
return new Promise((function(cb,fal){
	var outn="tmp/"+Date.now()+"_"+Math.random()+".exe"
	var gcm=this.config.judger.lang[lang].replace("%s",outn)
	var prminout=this.db.problems[pid].inout
	var g=cp.exec(gcm,(function(err,stdo,stde){
		if(err)cb(["CE",stdo,stde])
		else{
			var pms=[]
			for(var i=0,len=prminout["in"].length;i<len;++i)
				(function(input,i){
					pms.push(new Promise(function(suc,fal){
						var r=cp.execFile(outn,{timeout:1000,killSignal:"SIGKILL"},function(err,stdo,stde){
							if(err){
								if(err.signal=="SIGKILL")
									suc("TLE")
								else
									suc("RE")
							}
							else{
								if(same(stdo,i))
									suc("AC")
								else
									suc("WA")
							}
						})
						r.stdin.end(input)
					}))
				})(prminout["in"][i],i)
			Promise.all(pms).then(cb)
		}
	}).bind(this))
	g.stdin.end(prog)

	var same=(function(opt,id){
		var splitReg=/\r\n|\r|\n| /
		var optarr=opt.split(splitReg)
		var ansarr=prminout["out"][id].split(splitReg)
		var l1=optarr.length
		var l2=ansarr.length
		var i
		for(i=0;i<l1;)
			if(!optarr[i]){
				optarr.splice(i,1)
				--l1
			}else
				++i
		for(i=0;i<l2;)
			if(!ansarr[i]){
				ansarr.splice(i,1)
				--l2
			}else
				++i
		if(l1!=l2)
			return false
		var len=l1
		for(i=0;i<len;++i)
			if(optarr[i]!=ansarr[i])
				return false
		return true
	}).bind(this)
}).bind(this))
}
