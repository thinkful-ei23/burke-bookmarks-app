'use strict';

/* global $ cuid*/

const store = (function() {
  // the array of bookmark objects
  // *** clear dummyItems after you can create items in the DOM
  const bookmarks = [{name: 'dummyItem', rating : 2}, {name: 'dummyItem2', rating : 4}];
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
    const indexOfBookmark = store.bookmarks.indexOf(bookmarkToDelete);
    store.bookmarks.splice(indexOfBookmark, 1);
  };

  return {
    bookmarks,
    createFormOpen,
    filter,
    addBookmark,
    deleteBookmark
  };

}());