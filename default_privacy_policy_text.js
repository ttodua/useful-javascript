
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
<br/><p style="text-align: center;"><strong>Privacy Policy</strong></p>\
<br/>\
<p>'+website+' (reffered as "our site" or "we") website is structured so that it uses some kind of data collection to identify visitor. Once you choose to provide us personally identifiable information (any information by which you can be identified), you can be assured that it will only be used to support your customer experience with our site. </p>\
<br/>\
<br/><h2>What information do we collect?</h2>\
<br/>\
<br/><p>\
<br/>We collect publicly available information: IP address, Datetime, User-experience related information (i.e. Desktop resolution, browser size or other various metrics) to make the website more sophisticated and optimized to visitor.\
<br/>\
<br/>We do not collect any personal information that is not related to our site. \
<br/>\
<br/>If you consent, we may also use the information we collect to send you an infrequent newsletter about our products.\
<br/>\
<br/>WE DO NOT COLLECT CREDIT CARD or PAYPAL INFORMATION. When you purcahse something, those information is required on 3rd party payment-processor websites, and we even do not have any access to those information. \
<br/>We may collect some more personal information when you make an order on our site (see next paragraph).\
<br/></p>\
<br/>\
<br/>\
<br/><h2>How do we collect an information?</h2> \
<br/><p>\
<br/>We collect information using "cookie" files (used list of cookies is listed in the bottom of this page), 3rd party analytic tools (like Google Analytics or etc) or using our website system, when you :\
<br/>- Make a comment;\
<br/>- Send a request form;\
<br/>- When you order (purchase) something on this site;\
<br/>\
<br/>In those cases, we need to know your name, e-mail address, mailing address or some non-high-confidential data. \
<br/></p>\
<br/>\
<br/><h2>How can you request a copy or erasure of information about you?</h2>\
<br/><p>\
<br/>On the site, you can use the form or direct email, which is available on "Contac Us" page.\
<br/></p>\
<br/>\
<br/>\
<br/><h2>How do we use the user information?</h2>\
<br/><p>\
<br/>We monitor customer traffic patterns and site usage to help us develop the design and layout of the site.\
<br/></p>\
<br/>\
<br/>\
<br/><h2>How do we protect customer information?</h2>\
<br/><p>\
<br/>As we have said, we do nott store information related to credit-card, paypal or alternative payment systems, so there is no chance of possible data breach from us, related to those information. They are kept on those external websites (like PayPal.com, Google.com, Authorize.net or similar).\
<br/>\
<br/>Our websites are setup to use the secure server software (SSL), which encrypts all information you input before it is sent to us. \
<br/></p>\
<br/>\
<br/>\
<br/>\
<br/><h2>Will we disclose the information it collects to outside parties?</h2>\
<br/><p>\
<br/>Our site will not sell, trade, or rent your personal information to others. We may provide aggregate statistics about our customers, sales, traffic patterns, and related site information to reputable third-party vendors, but in typical cases, these statistics does not include personally identifying information. \
<br/>We may release account information to:\
<br/>- (a) comply with law;\
<br/>- (b) enforce or apply the terms of any of our user agreements;\
<br/>- (c) protect the rights, property or safety of our site, our users, or others.\
<br/>\
<br/>In other cases, we do not disclose the information to anyone, unless your personal consent (in written form).\
<br/></p>\
<br/>\
<br/>\
<br/><h2>In summary</h2>\
<br/><p>\
<br/>Our website is committed to protecting your privacy. We use the information we collect on the site to make shopping as easy and pleasant as possible. We do not sell, trade, or rent your personal information to others.\
<br/></p>\
<br/>\
<br/>\
<br/><h2>Your consent</h2>\
<br/><p>\
<br/>By using our Web site, you consent to the collection and use of this information by our website. If we decide to change our privacy policy, we will post those changes on this page and notify users with available electronic forms (like Email), so that you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.\
<br/></p>\
<br/><h2>How to view or  delete your cookies</h2>\
<br/><p>\
<br/>To delete cookies in your browser:  You can right click your mouse on this page, then select INSPECT, and go to APPLICATION tab, then choose COOKIES and you can see all cookies we use. You can delete them by selecting them and clicking DELETE. Alternatively (especially if you use mobile devices), you can go to browser settings, in Privacy, and clear cookies for this website. \
<br/>To delete information from our site:  It was stated already above, please refer there.\
<br/></p>\
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
