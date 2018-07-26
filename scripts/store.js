'use strict';

/* global $ cuid*/

const store = (function() {
  // the array of bookmark objects
  const bookmarks = { items: [],
    createFormOpen : false,
    filter : 0
  };
  // whether or not the create bookmark form is open
  // filter the results by 0 - 5. 0 does not filter any bookmarks. 2 filters by 2 or greater. 3 filters by 3 or greater, etc.

  const changeFilter = function(newFilter) {
    bookmarks.filter = newFilter;
  };

  // add a bookmark
  const addBookmark = function(obj) {
    obj.id = cuid(); // give the bookmark a unique id
    bookmarks.items.unshift(obj); // add new obj to beginning of array
  };
  // find by Id
  const findById = function(id) {
    return bookmarks.items.find(element => element.id === id);
  };
  // delete a bookmark
  const deleteBookmark = function(id) {
    const bookmarkToDelete = findById(id);
    const indexOfBookmark = store.bookmarks.items.indexOf(bookmarkToDelete);
    store.bookmarks.items.splice(indexOfBookmark, 1);
  };

  return {
    bookmarks,
    addBookmark,
    deleteBookmark,
    changeFilter,
    findById
  };

}());