(function() {
	var regMobile = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
	    regNick = /^[a-zA-Z0-9\u4e00-\u9fa5_]{2,20}$/,
	    regPassword = /^[\d\w\.\!\#\$\%\^\*\'\+\-\/\`\@\(\)\[\]\\\:\;\"\,\<\>\?\=\_\{\|\}\~]{6,20}$/,
	
	    inputMobile = $$(".controls")[0].getElement('input'),
	    //inputVcode = $$(".controls")[1].getElement('input'),
	    inputNick = $$(".controls")[1].getElement('input'),
	    inputPassword = $$(".controls")[2].getElement('input'),
	    
	    validMobile = $$(".invalid")[0],
	    //validVcode = $$(".invalid")[1],
	    validNick = $$(".invalid")[1],
	    validPassword = $$(".invalid")[2],
	    
	    wait = 120;
	
	$$('.controls input').addEvent('click', function(e) {
		e.stop();
		$$(".invalid").addClass('util-hidden');
	});
	
	/*$$('.js_get_vcode').addEvent('click', function(e) {
		e.preventDefault();
		
		if ('' === inputMobile.get('value').trim()) {
			validMobile.removeClass('util-hidden');
			validMobile.getElement('.txt').set('text', '请输入手机号');
		} else {
			if (!regMobile.test(inputMobile.get('value'))) {
				validMobile.removeClass('util-hidden');
				validMobile.getElement('.txt').set('text', '手机号格式错误');
			} else {
				countDown(this);
				
				new Request.JSON({
		            url: "/miaotu521/register/sendPhoneNum.shtml",
		            method: 'post',
		            callbackKey: 'jsoncallback',
		            onSuccess: function(responseText) {
		                if ("00001" != responseText.resultFlag) {
		                	validMobile.removeClass('util-hidden');
		        			validMobile.getElement('.txt').set('text', '验证码错误');
		                } 
		            }
		        }).send('phone=' + inputMobile.get("value").trim());
			}
		}
	});*/
	
	$$('.login-btn button').addEvent('click', function(e) {
		e.preventDefault();
		
		var sendContent = 'sex=男&birthday=1985-01-01'
    				+ '&province=浙江' 
    				+ '&city=杭州'
    				+ '&high=170'
    				+ '&education=本科'
    				+ '&marital_status=未婚' 
    				+ '&month_pay=2000-5000元' 
    				+ '&mail=' + '&phone=' + inputMobile.get('value') 
    				+ '&username=' + inputNick.get('value') + '&password=' + inputPassword.get('value')
    				+ '&stats=0';
		
		if ('' === inputMobile.get('value').trim()) {
			validMobile.removeClass('util-hidden');
			validMobile.getElement('.txt').set('text', '请输入手机号');
			return;
		} else {
			if (!regMobile.test(inputMobile.get('value'))) {
				validMobile.removeClass('util-hidden');
				validMobile.getElement('.txt').set('text', '手机号格式错误');
				return;
			}
		}
		
		/*if ('' === inputVcode.get('value').trim()) {
			validVcode.removeClass('util-hidden');
			validVcode.getElement('.txt').set('text', '请输入验证码');
			return;
		}*/
		if ('' === inputNick.get('value').trim()) {
			validNick.removeClass('util-hidden');
			validNick.getElement('.txt').set('text', '请输入用户名');
			return;
		} else {
			if (!regNick.test(inputNick.get('value'))) {
				validNick.removeClass('util-hidden');
				validNick.getElement('.txt').set('text', '用户名2到20个字符数字中文或下划线');
				return;
			}
		}
		
		if ('' === inputPassword.get('value').trim()) {
			validPassword.removeClass('util-hidden');
			validPassword.getElement('.txt').set('text', '请输入密码');
			return;
		} else {
			if (!regPassword.test(inputPassword.get('value'))) {
				validPassword.removeClass('util-hidden');
				validPassword.getElement('.txt').set('text', '密码6位到20位的字符');
				return;
			}
		}
		
		
		new Request.JSON({
			url: "/miaotu521/register/registerMtWap.shtml",
			method: 'post',
			callbackKey: 'jsoncallback',
			onSuccess: function(responseText) {
			    if ("00001" == responseText.resultFlag){
			    	window.location = 'signupsuccess.html';
			    } else if ("00015" == responseText.resultFlag) {
			    	validMobile.removeClass('util-hidden');
					validMobile.getElement('.txt').set('text', '请输入手机号');
			    } else if ("00013" == responseText.resultFlag) {
			    	validNick.removeClass('util-hidden');
					validNick.getElement('.txt').set('text', '请输入用户名');
			    } else if ("10006" == responseText.resultFlag) {
			    	validMobile.removeClass('util-hidden');
					validMobile.getElement('.txt').set('text', '手机号已注册');
			    } else if ("10016" == responseText.resultFlag) {
			    	validNick.removeClass('util-hidden');
					validNick.getElement('.txt').set('text', '用户名已经存在');
			    } else if ("10030" == responseText.resultFlag) {
			    	validNick.removeClass('util-hidden');
					validNick.getElement('.txt').set('text', '用户名已经存在');
			    }
			}
		}).send(sendContent);
	});
})();