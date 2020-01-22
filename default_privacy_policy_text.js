/*

######################### usage ##########################
add this script in the bottom of your site:

    <script id="privacy_notice_TT" src="https://rawgit.com/ttodua/useful-javascript/master/default_privacy_policy_text.js?param1=value1"></script>

// If you want, you can also customize the PARAMETERS (use them without quotes):
	lang			[defaults to: en]				- you can set the language manually	
													* (if your site have dynamic language, then set desired value in global javascript-variable named "gdpr_language_TT")
	site 			[defaults to: current domain]	- you can manually set to :  www.yoursite.com
	privacy_page_url[defaults to: automatic url]	- you can create the url explicitly, like:   yoursite.com/whatever
	target_id		[defaults to: gdpr_content_TT]	- set ID to fill the text withing specific <div id="gdpr_content_TT">
													* set to "false" to use just full-window message instead.
	a_id			[defaults to: ""]				- set ID to fill that with link "<a href="">Privacy Policy</a>"

##########################################################					
*/





// ================================= START HERE =====================================
privacy_policy_text_TT = 
{
	init : function(){
		privacy_policy_text_TT.init_vars();
		privacy_policy_text_TT.textResults();
		privacy_policy_text_TT.execute_insert();
		privacy_policy_text_TT.check_cookies();
	},

	init_vars : function()
	{
		var params =ttLibrary.readSelfParameters('privacy_notice_TT');
		privacy_policy_text_TT.lang				= params.hasOwnProperty("lang")  		? params.lang		: (typeof gdpr_language_TT!="undefined" ? gdpr_language_TT : "en");
		privacy_policy_text_TT.site 			= params.hasOwnProperty("site")  		? params.site		: location.host;
		privacy_policy_text_TT.target_id		= params.hasOwnProperty("target_id")	? params.target_id	: "gdpr_content_TT";
		privacy_policy_text_TT.a_id				= params.hasOwnProperty("a_id")			? params.a_id		: false;
		//
		privacy_policy_text_TT.default_query	= 'default_privacy_policy_page=show';
		privacy_policy_text_TT.privacy_page_url	=  params.hasOwnProperty("privacy_page_url")? params.privacy_page_url :  "#"+ privacy_policy_text_TT.default_query; //(location.href.indexOf('?') <0 ? '?' : '&')
	},

	capitalizeFirstLetter : function(string)
	{ 
		return  string.charAt(0).toUpperCase() + string.slice(1); 
	},


	check_cookies : function()
	{
		if ( ! ttLibrary.getCookie("cookie_consent_tt") ) 
		{ 
			var css = 
			'.privacy_policy_text_TT #gdpr_privacy_bar_TT {\
				position: fixed;\
				bottom: 0;\
				left: 0;\
				background: rgba(0,0,0,0.9);\
				width: 100%;\
				color: #fff;\
				z-index: 9999999;\
				opacity: 0.95;\
				font-style: italic;\
			}\
			.privacy_policy_text_TT #gdpr_privacy_bar_TT .gdpr_wrapper {\
				display: flex;\
				flex-direction: row;\
				margin: 5px 20px;\
				justify-content: center;\
				font-size: 11px;\
			}\
			.privacy_policy_text_TT #gdpr_privacy_bar_TT button {\
				background: #88e000;\
				padding: 2px 15px;\
				border-radius: 5px;\
				cursor: pointer;\
			}\
			.privacy_policy_text_TT #gdpr_privacy_bar_TT .gdpr_wrapper div {\
				margin:0px 10px;\
			}\
			.privacy_policy_text_TT #gdpr_privacy_bar_TT a.privacy_policy_learnmore_tt {\
				color:#9191ea;\
				font-style:italic;\
			}\
			';
			ttLibrary.insertIntoHead(css);
			
			var txt_output  =
			'<div class="privacy_policy_text_TT">\
				<div id="gdpr_privacy_bar_TT">\
					<div class="gdpr_wrapper">\
						<div class="gdpr-content">' 
							+ privacy_policy_text_TT.output_bar_Notice +   
						'</div>\
						<div class="gdpr_right">\
							<button id="gdpr_agreement_TT" type="button">' + privacy_policy_text_TT.output_bar_Agree +  '</button>\
						</div>\
					</div>\
				</div>\
			</div>';
			
			txt_output = txt_output.replace("_DEFAULT_A_ATTS_", 'href="' + privacy_policy_text_TT.privacy_page_url + '" target="_blank" rel="nofollow" class="privacy_policy_learnmore_tt"');

			var newElement = document.createElement("div");
			newElement.innerHTML = txt_output; 
			document.body.appendChild(newElement);
			
			var agr_bar_button = document.getElementById("gdpr_agreement_TT");
			if (agr_bar_button)
			{
				agr_bar_button.addEventListener("click", function(){ 
					ttLibrary.setCookie("cookie_consent_tt", 1, 365);
					document.getElementById("gdpr_privacy_bar_TT").style.display="none";
				});
			}
			
		}
	
	
	},
	
	
	
	textResults : function(string) 
	{ 
		var lang= privacy_policy_text_TT.lang;
		var website = privacy_policy_text_TT.capitalizeFirstLetter( privacy_policy_text_TT.site  );

		if (lang == "en") 
		{
			privacy_policy_text_TT.privacy_polivy 		= 'Privacy Policy';
			privacy_policy_text_TT.output_bar_Notice	= 'Our site uses cookies. Using our site means that you accept the privacy policy & terms (<a _DEFAULT_A_ATTS_>learn more</a>).';
			privacy_policy_text_TT.output_bar_Agree 	= 'I agree';
			privacy_policy_text_TT.output_privacy		= 
'<div class="privacy_policy_text_TT">\
<h1 style="text-align:center;">Privacy Policy</h1>\
<p>\
'+website+' (reffered as "our site" or "we") website is structured so that it uses some kind of data collection to identify visitor. Once you choose to provide us personally identifiable information (any information by which you can be identified), you can be assured that it will only be used to support your customer experience with our site. </p>\
<br/><h2>What information do we collect?</h2>\
<br/>• We collect publicly available information: IP address, Datetime, technical informtion (Desktop resolution, browser size , etc...) and other various metrics to make the website more customized and optimized to visitor.\
<br/>• We do not collect any personal information that is not related to functionality of the website. \
<br/>• If you consent, we may also use the information we collect to send you an infrequent newsletter about our products.\
<br/>• WE DO NOT COLLECT CREDIT CARD or PAYPAL INFORMATION. When you purchase something, these information is required on 3rd party payment-processor websites, and we even do not have any access to those information. \
<br/>• We may collect some more personal information when you make an order on our site (see next paragraph).\
</p>\
<br/><h2>How do we collect an information?</h2> \
<p>\
We collect information using "cookie" files (used list of cookies is listed in the bottom of this page), 3rd party analytic tools (like Google Analytics or etc) or using our website system, when you :\
<br/>• Visit our website;\
<br/>• Make a comment;\
<br/>• Send a request form;\
<br/>• When you order (purchase) something on this site;\
<br/>In those cases, we need to know your name, e-mail address, mailing address or some non-high-confidential data. \
</p>\
<br/><h2>How can you request a copy or erasure of information about you?</h2>\
On the site, you can use the form or direct email, which is available on "Contact Us" page.\
</p>\
<br/><h2>How do we use & protect the user information?</h2>\
<p>\
Our website is setup to use the secure server software (a.k.a. SSL), which encrypts all information you input before it is sent to us.We monitor customer traffic patterns and site usage to help us develop the design and layout of the site.\
As we have said, we do not have an access or store information related to credit-card, paypal or alternative payment systems. They are kept on the external websites (like PayPal.com, Google.com, Authorize.net or similar).\
We only store the session cookies about user solely for our website, to make it customised & personalised to user.\
Our site will not sell, trade, or rent your personal information to others. We may provide aggregate statistics about our customers, sales, traffic patterns, and related site information to reputable third-party vendors, but in typical cases, these statistics does not include personally identifying information. \
<br/>We may release account information to:\
<br/>• (a) comply with law;\
<br/>• (b) enforce or apply the terms of any of our user agreements;\
<br/>• (c) protect the rights, property or safety of our site, our users, or others.\
<br/>In other cases, we do not disclose the information to anyone, unless your personal consent (in written form).\
</p>\
<br/><h2>How to view or  delete your cookies</h2>\
<p>\
To delete cookies in your browser, please <a href="https://www.aboutcookies.org/" target="_blank">follow the instructions</a>.\
</p>\
<br/><h2>Your consent</h2>\
<p>\
By using our Web site, you consent to the collection and use of this information by our website. If we decide to change our privacy policy, we will post those changes on this page and notify users with available electronic forms (like Email), so that you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.\
</p>\
<h1>In summary</h1>\
<p>\
Our website is committed to protecting your privacy. We use the information we collect on the site to make shopping as easy and pleasant as possible. We do not sell, trade, or rent your personal information to others.\
</p>\
</div>\
';
		}
		
		else if (lang == "ge") 
		{
			privacy_policy_text_TT.privacy_polivy 		= 'კონფიდენციალურობის პოლიტიკა';
			privacy_policy_text_TT.output_bar_Notice	= 'საიტი იყენებს "cookies"-ებს. საიტის გამოყენებით თქვენ ეთანხმებით აღნიშნული საიტის მოხმარებისა და კონფიდენციალობის წესებს (<a _DEFAULT_A_ATTS_>დამატებითი ცნობები</a>).';
			privacy_policy_text_TT.output_bar_Agree 	= 'გასაგებია';
			privacy_policy_text_TT.output_privacy 		= 
'<div class="privacy_policy_text_TT">\
<h1 style="text-align:center;">პირადი ინფორმაციის მოხმარებისა და კონფიდენციალურობის წესები</h1>\
<p>\
'+website+' (შემდგომში ნახსენები როგორც "ჩვენი საიტი" ან "ჩვენ" ან "საიტი") საიტის მუშაობა გარკვეულწილად ეყრდნობა მომხმარებლებისაგან მიღებულ ინფორმაციას, შესაბამისად საიტი შემომსვლელისაგან აგროვებს გარკვეულ ინფორმაციას. ეს ინფორმაცია მხოლოდამხოლოდ გამოიყენება იმისათვის, რათა საიტი გამართულად და მომხმარებელზე ორიენტირებულად მუშაობდეს. </p>\
<br/><h2>რა ინფორმაციას აგროვებს ჩვენი საიტი?</h2>\
<br/>• საიტი აგროვებს საჯაროდ ხელმისაწვდომ ინფორმაციას, როგორიცაა : IP მისამართი, დრო, ტექნიკური მონაცემები (ეკრანის გაფართოება, ბრაუზერი, ა.შ.) და უამრავი სხვადასხვა ტექნიკურ & კომპუტერული ინფორმაცია, რათა საიტის ფუნქციონალურობა იყოს იმგვარი, რომ მომხმარებეს დახვდეს მისი მოწყობილობის შესაბამისი იერსახე, სტრუქტურა და საბოლოო ჯამში იყოს მომხმარებელზე მორგებული.\
<br/>• ჩვენ არ ვაგროვებთ სხვა სახის ინფორმაციას, რაც არ არის დაკავშირებული საიტის მუშაობასთან. \
<br/>• ჩვენ არ ვაგროვებთ ფინანსურ ან საკრედიტო სახის ინფორმაციას (როგორიცაა პლასტიკური ბარათები, PayPal ან მსგავსი). იმ შემთვევაში თუ კონკრეტულად ამ საიტზე საჭირო იქნება ფინანსური ოპერაციის განხორციელება, ეს უშალოდ ხდება მესამე პირის საიტებზე (მაგალითად Paypal.Com-ზე, Authorize.net-ზე ან რომელიმე ბანკისა თუ ფინანსური დაწესებულების საიტზე), ასე რომ ჩვენ არავითარი კავშირი/შეხება არ გვაქ დასახელებულ მონაცემებთან. \
<br/>• ჩვენ შეიძლება შევაგროვოთ დამატებითი პერსონალური ინფორმაცია როცა მომხმარებელი ამ საიტზე ანხორციელებს რაიმე ოპერაციას ან ტრანზაქციას (თუკი ამ საიტზე ესეთი რამ საერთოდ წარმოდგენილია).\
<br/>• მხოლოდ იმ შემთხვევაში, თუ თავად მომხმარებელი დაეთანხმება, შესაძლებელია მას გადავუგზავნოთ პერსონალური შეტყობინებებიც\
</p>\
<br/><h2>როგორ ვაგროვებთ ინფორმაციას?</h2> \
<p>\
ჩვენ ვაგროვებთ ინფორმაციას ე.წ. "cookie" ფაილების მეშვეობით (მათი კონკრეტული სიის ჩამონათვალი იხილეთ ამ გვერდის ძირში), ასევე დამხმარე პროგრამებისა (მაგ: Google Analytics და ა.შ.) ანდა საიტის ფუნქციონალის მეშვეობით, როცა თქვენ :\
<br/>• სტუმრობთ და ათვალიერებთ გვერდს;\
<br/>• აკეთებთ კომენტარს;\
<br/>• ავსებთ ან აგზავნით რაიმე ფორმას;\
<br/>• აკეთებთ ფინანსურ ან არასტანდარტულ ოპერაციას (თუკი საიტზე ასეთი რამ საერთოდაც წარმოდგენილია);\
<br/>ამ შემთხვევებში, ჩვენ შეიძლება დაგვჭირდეს თქვენი ვინაობის, იმეილის, მისამართისა თუ სხვა პერსონალური ინფორმაციის გაგება (რომლებიც, როგორც წესი, არ არის წაროადგენს ძალზედ კონფიდენციალურ ინფორმაციას და საჭიროა მომხმარების ვიანობის იდენტიფიცირებაში)\
</p>\
<br/><h2>როგორ შეგიძლიათ მოითხოვოთ თქვენზე შეგროვებული პერსონალური ინფორმაცია ან მისი წაშლა</h2>\
თუკი გნებავთ თქვენზე შეგროვებული კონფიდენციალური ინფორმაციის (თუკი ასეთი რამ საერთოდ შეგროვილია ამ საიტის მიერ) შეგიძლიათ გამოიყენოთ "კავშირის" გვერდი და მოგვმართოთ და ჩვენ დაგეხმარებით.\
</p>\
<br/><h2>როგორ ვიყენებთ და ვიცავთ ინფორმაციას?</h2>\
<p>\
როგორც აღვნიშნეთ, ჩვენ ვიყენებთ მომხმარებლებისაგან შეგროვებულ ინფორმაციას რათა მოხდეს ოპტიმიზება თავად საიტის მომხმარებლებზე.  ჩვენი ვებსაიტი იყენებს ინფორმაციის დაცული გადაცემის ტექნოლოგიას (ე.წ. SSL) რომელიც უზრუნველყოფს თქვენსა და საიტს შორის არსებული ინფორმაციის მიწოდებისა და გაცვლის დაშიფრვას. ჩვენი საიტი არ ყიდის, ცვლის ან ავრცელებს თქვენზე შეგროვებულ ინფორმაციას. ჩვენმა საიტმა შეიძლება მიაწოდოს ინფორმაცია საიტის მომხმარებლებისა თუ ამ საიტზე განხორციელებული მოქმედებების შესახებ ზოგიერ მაღალი რეპუტაციის მქონდე სერვისებს (როგორიცა Google, Yahoo და ა.შ.), თუმცა ეს ინფორმაცია არის ზოგადი, სტატისტიკასთან დაკავშირებული ინფორმაცია და არა პირადი/კონფიდენციალური/ფინანსური-ანგარიშების ინფორმაცია.\
<br/>ჩვენ ასევე შეიძლება მომხმარებლების შესახებ ინფორმაცია გავცეთ იმ შემთხვევაში:\
<br/>• (a) რათა კანონმდებლობასთან შესაბამისობა არ დავარღვიოთ, თუკი ამის მოთხოვნა წაგვეყენება;\
<br/>• (b) თუ ეს განსაზღვრულია თავად მომხმარებლის მიერ დადებულ ხელშეკრულებაში;\
<br/>• (c) რათა დაცულ იქნეს საკუთრების, ავტორის და ინტერნეტის გამყენების სავალდებულო წესები და უსაფრთხოების მოთხოვნები.\
<br/> სხვა შემთხვევებში ჩვენ არ გავცემთ ინფორმაციას სხვებზე, თუკი ამის თანხმობა თქვენგან არ გვექნება.\
</p>\
<br/><h2>როგორ შეგიძლიათ იხილოთ ან წაშალოთ ე.წ. "Cookie"-ები?</h2>\
<p>\
რომ იხილოთ და წაშალოთ ე.წ. "Cookie"-ები, საჭიროა <a href="https://www.aboutcookies.org/" target="_blank">გამოიყენოთ აქ არსებული ინსტრუქცია</a>.\
</p>\
<br/><h2>თქვენი თანხმობა</h2>\
<p>\
ამ საიტის გამოყენებით, თქვენ ავტომატურად აცხადებთ თანხმობას ჩვენს მიერ ინფორმაციის შეგროვებასა და გამოყენებაზე (როგორც ეს უკვე აღწერილი იყო). თუ ჩვენ გადავწყვეტთ შევცვალოთ ჩვენი "პირადი ინფორმაციის მოხმარებისა და კონფიდენციალურობის წესები" , ჩვემ ამ ცვლილებებს გამოვაქვეყნებთ ამ გვერდზევე, და შესაძლებლობის შემთხვევაში დარეგისტრირებულ მომხმარებლებს მივაწვდით ელექტრონული ფორმითაც (როგორიცაა იმეილი), ასე რომ თქვენ ყოველთვის უნდა იცოდეთ რომ ჩვენ ვაგროვებთ ინფორმაციას და ვიყენებთ მას საიტის ფუნქციონალურობისათვის.\
</p>\
<h1>რეზიუმე</h1>\
<p>\
ჩვენი საიტი მაქსიმალურად ხელს უწყობს მომხმარებელთა უფლებების დაცულობას. ჩვენ არ ვაქვეყნებთ ან გამოგვაქ საჯაროზე მომხმარებელთა პირადი ინფორმაცია და ვიყენებთ მას მხოლოდ საიტის მუშაობისათვის.\
</p>\
</div>\
';
		}
	},


	execute_insert : function()
	{
		var txt_output = '<style>.privacy_policy_text_TT{ margin: 50px 50px 100px; }</style>' + privacy_policy_text_TT.output_privacy;
		if ( privacy_policy_text_TT.target_id != "false" && document.getElementById(privacy_policy_text_TT.target_id) ){
			document.getElementById(privacy_policy_text_TT.target_id).innerHTML = txt_output;
		}
		//else if	()
		//{
			//var newElement = document.createElement("div");
			//newElement.innerHTML = txt_output; 
			//var thisScript = document.scripts[document.scripts.length - 1];
			//var parent = thisScript.parentElement;
			//if (parent.localName =="head") {
			//	alert('Please, create an element with an id "privacy_policy_text_TT" where you want the text to be rendered, or insert the script directly there.');
			//}
			//parent.insertBefore(newElement, thisScript.nextSibling);
		//}
		else if ( ttLibrary.url_contains(privacy_policy_text_TT.default_query) )
		{
			document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", '<meta name="robots" content="noindex, nofollow">');
			document.body.innerHTML = txt_output;
		}

		if (privacy_policy_text_TT.a_id && document.getElementById(privacy_policy_text_TT.a_id) ){
			document.getElementById(privacy_policy_text_TT.a_id).innerHTML	= privacy_policy_text_TT.privacy_polivy;
			document.getElementById(privacy_policy_text_TT.a_id).href		= '#'+privacy_policy_text_TT.default_query;
			document.getElementById(privacy_policy_text_TT.a_id).setAttribute("target","_blank");
		}
	}
};


