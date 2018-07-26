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
  const findById = function(id) {
    return bookmarks.find(element => element.id === id);
  };
  // delete a bookmark
  const deleteBookmark = function(id) {
    const bookmarkToDelete = findById(id);
    console.log(bookmarkToDelete);
    const indexOfBookmark = store.bookmarks.indexOf(bookmarkToDelete);
    console.log(indexOfBookmark);
    store.bookmarks.splice(indexOfBookmark, 1);
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