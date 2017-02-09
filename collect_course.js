'use strict';
/*http://stackoverflow.com/questions/7372972/how-do-i-parse-a-html-page-with-node-js*/
const fs = require('file-system');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


var catalog = '';
var request = new XMLHttpRequest();
var parser = new DomParser();
request.open('GET', 'https://www.washington.edu/students/timeschd/SPR2017/', false);
request.onload = function (){
	if(this.status == 200 || this.status == 0){
		document = parser.parseFromString(this.responseText, 'text/html');
	}
}

request.send();

console.log(document);