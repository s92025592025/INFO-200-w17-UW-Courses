'use strict';

const fs = require('file-system');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');
const BASE = 'https://www.washington.edu/students/timeschd/SPR2017/';

var catalog = webpageRequest(BASE);
var major_list = [];
var course_list = {};
/*
	course_list format:
	{
		major_abbr: [
			{
				num: ,
				title: ,
				sections: [
					{
						SLN: ,
						section: ,
						type: ,
						credit: ,
						meeting: [
							{
								day: [],
								time: ,
								building: ,
								room:
							}
						],
						instructor: "",

					}
				]

			}
		]
	}
*/

// get all the link to classes information
for(var i = 0; i < catalog('a').length; i++){
	if(/\.html$/.test(catalog('a').eq(i).attr('href')) &&
		/\([A-Z]+\)/.test(catalog('a').eq(i).text())){
		major_list.push(catalog('a').eq(i).attr('href'));
	}
}

// get all the courses and store to classes.json
for(var i = 0; i < major_list.length; i++){
	var content = webpageRequest(BASE + major_list[i]);
	if(content != ''){
		//if the class is offered
		course_list[major_list[i].match(/([a-z]+)\.html/)[1].toUpperCase()] = [];
		for(var s = 0; s < content('td').length; s++){
			if(content('td').eq(s).text().match(/^([A-Z]+)\s+([12345][0-9][0-9])\s+(\w+[\s\w+]*)$/)){
				var parse = content('td').eq(s).text().match(/^([A-Z]+)\s+([12345][0-9][0-9])\s+(\w+[\s\w+]*)$/);
				course_list[major_list[i].match(/([a-z]+)\.html/)[1].toUpperCase()].push({
					num: parse[2],
					title: parse[3],
					sections: []
				});
				console.log(content('td').eq(s).text());
			}
		}
	}
}

fs.writeFileSync('classes.json', JSON.stringify(course_list, null, 4));

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