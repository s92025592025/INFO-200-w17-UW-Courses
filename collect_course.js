'use strict';

const fs = require('file-system');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');
const BASE = 'https://www.washington.edu/students/timeschd/SPR2017/';

var catalog = webpageRequest(BASE);

console.log(BASE + catalog('a').eq(70).attr('href'));
var major = webpageRequest(BASE + catalog('a').eq(70).attr('href'));


var course = '';
for(var i = 0; i < major('a').length; i++){
	if(/[0-9]{5}/.test(major('a').eq(i).text())){
		console.log(i);
		console.log(major('a').eq(i).attr('href'));
		course = webpageRequest(major('a').eq(i).attr('href'));
	}
}


console.log(course);

function webpageRequest(url){
	var dom = '';
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.onload = function (){
		if(this.status == 200 || this.status == 0){
			dom = cheerio.load(this.responseText);
		}
	}

	request.send();

	return dom;
}