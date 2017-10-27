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