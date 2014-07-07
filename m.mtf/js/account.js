(function() {
	new Request.JSON({
        url: "/miaotu521/myMainPage/toMyMainPage.shtml",
        method: 'post',
        callbackKey: 'jsoncallback',
        onSuccess: function(responseJSON, responseText) {
			$$('.c-txt .title').set('text', responseJSON.userInfo.username);
			$$('.c-img img').set('src', '../' + responseJSON.userInfo.url+ '/zhong/'+responseJSON.userInfo.pic_name);
        }
    }).send();
})();