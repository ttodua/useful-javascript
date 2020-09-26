// ###############  simple replacement for  https://github.com/js-cookie/js-cookie  ############# //
/*
		###  USAGE  ###
...	
if (CookiesLibrary.isCookieSet("myCookiename")) ...	// Check if Cookie exists		
...
CookiesLibrary.createCookie("myCooki", "myValue", 7 );	// Create cookie to last for 7 days
...
var myValue = CookiesLibrary.readCookie("myCooki");	// Read cookie
...
CookiesLibrary.deleteCookie("myCooki");			// Delete cookie
...

		### For JSON-type cookies, to get the child value. i.e. myCookie= '{ Joseph: 27, Helena: 59, Mike: 32 }';  ###
...
var age = CookiesLibrary.getCookieOption("myCooki", "Joseph");	// Read item
...
CookiesLibrary.setCookieOption("myCooki", "Luciano", 43);	// Add new item
...
CookiesLibrary.deleteCookieOption("myCooki", "Luciano");	// Delete item
...

		### For JSON-type cookies, with SUB-objects. i.e. myCookie= '{ Joseph: {height:185, age:27}, Helena:  {height:173, age:59}  }'; ###
...
var object = CookiesLibrary.getCookieOptionObject("myCooki", "Joseph");	// Read item
...
CookiesLibrary.setCookieOptionObject("myCooki", "Luciano",  "height", 153);	// Set item
CookiesLibrary.setCookieOptionObject("myCooki", "Luciano",  "age",    43);	// Set item
		### For JSON-type cookies, with SUB-arrays. i.e. myCookie= '{ Joseph: ['Canada','Spain'], Helena: ['USA', France']  }'; ###
CookiesLibrary.setCookieOptionArray("myCooki", "Joseph",  "Croatia",   true);	// Add item in array
CookiesLibrary.setCookieOptionArray("myCooki", "Joseph",  "Canada",    false);	// Remove item from array

*/
var CookiesLibrary = {

	isCookieSet(cookiename) { 
		return document.cookie.indexOf('; '+cookiename+'=');
	},
		
	createCookie(name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	},
	readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	deleteCookie(name) {   
		document.cookie = name+'=; Max-Age=-99999999;';  
	},

	// extensions for COOKIE plugin
	//
	getCookieOption(cookieName, key, defaultValue)
	{ 
		var existingValue = Cookies.get(cookieName);
		if(existingValue)
		{
			var parsed = JSON.parse(existingValue);
			if(key in parsed)
				return parsed[key];
		}
		return defaultValue;
	},
	setCookieOption(cookieName, key, value, attributes)
	{
		var cookie = Cookies.get(cookieName);
		var parsed = {};
		if(cookie)
		{
			parsed = JSON.parse(cookie);
		}
		parsed[key] = value;
		var attributes = attributes ||  { expires: 99999 };
		Cookies.set(cookieName, JSON.stringify(parsed), attributes);
		return parsed;
	},
	deleteCookieOption(cookieName, key, attributes)
	{
		var cookie = Cookies.get(cookieName);
		var parsed = {};
		if(cookie)
		{
			parsed = JSON.parse(cookie);
		}
		if(key in parsed) delete parsed[key];
		var attributes = attributes ||  { expires: 99999 };
		Cookies.set(cookieName, JSON.stringify(parsed), attributes);
		return parsed;
	}, 
	//sub-array
	getCookieOptionObject(cookieName, key){
		return JSON.parse( this.getCookieOption(cookieName, key, "{}") );
	},
	setCookieOptionObject(cookieName, key, subKey, subValue){
		var existing = JSON.parse( this.getCookieOption(cookieName, key, "{}") );
		if (subValue==null) delete existing[subKey];
		else existing[subKey]=subValue;
		this.setCookieOption(cookieName, key, JSON.stringify(existing));
	},
	setCookieOptionArray(cookieName, key, subValue, Add_or_remove)
	{
		var existing = JSON.parse( this.getCookieOption(cookieName, key, "[]") );
		if (Add_or_remove && !existing.includes(subValue) )
		{
			existing.push(subValue);
		}
		else if(!Add_or_remove && existing.includes(subValue) )
		{
			existing = this.removeItem(existing, subValue);
		}
		this.setCookieOption(cookieName, key, JSON.stringify(existing));
	}
  
};
