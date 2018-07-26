'use strict';

/* global $*/

const store = (function() {
  // the array of bookmark objects
  const bookmarks = [];
  // whether or not the create bookmark form is open
  let createFormOpen = false;
  // filter the results by 0 - 5. 0 does not filter any bookmarks. 2 filters by 2 or greater. 3 filters by 3 or greater, etc.
  let filter = 0;

  // add a bookmark
  const addBookmark = function() {

  }
  // delete a bookmark
  const deleteBookmark = function() {

  }

  // the store will always have 

  return {
    bookmarks,
    createFormOpen,
    filter,
    addBookmark,
    deleteBookmark
  };

}());