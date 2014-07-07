var IsLogin = false;

var isSignin = function() {
	new Request.JSON({
        url: "/miaotu521/userInfo/getUserInfoSession.shtml",
        method: 'post',
        callbackKey: 'jsoncallback',
        onSuccess: function(responseJSON) {
			if ('00001' === responseJSON.resultFlag) {
				if ($$('.sys-menu')[0]) {
					$$('.sys-menu-item')[0].addClass('util-hidden');
					$$('.sys-menu-item')[1].addClass('util-hidden');
					$$('.sys-menu-item')[2].removeClass('util-hidden');
				}
				
				IsLogin = true;
			} else if ('00009' === responseJSON.resultFlag) {
				if ($$('.sys-menu')[0]) {
					$$('.sys-menu-item')[0].removeClass('util-hidden');
					$$('.sys-menu-item')[1].removeClass('util-hidden');
					$$('.sys-menu-item')[2].addClass('util-hidden');
				}
				
				IsLogin = false;
			} else {
				return;
			}
        }
    }).send();
};

//{{{ logout
$$('.js_logout').addEvent('click', function(){
	new Request.JSON({
        url: "/miaotu521/login/exitpage.shtml",
        method: 'post',
        callbackKey: 'jsoncallback',
        onSuccess: function(responseJSON, responseText) {
			IsLogin = false;
			window.location = 'index.html';
        }
    }).send();
});// end logout}}}