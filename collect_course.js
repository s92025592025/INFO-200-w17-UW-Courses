'use strict';

const fs = require('file-system');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');
const BASE = 'https://www.washington.edu/students/timeschd/SPR2017/';

var catalog = '';
var request = new XMLHttpRequest();
request.open('GET', BASE, false);
request.onload = function (){
	if(this.status == 200 || this.status == 0){
		catalog = cheerio.load(this.responseText);
	}
}

request.send();

var major = '';
console.log(catalog('a').eq(70).attr('href'));

request.open('GET', BASE + '/' + catalog('a').eq(70).attr('href'), false);
request.onload = function (){
	if(this.status == 200 || this.status == 0){
		major =  cheerio.load(this.responseText);
	}
}

request.send()


var course = '';
for(var i = 0; i < major('a').length; i++){
	if(/[0-9]{5}/.test(major('a').eq(i).text().trim())){
		console.log(major('a').eq(i).attr('href'));
		request.open('GET', major('a').eq(i).attr('href'), false);
		request.onload = function (){
			if(this.status == 200 || this.status == 0){}
				course = cheerio.load(this.responseText);
		};

		request.send();
	}
}