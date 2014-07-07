window.addEvent('domready', function() {
	var message,
		signature;
		
	if (getUrlPara("message")) {
		message = getUrlPara("message");
	}
	
	if (getUrlPara("signature")) {
		signature = getUrlPara("signature");
	}
	
	new Request.JSON({
		url: '/miaotu521/activityPay/checkPayReturnWap.shtml',
		method: 'post',
		callbackKey: 'jsoncallback',
		onSuccess: function(responseJSON, responseText) {
			if ('00001' == responseJSON.activityPayInfo.resultFlag) {
				window.location.href = 'success.html?id=' + responseJSON.activityPayInfo.activity_id;
			} else if ('00006' == responseJSON.activityPayInfo.resultFlag) {
				window.location.href = 'error.html?id=' + responseJSON.activityPayInfo.activity_id;
			} 
		}
	 }).send('message=' + message + '&signature=' + signature);
});