(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const twdb = require('./twdb');

const apiKeys=()=> {
//promise
return new Promise((resolve, reject) => {
	$.ajax('./db/apiKeys.json').done((data)=> {
		resolve(data.apiKeys);
		console.log("apiKeys", data.apiKeys);
	}).fail((error)=> {
		reject(error);
	});
});
};

const retrieveKeys = () => {
	console.log("results");
	apiKeys().then((results)=> {
		console.log("results", results);
		twdb.setKey(results.twdb.apiKey);

	}).catch((error)=> {
		console.log(error);
	});
};

module.exports = {retrieveKeys};
},{"./twdb":5}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
"use strict";

const twdb = require('./twdb');

const pressEnter = () => {
  $(document).keypress((e) => {
  	if(e.key === 'Enter'){
      let searchText = $('#searchBar').val();
      let query = searchText.replace(/\s/g, "%20");
      twdb.searchWeather(query);
    }

  });

};

module.exports = {pressEnter};
},{"./twdb":5}],4:[function(require,module,exports){
"use strict";

let events = require('./events');
let apiKeys = require('./apiKeys');


apiKeys.retrieveKeys();
events.pressEnter();
},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
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
},{"./dom":2}]},{},[4]);
