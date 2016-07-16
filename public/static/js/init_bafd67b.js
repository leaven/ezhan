define("js/init",function(require,exports,module){var Dial={tpl:function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+="",Object.keys(classMap).forEach(function(t){__p+='\n	<div class="circle '+(null==(__t=classMap[t])?"":__t)+'-circle"  data-attr="'+(null==(__t=classMap[t])?"":__t)+'">\n		<div class="circle-scale">\n			';var a=360/data[t].length;__p+="\n			",data[t].forEach(function(e,i){__p+='\n				<div class="ball '+(null==(__t=classMap[t])?"":__t)+'-ball" data-param="'+(null==(__t=e.id)?"":__t)+'" style="-webkit-transform:rotateZ('+(null==(__t=a*i)?"":__t)+'deg)" ball-event="rotate">\n					';var n=e.name.length,s="";__p+="\n					",n>=10?(__p+="\n						",s="long-name",__p+="\n					"):n>=8&&(__p+="\n						",s="mid-name",__p+="\n					"),__p+='\n					<span class="ball-name '+(null==(__t=s)?"":__t)+'"  style="-webkit-transform:rotateZ(-'+(null==(__t=a*i)?"":__t)+"deg)\" data-baseangle='-"+(null==(__t=a*i)?"":__t)+"'>"+(null==(__t=e.name)?"":__t)+"</span>\n				</div>\n			"}),__p+="\n		</div>\n	</div>\n"}),__p+="";return __p},_settings:{baseAngle:0},searchParams:{big:"",mid:"",small:""},checkSearch:function(){return this.searchParams.big&&this.searchParams.mid&&this.searchParams.small?!0:!1},getQueryParams:function(t){t=t.replace(/\+/g," ");for(var a,e={},i=/[?&]?([^=]+)=([^&]*)/g;a=i.exec(t);)e[decodeURIComponent(a[1])]=decodeURIComponent(a[2]);return e},init:function(){this.$el=$(".dial"),this.$circleWrapper=this.$el.find(".circle-wrapper"),this.getSelector(),this.getToken(),this.getData()},bindEvents:function(){$(".dial").on("click",'[ball-event="rotate"]',this.rotate.bind(this)),this.$el.on("click",'[ball-event="search"]',this.search.bind(this)),$("body").on("click",'[ball-event="find"]',this.goFind.bind(this))},getSelector:function(){},getRotate:function(t){var a=/rotateZ\([\-\+]?(.+)deg\)/;return parseFloat(t.match(a)?t.match(a)[1]:0)},rotate:function(t){try{if(this.rotateLock&&this.rotateLock===!0)return;var a=$(t.target);if(a.hasClass("ball")||(a=a.parents(".ball")),a.hasClass("high-light"))return;this.rotateLock=!0,$circle=a.parents(".circle");var e=this.getRotate(a.css("-webkit-transform")),i=this.getRotate($circle.css("-webkit-transform")),n=(360-i%360)%360,s=$circle.data("attr");this.searchParams[s]=a.data("param"),$("."+s+"-circle-bg").addClass("high-light"),$circle.find(".high-light").removeClass("high-light"),$circle.addClass("high-light"),a.addClass("high-light");var r=i+this._settings.baseAngle+(360-e)%360+n;$circle.css("-webkit-transform","rotateZ("+r+"deg)").find(".circle-scale"),$circle.find(".ball-name").forEach(function(t){$(t).css("-webkit-transform","rotateZ("+($(t).data("baseangle")-r)%360+"deg)")}.bind(this)),$circle.on("webkitTransitionEnd",function(){$circle.off("webkitTransitionEnd").removeClass("high-light"),$("."+s+"-circle-bg").removeClass("high-light"),this.rotateLock=!1,this.checkSearch()&&setTimeout(this.search.bind(this),300)}.bind(this))}catch(t){alert(JSON.stringify(t))}},search:function(){var t={};t.big=this.searchParams.big||0,t.mid=this.searchParams.mid||0,t.small=this.searchParams.small||0,location.href="http://182.92.201.177:8080/list.html?first="+t.big+"&second="+t.mid+"&third="+t.small+"&token="+this.token},getToken:function(){this.token=this.getQueryParams(location.search).token||$.fn.cookie("token")},getData:function(){var t,a=this.getQueryParams(location.search).plat||0;switch(a){case"1":t="/data/list1.json";break;case"2":t="/data/list2.json";break;case"3":t="/data/list3.json";break;default:t="http://182.92.201.177:8081/queryIndexSearch.do"}var e=a?"json":"jsonp";$.ajax({url:t,type:"get",dataType:e,data:{data:JSON.stringify({token:this.token})},success:function(t){this.render(t.body)}.bind(this),error:function(t){console.log(t)}})},goFind:function(){location.href="http://182.92.201.177:8080/list.html?token="+this.token},render:function(t){var a={first:"big",second:"mid",third:"small"};this.$circleWrapper.html(this.tpl({data:t,classMap:a})),this.bindEvents()}};$(function(){$("body").height(document.documentElement.clientHeight).width(document.documentElement.clientWidth),Dial.init()})});