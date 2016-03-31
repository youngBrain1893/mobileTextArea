var getComputedStyle = function(dom) {
	return window.getComputedStyle(dom, null);
}

var resizableTextArea = function(textDom) {
	var style = getComputedStyle(textDom),
		maxHeight = style.maxHeight !== 'none' ? parseInt(style.maxHeight, 10) : false;
	
	var changeResize = function(dom) {
		var originVal = dom.dataset.originVal || '',
		curVal = dom.value;
		dom.setAttribute('data-originVal', curVal);
		
		// value Not Change return
		if(originVal === curVal) {
			return
		}
		
		dom.style.height = 'auto';
		dom.style.height = dom.scrollHeight + 'px';
	}

	textDom.addEventListener('focus', function() {
		var self = this;
		var interval = setInterval(function(){
			changeResize(self);
		}, 300)
	}, false);

	textDom.addEventListener('blur', function() {
		var self = this;
       		clearTimeout(self.removeAttr('originVal'));
	 })

	textDom.addEventListener('touchstart', function(ev) {
		var self = this,
		ev = ev || window.event;
		
		self.setAttribute('start', ev.changedTouches[0].pageY);
	})

	textDom.addEventListener('touchmove', function(ev) {
		var self = this,
		ev = ev || window.event,
		distance = ev.changedTouches[0].pageY - self.getAttribute('start'),
		curScrollTop = self.scrollTop;
		self.scrollTop = curScrollTop - distance;
	})
}
