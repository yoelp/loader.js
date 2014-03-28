var loader = {
	scripts : {},
	load : function(name,src,cb){
		if(typeof src === "function" || !src){
			cb = src;
			src = name;
			name = "SCRIPT_" + (new Date().getTime());
		}
		var h=document.getElementsByTagName("head")[0], d = false,i,
		obj = {
			done : function(cb){
				if(!this._d)
					this._cbs.push(cb);
					else
						cb();
			},
			_cbs : [],
			_d : false
		},
		s=document.createElement("script");
		if(cb)obj._cbs.push(cb);
		s.src = src;
		s.onload = s.onreadystatechange = function(){
			if(!d&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){
				d = true;
				for (i in obj._cbs){
					if(typeof obj._cbs[i]==='function'){
						obj._cbs[i]();
						obj._cbs[i] = null;
					}
				}
				obj._d = true;
			}
		};
		h.appendChild(s);
		this.scripts[name] = obj;
		return obj;
	},
	prefetch : function(urls){
		if(!urls || !urls.length)return;
		if(typeof urls === "string")urls = [urls];
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				loader.prefetch(urls);
			}
		}
		xhr.open("GET",urls.splice(0,1),true);
		xhr.send();
	}
};
