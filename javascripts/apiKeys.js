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