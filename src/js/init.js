require('/css/index.less');

var Dial = {
	tpl: __inline('/tpl/ball.tmpl'),
	_settings: {
		baseAngle: 3600 //基础旋转角度
	},
	init: function() {
		this.$el = $('.dial');
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
		var $se = $(e.target);
		if($se.hasClass('ball')) {
			$se = $se.parents('.ball');
		}
		$circle = $se.parents('.circle');
		
		var deg = this.getRotate($se.css("transform"));
		var baseDeg = this.getRotate($circle.css("transform"));
		$(".high-light").removeClass('high-light')
		$circle.addClass('high-light');
		console.log(this);
		$circle.css('transform', 'rotateZ('+(baseDeg+this._settings.baseAngle+360-deg)+'deg)');
		// console.log($circle);
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
		this.$el.append(this.tpl({data: data, classMap: classMap}));
		this.bindEvents();
	}
}
$(function() {
	$("body").height(document.documentElement.clientHeight).width(document.documentElement.clientWidth);
	Dial.init();
})