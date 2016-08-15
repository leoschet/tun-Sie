var load = document.getElementById('load');
var downloadSVG = document.getElementById('downloadSVG');
var downloadPNG = document.getElementById('downloadPNG');
var divEl = document.getElementById('svgDiv');

load.addEventListener('click', function() {

	Pablo(divEl).load('/images/Untitled-2.svg');

});

var uri;

downloadSVG.addEventListener('click', function() { 
	Pablo(divEl.firstElementChild).download('svg', 'circ.svg');
	
	// svg_to_pdf(document.querySelector("svg"), function (pdf) {
	// 	download_pdf('SVG.pdf', pdf.output('dataurlstring'));
	// });

});

downloadPNG.addEventListener('click', function() { 
	Pablo(divEl.firstElementChild).download('png', 'circ.png');
});