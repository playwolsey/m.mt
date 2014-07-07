(function($) {
	var id = getUrlPara("id")?getUrlPara("id"):'',
		price = getUrlPara("price")?getUrlPara("price"):'',
		name = getUrlPara("name")?getUrlPara("name"):'',
		order_id = getUrlPara("order_id")?getUrlPara("order_id"):'',
		people_count = $$('.num-input'),
		
		formFlag = false,
		wait = 120,
		regMobile = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
		
		inputPayerName = $$('input[name="pay_name"]'),
		inputPhone = $$('input[name="phone"]'),
		inputIDCard = $$('input[name="card"]');
		
	$('activity_id').set('value', id);
	$('order_name').set('value', name);
	$('order_id').set('value', order_id);
	$('order_price').set('value', price);
		
	$$('.in-price').set('text', price * people_count.get('value')[0]);
	$$('.mod2 p').set('text', unescape(name));
	
    $$('.mod1 button, .book').addEvent('click', function(e) {
        e.stop();
        window.location = 'super.html?id=' + id;
    });

    $('js_mul_people').addEvent('click', function(e) {
        e.stop();

        if (people_count.get('value') <= 1) {
    		return;
    	} else {
    		people_count.set('value', parseInt(people_count.get('value')[0]) - 1);
    		$$('.in-price').set('text', price * people_count.get('value')[0]);
    	}
    });
    $('js_add_people').addEvent('click', function(e) {
        e.stop();

        if (people_count.get('value') >= 30) {
    		return;
    	} else {
    		people_count.set('value', parseInt(people_count.get('value')[0]) + 1);
    		$$('.in-price').set('text', price * people_count.get('value')[0]);
    	}
    });
    
    $('start-book-btn').addEvent('click', function(e){
    	if ('' === inputPayerName[0].get('value')) {
    		phoneAlert('请输入姓名');
    		e.preventDefault();
    	}
    	
    	if ('' === inputIDCard[0].get('value')) {
    		phoneAlert('请输入身份证');
    		e.preventDefault();
    	}
    	
    	if ('' === inputPhone[0].get('value')) {
    		phoneAlert('请输入手机号');
    		e.preventDefault();
    	} else if (!regMobile.test(inputPhone[0].get('value'))) {
			phoneAlert('手机号格式错误');
			e.preventDefault();
    	}
    	
    	$$('form.contact-form').submit();
    });
})(document.id);


function getUrlPara(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]); return null;
}

function phoneAlert(msg) {
	var infoElement = new Element('div', {
		class: "infoTips",
		html: '<div class="inner"><img class="iinfo" src="imgs/m_info-err.png"><span class="txt">' + msg + '</span></div>'
	});
	
	infoElement.inject(document.body);
	$$('.infoTips').setStyles({
		display: 'block',
		position: 'fixed',
		margin: 0,
		top: '24%',
		left: '24%'
	});
	
	setTimeout(function(){
		$$('.infoTips').setStyle('display', 'none');
		$$('.infoTips').destroy();
	}, 1000);
}