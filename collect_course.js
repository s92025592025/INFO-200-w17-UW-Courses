'use strict';

const fs = require('file-system');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');
const BASE = 'https://www.washington.edu/students/timeschd/SPR2017/';

var catalog = webpageRequest(BASE);
var major_list = [];

// get all the link to classes information
for(var i = 0; i < catalog('a').length; i++){
	if(/\.html$/.test(catalog('a').eq(i).attr('href')) &&
		/\([A-Z]+\)/.test(catalog('a').eq(i).text())){
		major_list.push(BASE + catalog('a').eq(i).attr('href'));
	}
}



// pre: give a url that leads to a static webpage
// post: will return a cheerio HTML dom if the request is successfully
//		 requested
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