window.addEventListener ? window.addEventListener("load", privacy_policy_text_TT.init, false) : window.attachEvent && window.attachEvent("onload", privacy_policy_text_TT.init);
 
 
 
 

// ================= typical JS lib  =================
ttLibrary = 
{
	Is_Cookie_Set : function (cookiename) { 
		return document.cookie.indexOf('; '+cookiename+'=');
	},
		
	setCookie : function (name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	},
	
	getCookie : function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	
	
	eraseCookie : function (name) {   
		document.cookie = name+'=; Max-Age=-99999999;';  
	},
	
	
	url_contains : function (string) {
		return window.location.href.search(string) != -1;
	},
	
	insertIntoHead : function(css_content)
	{
		var head	= document.head || document.getElementsByTagName('head')[0];
		var styleEl	= document.createElement('style');
		styleEl.type = 'text/css';
		if (styleEl.styleSheet)	styleEl.styleSheet.cssText = css_content;
		else					styleEl.appendChild(document.createTextNode(css_content)); 
		head.appendChild(styleEl);
	},
	
	readSelfParameters : function(target_id){
		var getVars = {};
		if(document.getElementById(target_id))
		{
			var queryString = document.getElementById(target_id).getAttribute('src').split("?").pop().split("&");
			for(var i=0;i<queryString.length;i++){
				var keyVal = queryString[i].split('=');
				getVars[ keyVal[0] ] = keyVal[1];
			}
		}
		return getVars;
	}
};
  
// ======================================================================




// alternate src: method https://pastebin.com/raw/1LDnvx6f
	
