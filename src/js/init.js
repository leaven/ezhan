require('/css/index.less');

var Dial = {
	tpl: __inline('/tpl/ball.tmpl'),
	init: function() {
		this.$el = $('.dial-circle');
		this.getData();
	},
	bindEvents: function() {
		$(".dial").on("click", '[ball-event="rotate"]', this.rotate);
	},
	rotate: function(e) {
		var $se = $(e.target);
		console.log($se);
	},
	getData: function() {
		var data = {
		    "first": [
		        {
		        	"id": 1, 
		        	"name": "拳击"
		        },
		        {
		        	"id": 2, 
		        	"name": "拳击"
		        },
		        {
		        	"id": 3, 
		       		"name": "拳击"
		       	},
		        {
		        	"id": 4, 
		        	"name": "拳击"
		        }
		     ], 
		    "second": [
		        {
		        	"id": 1, 
		       		"name": "拳击"
		       	},
		        {
		        	"id": 2, 
		        	"name": "拳击"
		    	},
		        {
		        	"id": 3, 
		        	"name": "拳击"
		        },
		        {
		        	"id": 4, 
		       		"name": "拳击"
		       	}
		    ], 
		    "third": [
		        {
		        	"id": 1, 
		       		"name": "拳击"
		    	},
		        {
		        	"id": 2, 
		        "name": "拳击"},
		        {
		        	"id": 3, 
		        	"name": "拳击"
		        },
		        {
		        	"id": 4, 
		        	"name": "拳击"
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
		this.$el.html(this.tpl({data: data, classMap: classMap}));
		this.bindEvents();
	}
}
$(function() {
	$("body").height(document.documentElement.clientHeight).width(document.documentElement.clientWidth);
	Dial.init();
})