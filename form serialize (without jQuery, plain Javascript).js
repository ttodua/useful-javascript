//https://github.com/tazotodua/useful-javascript/
function serializeForm(formID) {
	form = document.getElementById(formID) || document.forms[0];
	var elems = form.elements;
	var serialized = [], i, len = elems.length, str='';
	for(i = 0; i < len; i += 1) {
	var element = elems[i];
	var type = element.type;
	var name = element.name;
	var value = element.value;
	switch(type) {
		case 'text':
		case 'radio':
		case 'checkbox':
		case 'textarea':
		case 'select-one':
			str = name + '=' + value;
			serialized.push(str);break;
		default:
			break;
		}    
	}
return serialized.join('&');
}
