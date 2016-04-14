require('/css/index.less');

var Dial = {
	tpl: __inline('/tpl/ball.tmpl'),
	init: function() {
		this.$el = $('.dial');
		this.getData();
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
		this.$el.html(this.tpl({data: data}));
	}
}
$(function() {
	$("body").height(document.documentElement.clientHeight).width(document.documentElement.clientWidth);
	Dial.init();
})