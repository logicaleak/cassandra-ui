var $ = require('jquery');

module.exports.post_request = function(url, data, success_callback, error_callback) {
	$.ajax({
		url : url,
		data : JSON.stringify(data),
		method : 'POST',
 		xhrFields: {
	       withCredentials: true
	    },
		success : success_callback,
		error : error_callback
	});
}

module.exports.get_request = function(url, success_callback, error_callback) {
	$.ajax({
		url : url,
		method : 'GET',
 		xhrFields: {
	       withCredentials: true
	    },
		success : success_callback,
		error : error_callback
	});	
}
