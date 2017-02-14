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

// post will return the whole list of classes provided in spring 2017
module.exports.getAllClasses = function (){
	return classList;
}