'use strict';

/* global $ bookmarkList api store*/


$(function() {
  // bind event listeners here
  bookmarkList.bindEventListeners();
  api.readDataOnServer((items) => {
    console.log(items);
    items.forEach(element => store.addBookmark(element));
    bookmarkList.render();
  });
});