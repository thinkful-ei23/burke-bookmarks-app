'use strict';

/* global $ cuid*/

const store = (function() {

  const bookmarks = { items: [],
    createFormOpen : false,
    filter : 0,
    error : ''
  };
  // whether or not the create bookmark form is open
  // filter the results by 0 - 5. 0 does not filter any bookmarks. 2 filters by 2 or greater. 3 filters by 3 or greater, etc.

  const changeFilter = function(newFilter) {
    bookmarks.filter = newFilter;
  };

  // add a bookmark
  const addBookmark = function(obj) {
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

  const editRating = function(id, rating) {
    const bookmarkToEdit = findById(id);
    bookmarkToEdit.rating = rating;
  };

  const editDesc = function(id, desc) {
    const bookmarkToEdit = findById(id);
    bookmarkToEdit.desc = desc;
  };

  return {
    bookmarks,
    addBookmark,
    deleteBookmark,
    changeFilter,
    findById,
    editRating,
    editDesc
  };

}());