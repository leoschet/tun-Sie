
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
		var fileName = courseName + ' - ' + namesList[i];
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

// For each 2 letters less than 58, take out 6.6 of x position. from 0 to 412. middle at 136.6
function adjustLines() {
	var textField = document.getElementById('text-to-replace');
	
	var buffer = '';
	var maxLength = 58;
	// Adjusted minimum (0 + 10) to get acceptable error area (different width for differents letters i and p)
	// TODO: get the minimum dinamically, getting the rect size
	var minimum = 10;
	var maximum = 412;
	var perLetter = (maximum-minimum)/maxLength;
	for (var i = 0; i < textField.children.length; i++) {
		// Get stored words and place in the beginning of the new line text
		if (buffer.length != 0) {
			reloadBlankSpace(buffer);
			textField.children[i].innerHTML = buffer + textField.children[i].innerHTML;
			textField.children[i].innerHTML.trim();
			buffer = '';
		}


		var lengthVariation = maxLength - textField.children[i].innerHTML.length;

		// The text fits the max length
		if (lengthVariation >= 0) {
			// Adjust text's x position
			textField.children[i].setAttribute('x', getXPosition(lengthVariation, minimum, perLetter));
		} else {
			// If the text don't fit, the code need to guarantee two conditions:
			// - The textLength are equal or less than maxLength
			// - No word will be wrapped
			// - The blankspace will not be removed

			// The last considered char, for this line, must be at position 'maxLength'
			var index = maxLength;
			
			// By removing all chars after the maxLength, the code can guarantee the textLength condition
			// By searching for the first blank space before the maxLength, the code guarantee the wrap condition
			while(textField.children[i].innerHTML[index] != ' '){
				index -= 1;
				if (index == -1) {
					console.log("ERROR, THE WORD NEED TO BE WRAPPED. IT IS TOO LONG!");
					break;
				}
			}

			// Store the text that will be removed (with the blank space) on the buffer
			buffer = textField.children[i].innerHTML.substring(index, textField.children[i].innerHTML.length);
			buffer = buffer + ' ';

			// Remove the text (whitout the blank space)
			textField.children[i].innerHTML = textField.children[i].innerHTML.substring(0, index);

			// Adjust the text's x position
			lengthVariation = maxLength - textField.children[i].innerHTML.length;
			textField.children[i].setAttribute('x', getXPosition(lengthVariation, minimum, perLetter));
		}

	}
}

function reloadBlankSpace(str) {
	str.trim();
	str = str + ' ';
}

function getXPosition(lengthVariation, minimum, perLetter) {
	var oneSideLengthVariation = lengthVariation/2
	return (oneSideLengthVariation * perLetter) + minimum;
}