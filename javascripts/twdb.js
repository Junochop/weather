"use strict";

let twdbKey;
let imgConfig;
const dom = require('./dom');

const searchTWDB = (query) => {
// promise search movies
console.log(twdbKey);
return new Promise((resolve, reject) => {
	$.ajax(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${twdbKey}`)
		.done((data) =>{
			console.log(data);
			resolve(data.results);
		}).fail((error) => {
			reject(error);
		});

	});

};

const twdbConfiguration = () => {
	return new Promise((resolve, reject)=> {
		$.ajax(`https://api.themoviedb.org/3/configuration?api_key=${twdbKey}`
		).done((data) => {
			resolve(data.images);
		}).fail((error) => {
			reject(error);
		});

	});
};

const getConfig = () => {
	twdbConfiguration().then((results) => {
		imgConfig = results;
	}).catch((error)=>{
		console.log("error in config", error);
	});
};

const searchWeather = (query) => {
// execute search TMDB
searchTWDB(query).then((data) =>{
	showResults(data);
}).catch((error)=> {
	console.log("error", error);
});
};


const setKey = (apiKey) => {
// sets twdbkey
twdbKey = apiKey;
getConfig();


};


const showResults = (movieArray) => {
dom.clearDom();
 dom.domString(movieArray, imgConfig);
};

module.exports ={setKey, searchWeather};