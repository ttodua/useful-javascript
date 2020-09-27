/*   
	##############################################################################################
	############### Extended functionalities of  https://github.com/js-cookie/js-cookie ##########
	############### https://github.com/ttodua/useful-javascript/edit/master/cookies-library.js ###
	##############################################################################################
	
########################################  USAGE  #############################################
	
### For simple cookies:
	if (Cookiess.isSet("myCookiename")) ...	// Check if Cookie exists	
	Cookiess.create("myCooki", "myValue", 7 );// Create cookie to last for 7 days
	var myValue = Cookiess.read("myCooki");	// Read cookie
	Cookiess.delete("myCooki");		// Delete cookie

### For JSON-type cookies, to get the child value. i.e. myCookie= '{ Joseph: 27, Helena: 59, Mike: 32 }';  ###
	var age = Cookiess.getOption("myCooki", "Joseph");	// Read item
	Cookiess.setOption("myCooki", "Luciano", 43);		// Add new item
	Cookiess.deleteOption("myCooki", "Luciano");		// Delete item

### For JSON-type cookies, with SUB-objects. i.e. myCookie= '{ Joseph: {height:185, age:27}, Helena:  {height:173, age:59}  }'; ###
	var object = Cookiess.getOptionObject("myCooki", "Joseph");	// Read item
	Cookiess.setOptionObject("myCooki", "Luciano",  "height", 153);	// Set item
	Cookiess.setOptionObject("myCooki", "Luciano",  "age",    43);	// Set item
	
### For JSON-type cookies, with SUB-arrays. i.e. myCookie= '{ Joseph: ['Canada','Spain'], Helena: ['USA', France']  }'; ###
	Cookiess.setOptionArray("myCooki", "Joseph",  "Croatia",   true);	// Add item in array
	Cookiess.setOptionArray("myCooki", "Joseph",  "Canada",    false);// Remove item from array

*/
Cookiess = {
	get(a,b) { return this.cookies_instance().get(a,b); },
	set(a,b,c) { return this.cookies_instance().set(a,b);  },
	remove(a, b) {return this.cookies_instance().remove(a,b);   },
	append(name, value, attributes) {return this.cookies_instance().set((this.get(name) || '')  + value, attributes);  },
	isset(cookiename) {return this.get(cookiename)!="";}, // document.cookie.indexOf('; '+cookiename+'='); 
	// WORKING WITH ARRAY/OBJECTS
	getOption(cookieName, key, defaultValue)
	{ 
		var existingValue = this.get(cookieName);
		if(existingValue)
		{
			var parsed = JSON.parse(existingValue);
			if(key in parsed)
				return parsed[key];
		}
		return defaultValue;
	},
	setOption(cookieName, key, value, attributes)
	{
		var cookie = this.get(cookieName);
		var parsed = {};
		if(cookie) parsed = JSON.parse(cookie); 
		parsed[key] = value;
		var attributes = attributes ||  { expires: 99999 };
		this.set(cookieName, JSON.stringify(parsed), attributes);
		return parsed;
	},
	deleteOption(cookieName, key, attributes)
	{
		var cookie = this.get(cookieName);
		var parsed = {};
		if(cookie) parsed = JSON.parse(cookie); 
		if(key in parsed) delete parsed[key];
		var attributes = attributes ||  { expires: 99999 };
		this.set(cookieName, JSON.stringify(parsed), attributes);
		return parsed;
	}, 
	//sub-array
	getOptionObject(cookieName, key){
		return JSON.parse( this.getOption(cookieName, key, "{}") );
	},
	setOptionObject(cookieName, key, subKey, subValue){
		var existing = JSON.parse( this.getOption(cookieName, key, "{}") );
		if (subValue==null) delete existing[subKey];
		else existing[subKey]=subValue;
		this.setOption(cookieName, key, JSON.stringify(existing));
	},
	setOptionArray(cookieName, key, subValue, Add_or_remove)
	{
		var existing = JSON.parse( this.getOption(cookieName, key, "[]") );
		if (Add_or_remove && !existing.includes(subValue) )
		{
			existing.push(subValue);
		}
		else if(!Add_or_remove && existing.includes(subValue) )
		{
			existing = this.removeItem(existing, subValue);
		}
		this.setOption(cookieName, key, JSON.stringify(existing));
	},
	//
	cookies_instance(){ if (!this.cookies_inited) this.cookies_inited=this.cookies(); return this.cookies_inited; } ,
	cookies_inited: null,
	// https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js
	cookies : function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var t={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};return function n(r,o){function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),n=r.write(n,t);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n+c}}return Object.create({set:i,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u[0]&&(u=u.slice(1,-1));try{var f=t.read(c[0]);if(o[f]=r.read(u,f),e===f)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){i(t,"",e({},n,{expires:-1}))},withAttributes:function(t){return n(this.converter,e({},this.attributes,t))},withConverter:function(t){return n(e({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(r)}})}(t,{path:"/"})}
};
