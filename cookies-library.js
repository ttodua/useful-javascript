/*   
	##############################################################################################
	###############  simple replacement for  https://github.com/js-cookie/js-cookie  #############
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
var Cookiess = {

	isSet(cookiename) { 
		return document.cookie.indexOf('; '+cookiename+'=');
	}, 
	set(name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	},
	get(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	delete(name) {   
		document.cookie = name+'=; Max-Age=-99999999;';  
	},
	//deleteCookie(key, value, attributes) { 
	//	set(key, this.read(key).replace(value,""), attributes);
	//}
	append(key, value, attributes) {
		set(key, get(key) + value, attributes);
	},

	
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
		if(cookie)
		{
			parsed = JSON.parse(cookie);
		}
		parsed[key] = value;
		var attributes = attributes ||  { expires: 99999 };
		this.set(cookieName, JSON.stringify(parsed), attributes);
		return parsed;
	},
	deleteOption(cookieName, key, attributes)
	{
		var cookie = this.get(cookieName);
		var parsed = {};
		if(cookie)
		{
			parsed = JSON.parse(cookie);
		}
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
	}
  
};
