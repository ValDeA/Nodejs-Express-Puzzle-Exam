var pdata = 0;
var xn = 0,
	yn = 40,
	random = d3.randomNormal(20, .2),
	data = d3.range(xn).map(random);
var svg = d3.select("svg"),
	margin = {top: 20, right: 20, bottom: 20, left: 40},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var line;
        
function loadD3() {
	var x = d3.scaleLinear()
		.domain([0, xn])
		.range([0, width]);
	var y = d3.scaleLinear()
		.domain([0, yn ])
		.range([height-20, 0]);
	line = d3.line()
		.x(function(d, i) { return x(i); })
		.y(function(d, i) { return y(d); });
	g.append("defs").append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", width)
		.attr("height", height);
	g.append("g")
		.attr("class", "axisx")
		.attr("transform", "translate(0," + y(0) + ")")
		.call(d3.axisBottom(x))
		.append("text")
		.attr("x", 280)
		.attr("y", 30)
		.attr("fill", "#000")
		.text("통신 횟수");
	g.append("g")
		.attr("class", "axisy")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("transform", "translate(20, 20), rotate(90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("fill", "#000")
		.text("Time");
	g.append("g")
	.attr("clip-path", "url(#clip)")
	.append("path")
	.datum(data)
	.attr("class", "line")
	.transition()
	.duration(500)
	.ease(d3.easeLinear)
	.on("start", tick);
}

loadD3();

socket.on('stopwatch', (data) => {
	pdata = data;
	xn = xn + 1;

	console.log(data);

	g.selectAll("g").remove();
	loadD3();
});

function tick() {
	data.push(pdata);

	d3.select(this)
		.attr("d", line)
		.attr("transform", null);
	d3.active(this)
		.attr("transform", "translate(" + x(-1) + ",0)")
		.transition()
		.on("start", tick);
	data.shift();
}

function socketConnect() {
	var transData = document.getElementById("input").value;

	socket.emit('msg', transData);
}