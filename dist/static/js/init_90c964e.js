define('js/init', function(require, exports, module) {

  var Dial = {
  	tpl: function(obj){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  with(obj||{}){
  __p+='';
  Object.keys(classMap).forEach(function(k){
  __p+='\n\t<div class="circle '+
  ((__t=(classMap[k]))==null?'':__t)+
  '-circle"  data-attr="'+
  ((__t=(classMap[k]))==null?'':__t)+
  '">\n\t\t<div class="circle-scale">\n\t\t\t';
   var perAngel = (360/data[k].length); 
  __p+='\n\t\t\t';
  data[k].forEach(function(item, index){
  __p+='\n\t\t\t\t<div class="ball '+
  ((__t=(classMap[k]))==null?'':__t)+
  '-ball" data-param="'+
  ((__t=(item.id))==null?'':__t)+
  '" style="-webkit-transform:rotateZ('+
  ((__t=(perAngel*index))==null?'':__t)+
  'deg)" ball-event="rotate">\n\t\t\t\t\t';
  var strlength = item.name.length, ball_name_sp=""; 
  __p+='\n\t\t\t\t\t';
   if(strlength >= 10){ 
  __p+='\n\t\t\t\t\t\t';
  ball_name_sp="long-name"; 
  __p+='\n\t\t\t\t\t';
  }else if(strlength >=8){ 
  __p+='\n\t\t\t\t\t\t';
  ball_name_sp="mid-name"; 
  __p+='\n\t\t\t\t\t';
  }
  __p+='\n\t\t\t\t\t<span class="ball-name '+
  ((__t=(ball_name_sp))==null?'':__t)+
  '"  style="-webkit-transform:rotateZ(-'+
  ((__t=(perAngel*index))==null?'':__t)+
  'deg)" data-baseangle=\'-'+
  ((__t=(perAngel*index))==null?'':__t)+
  '\'>'+
  ((__t=(item.name))==null?'':__t)+
  '</span>\n\t\t\t\t</div>\n\t\t\t';
  })
  __p+='\n\t\t</div>\n\t</div>\n';
  })
  __p+='';
  }
  return __p;
  },
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
  		this.getToken();
  		this.getData();
  	},
  	bindEvents: function() {
  		$(".dial").on("click", '[ball-event="rotate"]', this.rotate.bind(this));
  		this.$el.on("click", '[ball-event="search"]', this.search.bind(this));
  		$("body").on("click", '[ball-event="find"]', this.goFind.bind(this));
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
  		params.big = this.searchParams.big || 0;
  		params.mid = this.searchParams.mid || 0;
  		params.small = this.searchParams.small || 0;
  		location.href = "http://182.92.201.177:8080/list.html?first="+params.big+"&second="+params.mid+ "&third="+params.small+"&token="+this.token;
  	},
  	getToken: function() {
  		this.token = (this.getQueryParams(location.search))['token'] || $.fn.cookie('token');	
  	},
  	getData: function() {
  		var plat = this.getQueryParams(location.search)['plat'] || 0, url;
  		switch(plat) {
  			case '1': 
  				url = '/data/list1.json';
  				break;
  			case '2':
  				url = '/data/list2.json';
  				break;
  			case '3': 
  				url = '/data/list3.json';
  				break;
  			default: 
  				url = 'http://182.92.201.177:8081/queryIndexSearch.do';
  		}
  		var dataType = plat ? 'json' : 'jsonp';
  		
  		$.ajax({
  			url: url,
  			type:'get',
  			dataType: dataType,
  			data:{
  				"data":JSON.stringify({
  					token: this.token
  				})
  			},
  			success: function(data) {
  				this.render(data.body);
  			}.bind(this),
  			error: function(msg){
  				console.log(msg);
  			}
  		})
  	},
  	goFind: function(){
  		location.href = 'http://182.92.201.177:8080/list.html?token='+ this.token;
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

});
