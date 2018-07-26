'use strict';

/* global $*/

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/burke/bookmarks';

  const sendBookmarkToServer = function(newBookmark, callback) {
    const bookmarkJSON = JSON.stringify(newBookmark);
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType : 'application/json', 
      data : bookmarkJSON,
      success : callback
    }, callback);
  };

  const readDataOnServer = function(callback) {
    console.log($.getJSON(`${BASE_URL}`, callback));
    $.getJSON(`${BASE_URL}`, callback);
  };
  // an id is created on the server
  // need to read that id
  const deleteDataOnServer = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE', 
      success : callback
    }, callback);
  };

  return {
    sendBookmarkToServer,
    readDataOnServer,
    deleteDataOnServer
  };

}());