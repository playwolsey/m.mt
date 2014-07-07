(function($) {
    $$('.login-btn button').addEvent('click', function(e) {
        e.preventDefault();
        if ('' === $('signin_username').get('value')) {
            $$('.invalid').removeClass('util-hidden');
            $$('.invalid .txt').set('text', '请输入帐号');
        } else if ('' === $('signin_password').get('value')) {
            $$('.invalid').removeClass('util-hidden');
            $$('.invalid .txt').set('text', '请输入密码');
        } else {
            new Request.JSON({
                url: '/miaotu521/login/loginMt.shtml',
                method: 'post',
                callbackKey: 'jsoncallback',
                onSuccess: function(responseJSON) {
                    if ("10010" === responseJSON.resultFlag) {
                        $$('.invalid').removeClass('util-hidden');
                        $$('.invalid .txt').set('text', '帐号或密码错误');
                    } else if ("10002" === responseJSON.resultFlag) {
                        $$('.invalid').removeClass('util-hidden');
                        $$('.invalid .txt').set('text', '邮箱未激活');
                    } else if ("00010" === responseJSON.resultFlag) {
                        $$('.invalid').removeClass('util-hidden');
                        $$('.invalid .txt').set('text', '帐号不存在');
                    } else if ("00001" === responseJSON.resultFlag) {
                        window.location = 'index.html';
                    }
                }
            }).send('username=' + $('signin_username').get('value') + '&password=' + $('signin_password').get('value'));
        }
    });
})(document.id);
