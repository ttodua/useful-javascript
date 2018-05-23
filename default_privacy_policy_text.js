
/*
usage:

<script src="https://rawgit.com/tazotodua/useful-javascript/master/default_privacy_policy_text.js"></script>
<div id="privacy_policy_text"></div>
*/



/*

<div id="privacy_policy_text"></div>
<script type="text/javascript">
privacy_policy_text.lang="en";
var script = document.createElement('script');  
var host = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
script.src = host + 'localhost/privacy_policy_text.js';  
document.head.appendChild(script);

//var host = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
//document.write(unescape("%3Cscript src='" + host + "localhost/privacy_policy_text.js' type='text/javascript'%3E%3C/script%3E"));
</script>

*/
if (typeof privacy_policy_text == "undefined") {
   var privacy_policy_text= {};
}

if ( ! privacy_policy_text.hasOwnProperty("lang") )      privacy_policy_text.lang = "en";
if ( ! privacy_policy_text.hasOwnProperty("site") )      privacy_policy_text.site = location.host;

function privacy_policy_text_capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function privacy_policy_text_main() 
{
	var txt_output= "";
	var lang= privacy_policy_text.lang ;
	var website = privacy_policy_text_capitalizeFirstLetter( privacy_policy_text.site  );


	//	
	if (lang == "en") {
		
		txt_output = '\
<p style="text-align: center;"><strong>Privacy Policy</strong></p>\
\
<p>'+website+' (reffered as "our site" or "we") website is structured so that it uses some kind of data collection to identify visitor. Once you choose to provide us personally identifiable information (any information by which you can be identified), you can be assured that it will only be used to support your customer experience with our site. \
</p>\
\
<h2>What information do we collect?</h2>\
\
<p>\
We collect publicly available information: IP address, Datetime, User-experience related information (i.e. Desktop resolution, browser size or other various metrics) to make the website more sophisticated and optimized to visitor.\
\
We do not collect any personal information that is not related to our site. \
\
If you consent, we may also use the information we collect to send you an infrequent newsletter about our products.\
\
WE DO NOT COLLECT CREDIT CARD or PAYPAL INFORMATION. When you purcahse something, those information is required on 3rd party payment-processor websites, and we even do not have any access to those information. \
We may collect some more personal information when you make an order on our site (see next paragraph).\
</p>\
\
\
<h2>How do we collect an information?</h2> \
<p>\
We collect information using "cookie" files (used list of cookies is listed in the bottom of this page), 3rd party analytic tools (like Google Analytics or etc) or using our website system, when you :\
- Make a comment;\
- Send a request form;\
- When you order (purchase) something on this site;\
\
In those cases, we need to know your name, e-mail address, mailing address or some non-high-confidential data. \
</p>\
\
<h2>How can you request a copy or erasure of information about you?</h2>\
<p>\
On the site, you can use the form or direct email, which is available on "Contac Us" page.\
</p>\
\
\
<h2>How do we use the user information?</h2>\
<p>\
We monitor customer traffic patterns and site usage to help us develop the design and layout of the site.\
</p>\
\
\
<h2>How do we protect customer information?</h2>\
<p>\
As we have said, we do nott store information related to credit-card, paypal or alternative payment systems, so there is no chance of possible data breach from us, related to those information. They are kept on those external websites (like PayPal.com, Google.com, Authorize.net or similar).\
\
Our websites are setup to use the secure server software (SSL), which encrypts all information you input before it is sent to us. \
</p>\
\
\
\
<h2>Will we disclose the information it collects to outside parties?</h2>\
<p>\
Our site will not sell, trade, or rent your personal information to others. We may provide aggregate statistics about our customers, sales, traffic patterns, and related site information to reputable third-party vendors, but in typical cases, these statistics does not include personally identifying information. \
We may release account information to:\
- (a) comply with law;\
- (b) enforce or apply the terms of any of our user agreements;\
- (c) protect the rights, property or safety of our site, our users, or others.\
\
In other cases, we do not disclose the information to anyone, unless your personal consent (in written form).\
</p>\
\
\
<h2>In summary</h2>\
<p>\
Our website is committed to protecting your privacy. We use the information we collect on the site to make shopping as easy and pleasant as possible. We do not sell, trade, or rent your personal information to others.\
</p>\
\
\
<h2>Your consent</h2>\
<p>\
By using our Web site, you consent to the collection and use of this information by our website. If we decide to change our privacy policy, we will post those changes on this page and notify users with available electronic forms (like Email), so that you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.\
</p>\
';
	}


	var is_ID_set = privacy_policy_text.elementID || false;

	if(is_ID_set) {
		document.getElementById(is_ID_set).innerHTML = txt_output;
	}
	else if (document.getElementById("privacy_policy_text")){
		document.getElementById("privacy_policy_text").innerHTML = txt_output;
	}	
	else {
		var newElement = document.createElement("div");
		newElement.innerHTML = txt_output;

		var thisScript = document.scripts[document.scripts.length - 1];
		var parent = thisScript.parentElement;
		if (parent.localName =="head") {
			alert('Please, create an element with an id "privacy_policy_text" where you want the text to be rendered, or insert the script directly there.');
		}
		parent.insertBefore(newElement, thisScript.nextSibling);
	}



}

window.onload = privacy_policy_text_main;
