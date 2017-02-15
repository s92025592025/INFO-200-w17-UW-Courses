// @Author: Daniel Wang (JIUN-CHENG WANG)
// @Description: This module will help to get provided course in UW in Spring 2017
// 2017/02/14

'use strict';

const fs = require('file-system');
const classList = JSON.parse(fs.readFileSync(__dirname + '/data/classes.json'));

/* module reference
module.exports.testing = function (){
		console.log('this is the testing');
;*/

// post: will return the whole list of classes provided in spring 2017
module.exports.getAllClasses = function (){
	return classList;
}

// pre: should pass in the abbreviation of the major in all caps
// post : will return a json object contains the list of classes provided,
//		  or will return null
module.exports.getMajorClasses = function (major){
	major = major.toUpperCase().trim();
	for(var key in classList){
		if(key.includes(major)){
			return classList[key];
		}
	}

	return null;
}


// pre: should give class abbr to abbr and num to num, both of them
//		should be String. Or only assign the whole name + num to abbr.
//		The format should be [class name] [class num]. 
//		Ex: JAPAN 212, MATH     308
// post: will return a json object of that class, or return null if
//		 the class information can't be provided
module.exports.getClassSections = function (abbr, num){
	if(typeof num == 'undefined'){
		if(abbr.split(/\s+/).length != 2){
			return null;
		}
		num = abbr.split(/\s+/)[1];
		abbr = abbr.split(/\s+/)[0];
	}
	var list = this.getMajorClasses(abbr);

	if(!list){
		return list;
	}

	for(var i = 0; i < list.length; i++){
		if(list[i].num == num.trim()){
			return list[i].sections;
		}
	}

	return null;
}

// pre: should give section a String of section abbr, num, and section, or
//		pass in a Number of SLN to section
// post: will return the a detailed json of the Section specified, or else 
//		 return null
module.exports.getSectionInfo = function (section){}