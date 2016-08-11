var load = document.getElementById('load');
var download = document.getElementById('download');
var divEl = document.getElementById('svgDiv');

load.addEventListener('click', function() {

	Pablo(divEl).load('/Untitled-2.svg');

});

var uri;

download.addEventListener('click', function() { 
	Pablo(divEl.firstElementChild).download('svg', 'circ.svg');
	// Pablo(divEl.firstElementChild).download('png', 'circ.png');
	
	// svg_to_pdf(document.querySelector("svg"), function (pdf) {
	// 	download_pdf('SVG.pdf', pdf.output('dataurlstring'));
	// });

});