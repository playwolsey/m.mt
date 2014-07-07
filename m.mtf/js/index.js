var activityType = {
	superActivity: function() {
		var itemArr = [],
			templateHtml = '<div class="hd">'
						+        '<span class="price"><em></em></span>'
						+        '<a class="actitle">'
						+            '<div class="title">'
						+               '<br>'
						+               '<em></em>'
						+            '</div>'
						+        '</a>'
						+    '</div><!-- end .hd -->'
						+    '<div class="bd">'
						+        '<div class="pic">'
						+            '<a><img/></a>'
						+            '<div class="info"><div class="txt commend">查看详情</div></div>'
						+        '</div>'
						+  '</div><!-- end .bd -->',    
			divItem = new Element('div', {
				html: templateHtml,
				'class': 'item'
			});
		
		new Request.JSON({
		    url: "/miaotu521/mtActivity/mtaListWap.shtml",
		    method: 'post',
		    callbackKey: 'jsoncallback',
		    onSuccess: function(responseJSON, responseText) {
				for (var i = 1, len = responseJSON.mtalist.length; i < len; i++) {
					(function() {
						itemArr[i] = divItem.clone();
						itemArr[i].inject($$('.js-list-container')[0]);
					})(i);
				}
				
				itemArr.each(function(item, index) {
					item.getElement('.actitle').set('href', 'super.html?id=' + responseJSON.mtalist[index].id);
	    			item.getElement('.pic a').set('href', 'super.html?id=' + responseJSON.mtalist[index].id);
	    			item.getElement('.actitle .title').set('text', responseJSON.mtalist[index].title);
	    			item.getElement('.pic img').set('src', '../' + responseJSON.mtalist[index].pic_url);
	    			item.getElement('.price em').set('text', '￥' + responseJSON.mtalist[index].mt_price + '/人');
				});
		    }
		}).send();
	},
	onedayActivity: function() {
		/* behavior */
	},
	oldActivity: function() {
		var itemArr = [],
		templateHtml = '<div class="hd">'
					+        '<a class="actitle">'
					+            '<div class="title">'
					+               '<br>'
					+               '<em></em>'
					+            '</div>'
					+        '</a>'
					+    '</div><!-- end .hd -->'
					+    '<div class="bd">'
					+        '<div class="pic">'
					+            '<a><img/></a>'
					+            '<div class="info"><div class="txt commend">查看详情</div></div>'
					+        '</div>'
					+  '</div><!-- end .bd -->',    
		divItem = new Element('div', {
			html: templateHtml,
			'class': 'item'
		});
	
		new Request.JSON({
		    url: "/miaotu521/mtActivity/mtaListWap.shtml",
		    method: 'post',
		    callbackKey: 'jsoncallback',
		    onSuccess: function(responseJSON, responseText) {
				for (var i = 0, len = responseJSON.mtalist1.length; i < len; i++) {
					(function() {
						itemArr[i] = divItem.clone();
						itemArr[i].inject($$('.js-list-container')[0]);
					})(i);
				}
				
				itemArr.each(function(item, index) {
					item.getElement('.actitle').set('href', 'old.html?id=' + responseJSON.mtalist1[index].id);
	    			item.getElement('.pic a').set('href', 'old.html?id=' + responseJSON.mtalist1[index].id);
	    			item.getElement('.actitle .title').set('text', responseJSON.mtalist1[index].title);
	    			item.getElement('.pic img').set('src', '../' + responseJSON.mtalist1[index].pic_url);
				});
		    }
		}).send();
	},
    defaultActivity: function() { /* behavior */ }
};
	 
var getActivity = function(type) {
    var activityToDo = activityType.hasOwnProperty(type) ? type : "defaultActivity"
    	activityType[activityToDo]();
};

(function() {
	isSignin();
	
	getActivity('superActivity');
	
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
	
	$$('.js_super_activity').addEvent('click', function(e){
		e.stop();
		
		$$('.reg-target-category h2.title').set('text', '官方旅行团');
		$$('.js-list-container').set('html', '');
		getActivity('superActivity');
	});
	$$('.js_oneday_activity').addEvent('click', function(e){
		e.stop();
		
		getActivity('onedayActivity');
	});
	$$('.js_old_activity').addEvent('click', function(e){
		e.stop();
		
		$$('.reg-target-category h2.title').set('text', '往期回顾');
		
		$$('.js-list-container').set('html', '');
		getActivity('oldActivity');
	});
	
	$$('.js_go_account').addEvent('click', function(e) {
		e.stop();
		
		if (IsLogin) {
			window.location.href = 'account.html';
		} else {
			window.location.href = 'signin.html';
		}
	});
})();