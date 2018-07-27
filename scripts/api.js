'use strict';

/* global $*/

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/burke/bookmarks';

  const sendBookmarkToServer = function(newBookmark, success, error) {
    const bookmarkJSON = JSON.stringify(newBookmark);
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType : 'application/json', 
      data: bookmarkJSON,
      success : success,
      error : error
    });
  };

  const readDataOnServer = function(callback) {
    $.getJSON(`${BASE_URL}`, callback);
  };
  // an id is created on the server
  // need to read that id
  const deleteDataOnServer = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE', 
      success : callback,
    });
  };

  const updateDataOnServer = function(id, data, success, error) {
    const newDataJSON = JSON.stringify(data);
    $.ajax({
      url: `${BASE_URL}/${id}`,
      contentType : 'application/json',
      method: 'PATCH', 
      data : newDataJSON,
      success : success,
      error : error,
    });
  };

  return {
    sendBookmarkToServer,
    readDataOnServer,
    deleteDataOnServer,
    updateDataOnServer
  };

}());