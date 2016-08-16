
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


	var courseName = document.getElementById('course-name').value;
	var courseDuration = document.getElementById('course-duration').value;
	var courseInit = document.getElementById('course-init').value;
	var courseEnd = document.getElementById('course-end').value;

	svgTagReplacing(courseName, courseDuration, courseInit, courseEnd);

	var namesList = getNames(document.getElementById('names').value);
	var totalDownloads = 0;
	for (var i = namesList.length - 1; i >= 0; i--) {
		var fileName = courseName + 'Certificate - ' + namesList[i];
		console.log('nome: ' + namesList[i]);

		// Replace the name without concerning the line size
		if (i === namesList.length - 1) {
			replaceName(namesList[i]);
		} else {
			replaceName(namesList[i], namesList[i+1]);
		}
		
		// Adjust lines
		adjustLines();

		if (totalDownloads < namesList.length) {
			var divEl = document.getElementById('svgDiv');
			Pablo(divEl.firstElementChild).download(format, fileName + '.' + format);
			totalDownloads += 1;
		} else {
			console.log('INTERNAL ERROR (DOWNLOADS LOOP NOT STOPING)');
		}
	}

}

function getNames(namesText) {
	namesText = namesText.replace(/(\r\n|\n|\r)/gm, '');
	var namesList = namesText.split(';');

	for (var i = namesList.length - 1; i >= 0; i--) {
		namesList[i] = namesList[i].trim();
	}

	if (namesList[namesList.length - 1] == '') {
		namesList.pop();
	}

	return namesList;
}

function svgTagReplacing(courseName, courseDuration, courseInit, courseEnd) {
	var textField = document.getElementById('text-to-replace');

	textField.innerHTML = textField.innerHTML.replace("{course_name}", courseName);
	textField.innerHTML = textField.innerHTML.replace("{course_duration}", courseDuration);
	textField.innerHTML = textField.innerHTML.replace("{course_init}", courseInit);
	textField.innerHTML = textField.innerHTML.replace("{course_end}", courseEnd);
}

function replaceName(newName, lastName = "{name}") {
	var textField = document.getElementById('text-to-replace');
	textField.innerHTML = textField.innerHTML.replace(lastName, newName);
}

// For each 2 letters less than 45, take out 6.6 of x position. from -11.8 to 285. middle at 136.6
function adjustLines() {
	var textField = document.getElementById('text-to-replace');
	
	var buffer = '';
	var maxLength = 45;
	var perLetter = 3.3;
	var minimun = -11.8;
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
			var newLengthVariation = maxLength - textField.children[i].innerHTML.length;
			textField.children[i].setAttribute('x', getXPosition(newLengthVariation, minimun, perLetter))
		}

	}
}

function getXPosition(lengthVariation, minimun, perLetter) {
	return (lengthVariation * perLetter) + minimun;
}