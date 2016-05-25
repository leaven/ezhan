var svgPen = {
	init: function() {
		this.context = Snap("#svg");
		this.initData();

		//draw svg
		this.drawBigCircle();
		this.drawMidCircle();
		this.drawSmallCircle();

		this.bindEvents();
	},
	initData: function() {
		this.circlePoint = {
			x: 540,
			y: 1036
		}
		this.bigCircleRadius = 485;
		this.midCircleRadius = 335;
		this.smallCircleRadius = 200;
	},
	bindEvents: function() {
		this.bigCircle.click(function() {
			console.log('bigClick');
		});
		this.midCircle.click(function() {
			console.log('midClick');
		});
		this.smallCircle.click(function() {
			console.log('smallClick');
		});
	},
	drawBigCircle: function() {
		this.bigCircle = this.context.circle(this.circlePoint.x, this.circlePoint.y, this.bigCircleRadius);
		this.bigCircle.attr({
			fill: "transparent",
		    stroke: "#000",
		    strokeWidth: 5
		});
		this.context.image(__inline('./img/big_ball.png'), this.circlePoint.x-60, this.circlePoint.y-this.bigCircleRadius, 121, 121);
	},
	drawMidCircle: function() {
		this.midCircle = this.context.circle(this.circlePoint.x, this.circlePoint.y, this.midCircleRadius);
		this.midCircle.attr({
			fill: "transparent",
		    stroke: "#000",
		    strokeWidth: 5
		});
	},
	drawSmallCircle: function() {
		this.smallCircle = this.context.circle(this.circlePoint.x, this.circlePoint.y, this.smallCircleRadius);
		this.smallCircle.attr({
			fill: "transparent",
		    stroke: "#000",
		    strokeWidth: 5
		});
	},
}

svgPen.init();