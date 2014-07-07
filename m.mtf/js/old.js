(function() {
	isSignin();
	
	var id = getUrlPara("id")?getUrlPara("id"):'',
		price,
		name;
	
	$$('.sys-menu').addEvent('click', function(e){
	    var targetEl = e.target;    

	    if (targetEl === this) {
	        this.setStyle('height', '')

	        setTimeout(function() {
	            $$('.sys-menu').removeClass('show');
	        }, 400);
	    }
	    
	    if (targetEl.getParent().hasClass('sys-menu-mark')) {
	        if (this.hasClass('show')) {
	            this.setStyle('height','');
	            this.removeClass('show');
	        } else {
	            this.setStyle('height', document.body.get('height'));
	            this.addClass('show');
	        }
	    }
	});
	
	new Request.JSON({
        url: "/miaotu521/mtActivity/getMtActivity.shtml",
        method: 'post',
        callbackKey: 'jsoncallback',
        onSuccess: function(responseJSON, responseText) {
			$$('.m1-banner img').set('src', '../' + responseJSON.mta.pic_url);
    		$$('.title-content p').set('text', responseJSON.mta.title);
    		name = responseJSON.mta.title;
    		
    		$$('.js_highlights p').set('html', responseJSON.mta.description);
    		$$('.js_romance_time p').set('html', responseJSON.mta.travel_arrangements);
    		
    		$$('.desc_pic1').set('src', '../' + responseJSON.mta.desc_pic1);
    		$$('.desc_pic2').set('src', '../' + responseJSON.mta.desc_pic2);
    		$$('.desc_pic4').set('src', '../' + responseJSON.mta.desc_pic4);
    		$$('.desc_pic5').set('src', '../' + responseJSON.mta.desc_pic5);
        }
    }).send('id=' + id);
	
	$$('.book').addEvent('click', function(e) {
		e.stop();
		
		window.location.href = 'index.html';
	});
})();

function getUrlPara(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]); return null;
}