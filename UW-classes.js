// @Author: Daniel Wang (JIUN-CHENG WANG)
// @Description: This module will help to get provided course in UW in Spring 2017
// 2017/02/14

'use strict';

const fs = require('file-system');
const classList = JSON.parse(fs.readFileSync(__dirname + '/data/classes.json'));

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

// pre: should give class abbr to abbr and num to num, lecture section to
//		section, or give the whole chunk to abbr
// post: will return the lecture section along with the avaliable Quiz Sections
//		 in json format, or else return null
module.exports.getQuizSections = function (abbr, num, section){
	if(typeof num != typeof section){
		return null;
	}

	abbr = abbr.toUpperCase();

	// conditions to return null
	if(typeof num == typeof section){
		if(typeof nun == 'undefined'){
			if(!abbr.trim().match(/([A-Z]+)\s+([0-9]{3})\s+([A-Z]{1})$/)){
				return null
			}

			num = abbr.trim().match(/([A-Z]+)\s+([0-9]{3})\s+([A-Z]{1})$/)[2];
			section = abbr.trim().match(/([A-Z]+)\s+([0-9]{3})\s+([A-Z]{1})$/)[3];
			abbr = abbr.trim().match(/([A-Z]+)\s+([0-9]{3})\s+([A-Z]{1})$/)[1];
		}else{
			section = section.toUpperCase();

			if(!num.trim().match(/^[0-9]{3}$/)){
				return null;
			}

			if(!section.trim().match(/^[A-Z]$/)){
				return null;
			}
		}
	}

	var list = this.getClassSections(abbr, num);
	if(!list){
		return null;
	}

	var matchedSection = [];
	for(var i = 0; i < list.length; i++){
		if(list[i].section.match(new RegExp(section + '[A-Z]?'))){
			matchedSection.push(list[i]);
		}
	}

	if(matchedSection.length == 0){
		return null;
	}

	return matchedSection;
}

// pre: should give section a String of section abbr, num, and section, or
//		pass in a Number of SLN to section
// post: will return the a detailed json of the Section specified, or else 
//		 return null
module.exports.getSectionInfo = function (section){
	if(typeof section == 'number'){
		return this.getSectionBySLN(section);
	}

	section = section.toUpperCase();

	if(!section.match(/[A-Z]+\s+[0-9]{3}\s+[A-Z][A-Z]?/)){
		return null;
	}

	section = section.match(/([A-Z]+)\s+([0-9]{3})\s+([A-Z][A-Z]?)/);

	var sectionList = this.getClassSections(section[1], section[2]);

	if(!sectionList){
		return sectionList;
	}

	// need to re structure out put json
	for(var i = 0; i < sectionList.length; i++){
		if(sectionList[i].section == section[3]){
			sectionList[i].abbr = section[1];
			sectionList[i].num = section[2]
			return sectionList[i];
		}
	}

	return null;
}

// pre: should take a 5 digit number that is UW class sln
// post: will return the information of that class, or else null
module.exports.getSectionBySLN = function (sln){
	if(sln / 10000 < 1){
		return null;
	}

	var list = this.getAllClasses();
	for(var key in list){
		for(var i = 0; i < list[key].length; i++){
			for(var s = 0; s < list[key][i].sections.length; s++){
				if(list[key][i].sections[s].SLN == sln){
					list[key][i].sections[s].abbr = key;
					list[key][i].sections[s].num = list[key][i].num;

					return list[key][i].sections[s];
				}
			}
		}
	}

	return null;
}

// pre: should pass in a array of class in String, or sln
//		in String
// post: will return a list of schedule in json format regardless the quality
//		 of the schedule
module.exports.buildSchedule = function (classes){
	// js stack: push(), pop()
	// use stack and backtrack recursion
	var schedules = [];
	var classInfoList = [];

	for(var i = 0; i < classes.length; i++){
		if(classes[i].trim().match(/^[0-9]{5}$/)){
			classInfoList.push(this.getSectionBySLN(Number(classes[i])));
		}else if(classes[i].trim().match(/^[A-Z]+\s+[0-9]{3}$/)){
			classInfoList.push(this.getClassSections(classes[i].trim()));
		}else{
			classInfoList.push(this.getQuizSections(classes[i].trim()));
		}
	}

	console.log(classInfoList);
}