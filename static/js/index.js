
var load = document.getElementById('load');
load.addEventListener('click', function() {
	var divEl = document.getElementById('svgDiv');
	Pablo(divEl).load('/images/modelo-certificado.svg');
});

var downloadSVG = document.getElementById('downloadSVG');
downloadSVG.addEventListener('click', function() {
	downloadSingle('svg');
}); 
	
// svg_to_pdf(document.querySelector("svg"), function (pdf) {
// 	download_pdf('SVG.pdf', pdf.output('dataurlstring'));
// });

var downloadPNG = document.getElementById('downloadPNG');
downloadPNG.addEventListener('click', function() {
	downloadSingle('png');
});

function downloadSingle(format) {

	var fileName = 'circle'

	var courseName = document.getElementById('course-name').value;
	var courseDuration = document.getElementById('course-duration').value;
	var courseInit = document.getElementById('course-init').value;
	var courseEnd = document.getElementById('course-end').value;


	var namesList = getNames(document.getElementById('names').value);
	var svgElement;
	for (var i = namesList.length - 1; i >= 0; i--) {
		console.log(namesList[i]);

		// Replace the name without concerning the line size
		svgTagReplacing(courseName, courseDuration, courseInit, courseEnd, namesList[i]);
		
		// Adjust lines
		adjustLines();
		
		var divEl = document.getElementById('svgDiv');
		Pablo(divEl.firstElementChild).download(format, fileName + '.' + format);
	}

}

function getNames(namesText) {
	namesText = namesText.replace(/(\r\n|\n|\r)/gm, '');
	var namesList = namesText.split(';');

	for (var i = namesList.length - 1; i >= 0; i--) {
		namesList[i] = namesList[i].trim();
	}

	return namesList;
}

function svgTagReplacing(courseName, courseDuration, courseInit, courseEnd, studentName) {
	var textField = document.getElementById('text-to-replace');

	textField.innerHTML = textField.innerHTML.replace("{course_name}", courseName);
	textField.innerHTML = textField.innerHTML.replace("{course_duration}", courseDuration);
	textField.innerHTML = textField.innerHTML.replace("{course_init}", courseInit);
	textField.innerHTML = textField.innerHTML.replace("{course_end}", courseEnd);
	
	textField.innerHTML = textField.innerHTML.replace("{name}", studentName);
}

// For each 2 letters less than 45, take out 6.6 of x position. from -11.8 to 285. middle at 136.6
function adjustLines() {
	var textField = document.getElementById('text-to-replace');
	
	var buffer = '';
	var maxLength = 45;
	var perLetter = 3.3;
	var minimun = -11.8;
	var lineSize = 14.4;
	for (var i = 0; i < textField.children.length; i++) {
		// Get stored words and place in the beginning of the new line text
		if (buffer.length != '') {
			textField.children[i].innerHTML = buffer + textField.children[i].innerHTML;
			buffer = '';
		}


		var lengthVariation = maxLength - textField.children[i].innerHTML.length;

		// The text fits the max length
		if (lengthVariation >= 0) {
			textField.children[i].setAttribute('x', getXPosition(lengthVariation, minimun, perLetter))
		} else {
			// If the text don't fit, the code need to guarantee two conditions:
			// - The textLength are equal or less than 45
			// - No word will be wrapped

			// By removing all chars after the maxLength, the code can guarantee the textLength condition
			// By searching for the first blank space before the maxLength, the code guarantee the wrap condition
			var index = maxLength;
			while(textField.children[i].innerHTML[index] != ' '){
				index -= 1;
				if (index == -1) {
					console.log("ERROR, THE WORD NEED TO BE WRAPPED. IT IS TOO LONG!");
					break;
				}
			}

			// Store the text that will be removed (without the blank space) on the buffer
			buffer = textField.children[i].innerHTML.substring(index+1, textField.children[i].innerHTML.length);

			// Remove the text
			textField.children[i].innerHTML = textField.children[i].innerHTML.substring(0, index);

			// Adjust the text's x position
			textField.children[i].setAttribute('x', minimun)
		}

	}
}

function getXPosition(lengthVariation, minimun, perLetter) {
	return (lengthVariation * perLetter) + minimun;
}