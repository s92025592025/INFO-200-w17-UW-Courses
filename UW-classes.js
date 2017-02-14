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

// pre: should give class the class name and number in a format of 
//		{class abbr}{ }{class num}. Example: JAPAN 211, MATH     308
// post: will return a json object of that class, or return null if
//		 the class information can't be provided
module.exports.getClassSections = function (class){}


// pre: should give class abbr to abbr and num to num
// post: will return a json object of that class, or return null if
//		 the class information can't be provided
module.exports.getClassSections = function (abbr, num){}