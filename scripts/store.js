'use strict';

/* global $ cuid*/

const store = (function() {
  // the array of bookmark objects
  const bookmarks = [];
  // whether or not the create bookmark form is open
  let createFormOpen = false;
  // filter the results by 0 - 5. 0 does not filter any bookmarks. 2 filters by 2 or greater. 3 filters by 3 or greater, etc.
  let filter = 0;

  // add a bookmark
  const addBookmark = function(obj) {
    obj.id = cuid(); // give the bookmark a unique id
    bookmarks.unshift(obj); // add new obj to beginning of array
  };
  // find by Id
  const findById = function() {

  };
  // delete a bookmark
  const deleteBookmark = function(id) {

  };

  // the store will always have 

  return {
    bookmarks,
    createFormOpen,
    filter,
    addBookmark,
    deleteBookmark
  };

}());