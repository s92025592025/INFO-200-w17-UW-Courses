'use strict';
/*http://stackoverflow.com/questions/7372972/how-do-i-parse-a-html-page-with-node-js*/
const fs = require('file-system');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');


var catalog = '';
var request = new XMLHttpRequest();
request.open('GET', 'https://www.washington.edu/students/timeschd/SPR2017/', false);
request.onload = function (){
	if(this.status == 200 || this.status == 0){
		catalog = cheerio.load(this.responseText);
	}
}

request.send();

console.log(catalog('a').eq(2).attr('href'));