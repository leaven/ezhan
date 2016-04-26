require('/css/index.less');

var Dial = {
	tpl: __inline('/tpl/ball.tmpl'),
	_settings: {
		baseAngle: 0 //基础旋转角度
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
	getQueryParams: function(qs) {
	    qs = qs.replace(/\+/g, " ");
	    var params = {},
	        re = /[?&]?([^=]+)=([^&]*)/g,
	        tokens;
	 
	    while (tokens = re.exec(qs)) {
	        params[decodeURIComponent(tokens[1])]
	            = decodeURIComponent(tokens[2]);
	    }
	 
	    return params;
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
		var reg = /rotateZ\([\-\+]?(.+)deg\)/;
		return parseFloat(cssAttr.match(reg) ? cssAttr.match(reg)[1]: 0);
	},
	rotate: function(e) {
		try{
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
			
			var deg = this.getRotate($se.css("-webkit-transform"));
			var baseDeg = this.getRotate($circle.css("-webkit-transform"));
			console.log(deg+","+baseDeg);
			var rotateDeg = (360-baseDeg % 360) %360;
			var attr = $circle.data('attr');
			this.searchParams[attr] = $se.data('param');
			$("."+attr+"-circle-bg").addClass("high-light");
			$circle.find(".high-light").removeClass('high-light');
			$circle.addClass('high-light');
			$se.addClass('high-light');

			var circleRotateDeg = baseDeg+this._settings.baseAngle+(360-deg)%360+rotateDeg;
			$circle.css('-webkit-transform', 'rotateZ('+circleRotateDeg+'deg)' ).find('.circle-scale');
			
			$circle.find('.ball-name').forEach(function(ball) {
				$(ball).css('-webkit-transform', 'rotateZ('+($(ball).data('baseangle')-circleRotateDeg)%360+'deg)');
			}.bind(this));

			$circle.on('webkitTransitionEnd', function() {
				$circle.off('webkitTransitionEnd').removeClass('high-light')
				// .css('transform', 'rotateZ('+circleRotateDeg+'deg)');
				$("."+attr+"-circle-bg").removeClass("high-light");
				this.rotateLock = false;
				if(this.checkSearch()) {
					setTimeout(this.search.bind(this), 300);
				}
			}.bind(this));
		}catch(e){
			alert(JSON.stringify(e));
		}
	},
	search: function() {
		var params = {};
		params.big = this.searchParams.big || '全部';
		params.mid = this.searchParams.mid || '全部';
		params.small = this.searchParams.small || '全部';
		location.href = "http://182.92.201.177:8080/list.html?first="+params.big+"&second="+params.mid+ "&third="+params.small;
	},
	getData: function() {
		var token = (this.getQueryParams(location.search))['token'];
		$.ajax({
			url: 'http://182.92.201.177:8081/queryIndexSearch.do',
			type:'get',
			dataType: 'jsonp',
			data:{
				"data":JSON.stringify({
					token: token
				})
				// "appId": localStorage.getItem('channelAppid') ||0,
		  //   	"timestamp": Date.parse(new Date()),
		  //   	"methodName": 'addOrder',
		  //   	"version": '10',
			 //    "token": "2_1461509247_fbrdPmD96h-3",
			 //    "sign": '1'
			},
			success: function(data) {
				this.render(data.body);
			}.bind(this),
			error: function(msg){
				console.log(msg);
			}
		})
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

		// this.render(data);
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