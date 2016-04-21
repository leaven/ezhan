require('/css/index.less');

var Dial = {
	tpl: __inline('/tpl/ball.tmpl'),
	_settings: {
		baseAngle: 3600 //基础旋转角度
	},
	searchParams: {
		big: '',
		mid: '',
		small: ''
	},
	//检查搜索条件是否满足
	checkSearch: function(){
		if(this.searchParams.big && this.searchParams.mid && this.searchParams.small) {
			return true;
		}else {
			return false;
		}
	},
	init: function() {
		this.$el = $('.dial');
		this.$circleWrapper = this.$el.find('.circle-wrapper');
		this.getSelector();
		this.getData();
	},
	bindEvents: function() {
		$(".dial").on("click", '[ball-event="rotate"]', this.rotate.bind(this));
		this.$el.on("click", '[ball-event="search"]', this.search.bind(this));
	},
	getSelector: function() {
		// this.$circle = this.$el.find('.dial-circle');
	},
	getRotate: function(cssAttr) {
		var reg = /rotateZ\([\-\+]?(\d+)deg\)/;
		return cssAttr.match(reg) ? cssAttr.match(reg)[1]: 0;
	},
	rotate: function(e) {
		//每次只能允许一个转盘旋转
		if(this.rotateLock && this.rotateLock === true) {
			return;
		}
		var $se = $(e.target);
		if(!$se.hasClass('ball')) {
			$se = $se.parents('.ball');
		}
		//如果已经高亮，点击无效
		if($se.hasClass('high-light')) {
			return;
		}
		this.rotateLock = true;
		$circle = $se.parents('.circle');
		
		var deg = this.getRotate($se.css("transform"));
		var baseDeg = this.getRotate($circle.css("transform"));
		var attr = $circle.data('attr');
		this.searchParams[attr] = $se.data('param');

		$circle.find(".high-light").removeClass('high-light');
		$circle.addClass('high-light');
		$se.addClass('high-light');
		$circle.css('transform', 'rotateZ('+(baseDeg+this._settings.baseAngle+360-deg)+'deg) scale(1.03)');
		$circle.on('transitionend', function() {
			$circle.off('transitionend');
			$circle.removeClass('high-light');
			this.rotateLock = false;
			if(this.checkSearch()) {
				this.search();
			}
		}.bind(this));
	},
	search: function() {
		console.log('search');
	},
	getData: function() {
		var data = {
		    "first": [
		        {
		        	"id": 1, 
		        	"name": "1"
		        },
		        {
		        	"id": 2, 
		        	"name": "2"
		        },
		        {
		        	"id": 3, 
		       		"name": "3"
		       	},
		        {
		        	"id": 4, 
		        	"name": "4"
		        }
		     ], 
		    "second": [
		        {
		        	"id": 1, 
		       		"name": "1"
		       	},
		        {
		        	"id": 2, 
		        	"name": "2"
		    	},
		        {
		        	"id": 3, 
		        	"name": "3"
		        },
		        {
		        	"id": 4, 
		       		"name": "4"
		       	}
		    ], 
		    "third": [
		        {
		        	"id": 1, 
		       		"name": "1"
		    	},
		        {
		        	"id": 2, 
		        	"name": "2"
		    	},
		        {
		        	"id": 3, 
		        	"name": "3"
		        },
		        {
		        	"id": 4, 
		        	"name": "4"
		        }
		      ]
		}

		this.render(data);
	},
	render: function(data) {
		var classMap = {
			"first": "big",
			"second": "mid",
			"third": "small"
		}
		this.$circleWrapper.html(this.tpl({data: data, classMap: classMap}));
		this.bindEvents();
	}
}
$(function() {
	$("body").height(document.documentElement.clientHeight).width(document.documentElement.clientWidth);
	Dial.init();
})