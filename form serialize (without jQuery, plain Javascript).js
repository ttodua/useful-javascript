EXAMPLE: 
var myData = serializeForm('MyFormIDD'); 
//alert(myData);

<script type="text/javascript">
// https://github.com/tazotodua/useful-javascript/
function serializeForm(formID) {
	form = document.getElementById(formID) || document.forms[0];
	var elems = form.elements;
	var serialized = [], i, len = elems.length, str='';
	for(i = 0; i < len; i += 1) {
		switch(elems[i].type) {
			case 'text': case 'textarea':	case 'select-one': case 'radio': case 'checkbox': 
			serialized.push(elems[i].name + '=' + elems[i].value); break;
			default: break;
		}    
	}
	return serialized.join('&');
}
</script>
